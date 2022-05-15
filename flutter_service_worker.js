'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "03fbcfdf7b78e5c5b683fd621b449c4c",
"index.html": "046e1caf8208b97fe0a16c82da41b127",
"/": "046e1caf8208b97fe0a16c82da41b127",
"main.dart.js": "271c45c7d9b8cf9712adf215c6a2f658",
"flutter.js": "0816e65a103ba8ba51b174eeeeb2cb67",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "77dc03b82b9d97f41a217a57bd873eaf",
"assets/AssetManifest.json": "01b9ecd9e4b43b73271821a4bd13255e",
"assets/NOTICES": "8f6b5fc1aede10d0acc2fd12b568ed39",
"assets/FontManifest.json": "757c9b64405038633cbebb4f4b301567",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/wakelock_web/assets/no_sleep.js": "7748a45cd593f33280669b29c2c8919a",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/assets/image/2.0x/navi_settings.webp": "b176d561e4a0e3aa4a2d5d6d7cf1164d",
"assets/assets/image/2.0x/navi_message.png": "c43d0656d32103450e7acb2bfa298e54",
"assets/assets/image/2.0x/navi_camera.png": "fd96abb7b754c80268ce0a1fb1e9c0fb",
"assets/assets/image/2.0x/navi_night.webp": "fdf6900bddc36eec848afd83430e9bfb",
"assets/assets/image/2.0x/placeholder_no_data.png": "ee08e975a31132df98039b9ea0319a7b",
"assets/assets/image/2.0x/ic_search.png": "fb80a6c23280da698bde57733745564d",
"assets/assets/image/2.0x/navi_scan.png": "e23693b604e7f32ad8a2137ec29f6c7f",
"assets/assets/image/2.0x/navi_search.png": "91450a9eee8bdefed529ce923d9a630c",
"assets/assets/image/2.0x/navi_dog.png": "dc591a13eb7dda5754a1314d2c8aadf4",
"assets/assets/json/first.json": "cd45e9a1ca92660878dda10f6a1ee092",
"assets/assets/json/web/recommend.json": "8bdda20bc660386c803c9bf4bc58ef2d",
"assets/assets/json/street.json": "89167dcfe2cc97e06aced4c64b854a74",
"assets/assets/json/city.json": "9f0b252eb5fa697bab4daabb261f6845",
"assets/assets/json/area.json": "1a177d3c7136e86e189736e48ed30c1b",
"assets/assets/json/province.json": "cdf6373f05a38dacfd2de3f5e8d1b45b",
"assets/assets/json/category.json": "dc56ef32178bfe05b5544459056cae37",
"assets/assets/json/home.json": "2f1e723bea330701e1ac46e4dfde123b",
"assets/assets/lottie/loading.json": "131b336708e91fafcaf82c982b94701d",
"assets/assets/lottie/timer_dialog.json": "3865aca71a0ffa980f3b3a649d698a3b",
"assets/assets/lottie/notfound.json": "c3d69c2b24500d6a95dcfe491809cf44",
"assets/assets/lottie/liveLottie.json": "d17824cbdb540d59b12ad81256863f2a",
"assets/assets/lottie/refresh.json": "c1ec250768ea993cca07c21941e9676a",
"assets/assets/lottie/pull.json": "471742c657caacaaecb8185a9c345cdd",
"assets/assets/font/UDC1.04-Medium.otf": "56624f1d428c2a4957a535996b8d29d9",
"assets/assets/font/UDC1.04-Light.otf": "33bc85eb1e2bdac3ef93981ee892e32b",
"assets/assets/font/JDZhengHT-Light.ttf": "79beeb3aed0b0c2f924c926f752ee17b",
"assets/assets/font/JDZhengHT-Regular.ttf": "0bea5bb8878eea4a3f92cbc3435a8f91",
"assets/assets/font/JDZhengHT-Bold.ttf": "9dddc333df972a35ae615b29d052b127",
"assets/assets/font/UDC1.04-Bold.otf": "716a7944ca72bba217e5db1002546aa0",
"canvaskit/canvaskit.js": "c2b4e5f3d7a3d82aed024e7249a78487",
"canvaskit/profiling/canvaskit.js": "ae2949af4efc61d28a4a80fffa1db900",
"canvaskit/profiling/canvaskit.wasm": "95e736ab31147d1b2c7b25f11d4c32cd",
"canvaskit/canvaskit.wasm": "4b83d89d9fecbea8ca46f2f760c5a9ba"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
