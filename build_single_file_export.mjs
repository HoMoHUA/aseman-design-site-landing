import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = '/home/ubuntu/exports/aseman-design-landing-static';
const output = '/home/ubuntu/exports/aseman-design-landing-single.html';

const mime = file => ({
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2'
}[path.extname(file).toLowerCase()] || 'application/octet-stream');

const dataUri = async relative => {
  const source = path.join(root, relative.replace(/^\.\//, ''));
  const raw = await readFile(source);
  return `data:${mime(source)};base64,${raw.toString('base64')}`;
};

let html = await readFile(path.join(root, 'index.html'), 'utf8');
html = html.replace(/<script id="manus-runtime">[\s\S]*?<\/script>/, '');
const mainScript = html.match(/<script type="module" crossorigin src="([^"]+)"><\/script>/)?.[1];
const mainCss = html.match(/<link rel="stylesheet" crossorigin href="([^"]+)">/)?.[1];
const fontCss = html.match(/<link rel="stylesheet" href="([^"]+)">/)?.[1];
if (!mainScript || !mainCss || !fontCss) throw new Error('Expected static bundle references were not found.');

let styles = await readFile(path.join(root, mainCss.replace(/^\.\//, '')), 'utf8');
let fonts = await readFile(path.join(root, fontCss.replace(/^\.\//, '')), 'utf8');
let script = await readFile(path.join(root, mainScript.replace(/^\.\//, '')), 'utf8');
script = script.replaceAll('</script', '<\\/script');

const fontFiles = [...fonts.matchAll(/url\(\.\/([^\)]+\.woff2)\)/g)].map(match => match[1]);
for (const filename of [...new Set(fontFiles)]) {
  const uri = await dataUri(`assets/fonts/${filename}`);
  fonts = fonts.replaceAll(`./${filename}`, uri);
}

const images = [
  'aseman-hero-layered-studio.png',
  'aseman-integrations-orbit.png',
  'aseman-management-dashboard.png',
  'aseman-growth-services.png',
  'aseman-partner-current.png',
  'aseman-partner-fold.png',
  'aseman-service-company.webp',
  'aseman-service-order.webp',
  'aseman-service-pro.webp',
  'aseman-service-store.webp',
  'aseman-symbol.png'
];

for (const filename of images) {
  const uri = await dataUri(`assets/images/${filename}`);
  const relative = `assets/images/${filename}`;
  html = html.replaceAll(relative, uri);
  styles = styles.replaceAll(relative, uri);
  script = script.replaceAll(relative, uri);
}

await writeFile('/home/ubuntu/exports/aseman-design-landing-single.debug.js', script);

html = html
  .replace(/\s*<link rel="stylesheet" href="[^"]+">/g, '')
  .replace(/\s*<link rel="stylesheet" crossorigin href="[^"]+">/g, '')
  .replace(/\s*<script type="module" crossorigin src="[^"]+"><\/script>/g, '')
  .replace(/\s*<script src="\/__manus__\/debug-collector\.js" defer><\/script>/g, '')
  .replace('</head>', `<style>${fonts}\n${styles}</style></head>`)
  .replace('</body>', `<script>${script}</script></body>`);

await writeFile(output, html);
