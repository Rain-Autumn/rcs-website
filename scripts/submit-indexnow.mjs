const site = 'https://raijucloudsystem.com';
const key = '66f00df64ec772c6add40358bf578d0b';
const keyLocation = `${site}/${key}.txt`;

async function fetchWithTimeout(url, init = {}, timeout = 15_000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

const sitemapResponse = await fetchWithTimeout(`${site}/sitemap.xml`);
if (!sitemapResponse.ok) {
  throw new Error(`Unable to read the deployed sitemap (${sitemapResponse.status}).`);
}

const sitemap = await sitemapResponse.text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((match) => match[1].trim())
  .filter((url) => {
    try {
      return new URL(url).origin === site;
    } catch {
      return false;
    }
  });

if (!urls.length) throw new Error('The deployed sitemap contains no RCS URL.');

const response = await fetchWithTimeout('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: new URL(site).host,
    key,
    keyLocation,
    urlList: urls,
  }),
});

if (!response.ok) {
  throw new Error(`IndexNow rejected the submission (${response.status}).`);
}

console.log(`IndexNow accepted ${urls.length} RCS URL(s).`);
