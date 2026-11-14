const CACHE_NAME = 'alx-accessibility-v1';
const APP_SHELL = [
  '/',
  '/alx-signup.js',
  '/js/signup-widget.js',
  '/js/profile-widget.js',
  '/js/offline-store.js',
  '/css/widget-theme.css',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(
    keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
  )));
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request)));
});
