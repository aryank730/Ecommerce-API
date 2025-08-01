import fs from 'fs';
import fetch from 'node-fetch';

const BASE_BACKEND_URL = 'https://atelierluphien.com/api';

async function fetchAndWrite(url, fileName) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
    const text = await res.text();
    fs.writeFileSync(`public/${fileName}`, text);
    console.log(`✅ ${fileName} saved successfully.`);
  } catch (err) {
    console.error(`❌ Error saving ${fileName}:`, err.message);
  }
}

await fetchAndWrite(`${BASE_BACKEND_URL}/sitemap.xml`, 'sitemap.xml');
await fetchAndWrite(`${BASE_BACKEND_URL}/robots.txt`, 'robots.txt');
