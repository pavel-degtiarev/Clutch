async function enablePreload() {
  if (self.registration.navigationPreload) {
    await self.registration.navigationPreload.enable();
  }
}

async function putInCache(request, response) {
  const url = new URL(request.url);
  if (url.protocol === "chrome-extension:") return;

  const cache = await caches.open("v1");
  await cache.put(request, response);
}

async function fetchResource(event) {

  // если найдено в кэше, возвращаем оттуда
  const foundInCache = await caches.match(event.request);
  if (foundInCache) return foundInCache;

  // если сработал прелоуд, => результат в кэш и возвращаем его
  const preloadResponse = await event.preloadResponse;
  if (preloadResponse) {
    console.info("using preload response", preloadResponse);
    putInCache(event.request, preloadResponse.clone());
    return preloadResponse;
  }

  // тянем ресурс с сервера, кладем его в кэш и возвращаем
  try {
    const serverResponse = await fetch(event.request);
    putInCache(event.request, serverResponse.clone());
    return serverResponse;
  } catch (error) {
    // если все плохо, грустим
    return new Response("Network error happened", {
      status: 408,
      headers: { "Content-Type": "text/plain" },
    });
  }
}

// ==============================

self.addEventListener("activate", (event) => event.waitUntil(enablePreload()));
self.addEventListener("fetch", (event) => event.respondWith(fetchResource(event)));
