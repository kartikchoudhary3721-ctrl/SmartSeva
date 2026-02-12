self.addEventListener('install', e => {
console.log('SmartSeva Installed');
});

self.addEventListener('fetch', e => {
e.respondWith(fetch(e.request));
});
