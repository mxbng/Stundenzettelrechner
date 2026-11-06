// Offline-Speicher für den WD-Rechner.
// Bei jeder Änderung an den Dateien die Versionsnummer hochzählen (v1 -> v2 ...).
const CACHE = 'wd-rechner-v2';
const DATEIEN = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(DATEIEN)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(namen => Promise.all(namen.filter(n => n !== CACHE).map(n => caches.delete(n))))
  );
  self.clients.claim();
});

// Erst aus dem Speicher liefern (funktioniert offline), im Hintergrund aktualisieren.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.open(CACHE).then(async c => {
      const treffer = await c.match(e.request, { ignoreSearch: true });
      const netz = fetch(e.request)
        .then(antwort => { if (antwort.ok) c.put(e.request, antwort.clone()); return antwort; })
        .catch(() => treffer);
      return treffer || netz;
    })
  );
});
