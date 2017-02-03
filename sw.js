//cache version
var cacheName = 'v6';
//cache files
var cacheFiles = [
	'./',
	'./index.html',
	'./css/style.css',
	'./css/catcolors.css',
	'./css/colors.css',
	'./css/colorsbg.css',
	'./css/colorsfill.css',
	'./app.js',
	'./sw.js',
	'./images/code.svg',
	'./images/heart4.svg',
	'./js/script.js',
	'./js/treedbox-random-color.js',
	'./icon/treedbox.png',
	'./icon/treedbox-ani.svg',
	'./icon/android-material-cat.png'
];

//install SW
self.addEventListener('install', function(e){
	console.log('SW Installed');
	console.log('e.waitUntil', e.waitUntil);
	//install wait until this Promise
	e.waitUntil(
		//open cache with the cacheName
		caches.open(cacheName)
			//then
			.then(function(cache){
				console.log('SW Caching Files', cache);
				//add all files listed in cacheFiles on this cache
				return cache.addAll(cacheFiles);
			})
	)
});

//activate SW
self.addEventListener('activate', function(e){
	console.log('SW activated');
	//activate wait until is complete
	e.waitUntil(
		caches.keys()
			.then(function(cacheNames){
				//looping throught everything in the cache
				return Promise.all(
					//get this cache by the name
					cacheNames.map(function(thisCacheName){
						//if this cache name is not equal the current
						if (thisCacheName !== cacheName) {
							console.log('removing old cache', thisCacheName);
							//remove old cache
							return caches.delete(thisCacheName);
						}
					})
				)
			})
	)
});
//fetch SW
self.addEventListener('fetch', function(e){
	console.log('SW fetching', e.request.url);

	e.respondWith(
		//check in cache if the requested url exists
		caches.match(e.request)
			.then(function(response){
				if (response) {
					console.log('SW Found in cache', e.request.url);
					//return the cache version
					return response;
				}
				//clone request
				var requestClone = e.request.clone();

				//if not found in cache, fetch request
				return fetch(requestClone)
				.then(function(response){
					//if no response from fetch
					if (!response) {
						console.log('SW no response from fetch');
						return response;
					}
					//
					var responseClone = response.clone();
					//
					caches.open(cacheName)
						//
						.then(function(cache){
							//
							cache.put(e.request, responseClone);
							//return response
							return response;
						});
				})
			})
			.catch(function(error){
				console.log('SW Error fetching & Caching new Data', error);
			})
	)

});
