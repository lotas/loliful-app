const PRECACHE_LIST = [
    '/index.html',
    // images
    '/assets/img/preloader.png',
    '/assets/img/logo.svg',
];


(global => {
    'use strict';

    // Load the sw-toolbox library.
    importScripts('/scripts/sw-toolbox.js');

    // Turn on debug logging, visible in the Developer Tools' console.
    global.toolbox.options.debug = false;

    // By default, all requests that don't match our custom handler will use the
    // toolbox.networkFirst cache strategy, and their responses will be stored in
    // the default cache.
    global.toolbox.router.default = global.toolbox.networkFirst;
    global.toolbox.options.networkTimeoutSeconds = 5;

    // Precache stuff
    global.toolbox.precache(PRECACHE_LIST);

    // // use cached if available
    global.toolbox.router.get('/assets/(.*)', global.toolbox.cacheFirst);
    global.toolbox.router.get('/scripts/(.*)', global.toolbox.fasteset);
    global.toolbox.router.get('/styles/(.*)', global.toolbox.fasteset);

    // // API
    global.toolbox.router.post('/(.*)', global.toolbox.networkOnly, { origin: 'https://api.loliful.io' });
    global.toolbox.router.put('/(.*)', global.toolbox.networkOnly, { origin: 'https://api.loliful.io' });
    global.toolbox.router.delete('/(.*)', global.toolbox.networkOnly, { origin: 'https://api.loliful.io' });

    // Make some calls cachable
    global.toolbox.router.get('/top(.*)', global.toolbox.fastest, { origin: 'https://api.loliful.io' });
    global.toolbox.router.get('/fresh(.*)', global.toolbox.fastest, { origin: 'https://api.loliful.io' });
    global.toolbox.router.get('/nail(.*)', global.toolbox.fastest, { origin: 'https://api.loliful.io' });

    global.toolbox.router.get('/profile(.*)', global.toolbox.fastest, { origin: 'https://api.loliful.io' });
    global.toolbox.router.get('/users(.*)', global.toolbox.fastest, { origin: 'https://api.loliful.io' });
    global.toolbox.router.get('/me', global.toolbox.fastest, { origin: 'https://api.loliful.io' });


    // user avatars
    global.toolbox.router.get(/\.fbcdn\.net/, global.toolbox.cacheFirst);
    global.toolbox.router.get(/\.twimg\.com/, global.toolbox.cacheFirst);
    global.toolbox.router.get(/\.googleusercontent\.com/, global.toolbox.cacheFirst);


    // Boilerplate to ensure our service worker takes control of the page as soon
    // as possible.
    global.addEventListener('install', () => global.skipWaiting());
    global.addEventListener('activate', () => global.clients.claim());
})(self);
