import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

const project = '/home/ubuntu/aseman-design-site-landing';
const source = path.join(project, 'dist/public');
const output = path.join(project, 'standalone-export');
const imageSource = '/home/ubuntu/webdev-static-assets';
const imageOutput = path.join(output, 'assets/images');
const fontOutput = path.join(output, 'assets/fonts');

const assets = {
  'aseman-hero-layered-studio': 'aseman-hero-layered-studio.png',
  'aseman-integrations-orbit': 'aseman-integrations-orbit.png',
  'aseman-management-dashboard': 'aseman-management-dashboard.png',
  'aseman-growth-services': 'aseman-growth-services.png',
  'aseman-partner-current': 'aseman-partner-current.png',
  'aseman-partner-fold': 'aseman-partner-fold.png',
  'aseman-service-company': 'aseman-service-company.webp',
  'aseman-service-order': 'aseman-service-order.webp',
  'aseman-service-pro': 'aseman-service-pro.webp',
  'aseman-service-store': 'aseman-service-store.webp',
  'aseman-symbol': 'aseman-symbol.png'
};

async function replaceAssets(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const location = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await replaceAssets(location);
      continue;
    }
    if (!/\.(html|css|js|svg)$/i.test(entry.name)) continue;
    let content = await readFile(location, 'utf8');
    for (const [key, local] of Object.entries(assets)) {
      content = content.replace(new RegExp(`/manus-storage/${key}_[a-z0-9]+\\.(png|webp)`, 'g'), `assets/images/${local}`);
    }
    await writeFile(location, content);
  }
}

async function localizeFont() {
  const response = await fetch('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;600;700;800&display=swap', {
    headers: { 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/124 Safari/537.36' }
  });
  let css = await response.text();
  const urls = [...css.matchAll(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g)].map(match => match[1]);
  const replacements = new Map();
  for (let index = 0; index < urls.length; index += 1) {
    const remote = urls[index];
    if (replacements.has(remote)) continue;
    const filename = `vazirmatn-${replacements.size + 1}.woff2`;
    const file = await fetch(remote);
    const binary = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(fontOutput, filename), binary);
    replacements.set(remote, filename);
  }
  for (const [remote, local] of replacements) css = css.replaceAll(remote, `./${local}`);
  await writeFile(path.join(fontOutput, 'vazirmatn.css'), css);
}

await rm(output, { recursive: true, force: true });
await cp(source, output, { recursive: true });
await mkdir(imageOutput, { recursive: true });
await mkdir(fontOutput, { recursive: true });
for (const file of Object.values(assets)) await cp(path.join(imageSource, file), path.join(imageOutput, file));
await replaceAssets(output);
await localizeFont();

const indexPath = path.join(output, 'index.html');
let index = await readFile(indexPath, 'utf8');
index = index
  .replace(/<link rel="preconnect"[^>]+>\s*/g, '')
  .replace(/<link href="https:\/\/fonts\.googleapis\.com[^>]+>\s*/g, '<link rel="stylesheet" href="./assets/fonts/vazirmatn.css">\n')
  .replace(/\s*<script defer src="[^"]+umami"[^>]*><\/script>/g, '')
  .replaceAll('href="/assets/', 'href="./assets/')
  .replaceAll('src="/assets/', 'src="./assets/');
await writeFile(indexPath, index);

await writeFile(path.join(output, 'README.txt'), `بسته مستقل لندینگ طراحی سایت در مشهد\n\nبرای نمایش، همه فایل‌ها را با همان ساختار پوشه‌ای روی هاست آپلود کنید و فایل index.html را باز کنید.\nاین بسته شامل HTML تولیدی، JavaScript، CSS، فونت Vazirmatn و تمام تصاویر مورد استفاده است.\n`);
