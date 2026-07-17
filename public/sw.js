const CACHE_NAME = "led-republique-v2";
const APP_SHELL = ["/", "/participer", "/manifest.json"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  // Vidéos et images : jamais mises en cache par le service worker.
  // Elles sont trop lourdes — les mettre en cache saturait le stockage
  // et ralentissait chaque chargement de page. Le navigateur gère déjà
  // leur mise en cache HTTP native, plus efficace pour ce type de fichier.
  if (url.pathname.startsWith("/videos/") || url.pathname.startsWith("/img/")) {
    event.respondWith(fetch(event.request).catch(() => new Response(null, { status: 204 })));
    return;
  }

  // Reste du site (pages, JS, CSS) : network first, fallback cache = hors-ligne OK.
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request).then((res) => res || caches.match("/")))
  );
});