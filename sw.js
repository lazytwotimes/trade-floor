/* Trade Floor service worker.

   The whole point of this file is Sunday: the app has to open and run at a
   convention hall with no signal. Everything the app needs is cached on the
   first visit and served from that cache forever after, so the network is
   never on the critical path.

   Bump CACHE when the app changes, or browsers will keep serving the old one. */
var CACHE = "trade-floor-v4";
var SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png"
];

self.addEventListener("install", function(e){
  e.waitUntil(
    caches.open(CACHE)
      .then(function(c){ return c.addAll(SHELL); })
      .then(function(){ return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(k){
        return k === CACHE ? null : caches.delete(k);
      }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function(e){
  var req = e.request;
  if(req.method !== "GET") return;

  var url = new URL(req.url);

  /* Price lookups are a Prep-at-home job and must never be served stale.
     Left alone entirely, so offline it simply fails and the app says so. */
  if(url.hostname === "api.pokemontcg.io") return;

  /* Anything off our own origin is not ours to cache. */
  if(url.origin !== self.location.origin) return;

  /* A navigation always resolves to the app shell, so opening the app with no
     signal, or from the home screen, lands on the cached page rather than a
     browser error. */
  if(req.mode === "navigate"){
    e.respondWith(
      caches.match("./index.html").then(function(hit){
        return hit || fetch(req).catch(function(){ return caches.match("./"); });
      })
    );
    return;
  }

  e.respondWith(
    caches.match(req).then(function(hit){
      if(hit) return hit;
      return fetch(req).then(function(res){
        if(res && res.ok && res.type === "basic"){
          var copy = res.clone();
          caches.open(CACHE).then(function(c){ c.put(req, copy); });
        }
        return res;
      });
    })
  );
});
