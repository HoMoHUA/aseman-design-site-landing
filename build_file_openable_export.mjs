import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const project = '/home/ubuntu/aseman-design-site-landing';
const exportRoot = '/home/ubuntu/exports/aseman-design-landing-static';
const domSource = '/home/ubuntu/browser_html/3000-irr5827f5vzs2wmusglrm-8bf4e825_us2_manus_computer_page_1786796781361.html';
const output = '/home/ubuntu/exports/aseman-design-landing-file-openable.html';

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

const mime = filename => ({ '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2' }[path.extname(filename).toLowerCase()] || 'application/octet-stream');
const dataUri = async relative => {
  const source = path.join(exportRoot, relative);
  const raw = await readFile(source);
  return `data:${mime(relative)};base64,${raw.toString('base64')}`;
};

const extractRoot = html => {
  const match = /<div\s+id="root"[^>]*>/i.exec(html);
  if (!match) throw new Error('Rendered root was not found.');
  const start = match.index;
  const tagEnd = html.indexOf('>', start) + 1;
  const tags = /<\/?div\b[^>]*>/gi;
  tags.lastIndex = tagEnd;
  let depth = 1;
  let token;
  while ((token = tags.exec(html))) {
    if (token[0].startsWith('</')) depth -= 1;
    else depth += 1;
    if (depth === 0) return html.slice(start, tags.lastIndex);
  }
  throw new Error('Rendered root was not closed.');
};

let rendered = extractRoot(await readFile(domSource, 'utf8'));
let styles = await readFile(path.join(exportRoot, 'assets/index-BUF9C1yP.css'), 'utf8');
let fontCss = await readFile(path.join(exportRoot, 'assets/fonts/vazirmatn.css'), 'utf8');

for (const filename of [...new Set([...fontCss.matchAll(/url\(\.\/([^\)]+\.woff2)\)/g)].map(match => match[1]))]) {
  fontCss = fontCss.replaceAll(`./${filename}`, await dataUri(`assets/fonts/${filename}`));
}

for (const [key, filename] of Object.entries(assets)) {
  const uri = await dataUri(`assets/images/${filename}`);
  const remote = new RegExp(`/manus-storage/${key}_[a-z0-9]+\\.(png|webp)`, 'g');
  rendered = rendered.replace(remote, uri);
  styles = styles.replace(remote, uri);
}

const interaction = `
document.querySelectorAll('.guide-topic').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.guide-topic').forEach((item) => item.classList.remove('is-active'));
    button.classList.add('is-active');
    const title = button.textContent.replace(/^\\s*\\d+\\s*/, '').trim();
    const heading = document.querySelector('.guide-detail h3');
    const count = document.querySelector('.guide-detail-label b');
    if (heading) heading.textContent = title;
    if (count) count.textContent = button.textContent.match(/\\d+/)?.[0].padStart(2, '0') || '01';
  });
});
const shell = document.querySelector('.site-shell');
if (shell) {
  shell.addEventListener('pointermove', (event) => {
    const x = (event.clientX / window.innerWidth - .5) * 14;
    const y = (event.clientY / window.innerHeight - .5) * 14;
    shell.style.setProperty('--px', x + 'px');
    shell.style.setProperty('--py', y + 'px');
  });
  shell.addEventListener('pointerleave', () => {
    shell.style.setProperty('--px', '0px');
    shell.style.setProperty('--py', '0px');
  });
}
`;

const outputHtml = `<!doctype html><html lang="fa" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1"><meta name="description" content="طراحی سایت اختصاصی در مشهد توسط گروه نرم‌افزاری آسمان"><title>طراحی سایت در مشهد | گروه نرم‌افزاری آسمان</title><style>${fontCss}\n${styles}</style></head><body>${rendered}<script>${interaction}</script></body></html>`;
await writeFile(output, outputHtml);
