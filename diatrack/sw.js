const staticCacheName = 'site-static-v11'; //cache first
const dynamicCacheName = 'site-dynamic'; //load pages first
const assets = [
    '/',
    '/index.html',
    '/fallback.html',
    '/src/stylesheets/main.css',
    '/src/stylesheets/responsive.css',
    '/src/images/mainlogo.png',
    '/src/javascript/navLinks.js',
    '/src/javascript/app.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css'

];

// install service worker
self.addEventListener('install', evt =>{
    //console.log('[Service Worker] Installing Service Worker ...', evt);
    evt.waitUntil(caches.open(staticCacheName).then(cache =>{
        console.log('caching shell assets');
        cache.addAll(assets).then(r => assets);
    }))
});
self.addEventListener('activate', evt =>{
    //console.log('[Service Worker] Activating Service Worker ...', evt);
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticCacheName &&  key !== dynamicCacheName).map(key => caches.delete(key)))
        })
    )

});

self.addEventListener('fetch', evt => {
    //console.log('fetch event', evt);
    evt.respondWith(
        caches.match(evt.request).then(cacheRes =>{
            return cacheRes || fetch(evt.request).then(fetchRes => {
                return caches.open(dynamicCacheName).then(cache => {
                    cache.put(evt.request.url, fetchRes.clone());
                    return fetchRes;
                })
            });
        }).catch(() => caches.match('/fallback.html'))
    )
});
