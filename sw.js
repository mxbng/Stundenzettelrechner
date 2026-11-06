// Offline-Speicher für den WD-Rechner.
// Bei jeder Änderung an den Dateien die Versionsnummer hochzählen (v4 -> v5 ...).
const CACHE = 'wd-rechner-v4';
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

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(e.request.mode === 'navigate' ? netzZuerst(e.request) : speicherZuerst(e.request));
});

// Die Seite selbst: mit Netz immer die neueste Version holen,
// ohne Netz (oder nach 4 Sekunden ohne Antwort) die gespeicherte nehmen.
async function netzZuerst(anfrage) {
  const c = await caches.open(CACHE);
  try {
    const antwort = await Promise.race([
      fetch(anfrage),
      new Promise((_, nein) => setTimeout(() => nein(new Error('Zeitüberschreitung')), 4000))
    ]);
    if (antwort.ok) c.put(anfrage, antwort.clone());
    return antwort;
  } catch (fehler) {
    return (await c.match(anfrage, { ignoreSearch: true })) || (await c.match('./index.html')) || Response.error();
  }
}

// Symbole und Manifest: aus dem Speicher, im Hintergrund aktualisieren.
async function speicherZuerst(anfrage) {
  const c = await caches.open(CACHE);
  const treffer = await c.match(anfrage, { ignoreSearch: true });
  const netz = fetch(anfrage)
    .then(antwort => { if (antwort.ok) c.put(anfrage, antwort.clone()); return antwort; })
    .catch(() => treffer);
  return treffer || netz;
}
