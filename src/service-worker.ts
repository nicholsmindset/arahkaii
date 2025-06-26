import { registerRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';
import { precacheAndRoute } from 'workbox-precaching';

precacheAndRoute([
  '/icon-192x192.png',
  '/icon-512x512.png',
  '/index.html',
  '/manifest.json',
]);

registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      {
        cacheWillUpdate: async ({ request, response }) => {
          if (!response.ok) {
            return null;
          }
          return response;
        },
      },
    ],
  }),
);
