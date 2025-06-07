const CACHE_NAME = 'v4'; // Ubah ke versi baru untuk memaksa update

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/assets/logo.png',
        '/assets/background.jpg',
        '/assets/padi.png',
        '/assets/cloud-computing.png',
        '/src/js/app.js',
        '/src/views/home.js',
        '/src/views/diagnose.js',
        '/src/views/history.js',
        '/src/views/help.js',
        '/src/views/detail.js',
        '/src/views/faq.js',
        '/src/views/inferensi.js',
        '/manifest.json'
      ]);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Menghapus cache lama:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => {
        return caches.match('/index.html');
      });
    })
  );
});