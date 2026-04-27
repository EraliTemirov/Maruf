// Service Worker for JAMO Textile website
// Version 1.0.0

//const CACHE_NAME = 'jamo-textile-v1';
//const urlsToCache = [
//  '/',
//  '/index.html',
//  '/style.css',
//  '/app.js',
//  '/image/company-background.jpg',
 // '/image/womens-clothing.jpg',
//  '/image/mens-clothing.jpg',
//  '/image/children-clothing.jpg',
//  '/image/company-team.jpg',
//  '/image/textile-patterns.jpg',
//  '/image/company-building.jpg',
 // '/image/quality-control.jpg',
 // '/image/manufacturing-process.jpg',
  //'/image/factory-exterior.jpg',
///  '/image/warehouse.jpg',
//  '/image/company-workers.jpg',
//  '/image/news-factory-opening.jpg',
//  '/image/news-exhibition.jpg'
//];

// Install event - cache resources
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Cache opened');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Return cached response if found
        if (response) {
          return response;
        }
        
        // Otherwise fetch from network
        return fetch(event.request).then(
          function(response) {
            // Check if valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});