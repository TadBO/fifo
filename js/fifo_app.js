angular.module('FifoApp', ['ui.router', 'app.services', 'app.directives', 'app.filters', 'app.routers', 'app.controllers'])

	.run(function($rootScope, $state, $stateParams) {
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;
	})

	.constant('GlobalConst', {
		AUTH_TOKEN_HEADER_NAME: "AUTH-TOKEN",
		AUTH_TOKEN_CACHE_NAME: "AUTH_TOKEN",
		UNAUTH_ROUTER_URI: "/login",
		DEFAULT_WELCOME_URI: "main"
	})

	.factory('LocalStorageProvider', ['$window', function($window) {
		return {
			set: function(key, value) {
				$window.localStorage[key] = value;
			},
			get: function(key, defaultValue) {
				return $window.localStorage[key] || defaultValue;
			},
			setObject: function(key, value) {
				$window.localStorage[key] = JSON.stringify(value);
			},
			getObject: function(key) {
				return JSON.parse($window.localStorage[key] || '{}');
			}
		}
	}])

	.factory('SessionStorageProvider', [function() {
		return {
			set: function(key, value) {
				sessionStorage.setItem(key, value);
			},
			get: function(key, defaultValue) {
				return sessionStorage.getItem(key) || defaultValue;
			},
			setObject: function(key, value) {
				sessionStorage.setItem(key, JSON.stringify(value));
			},
			getObject: function(key) {
				return JSON.parse(sessionStorage.getItem(key) || '{}');
			},
			remove: function(key) {
				sessionStorage.removeItem(key);
			},
			removeItems: function(items) {
				angular.forEach(items, function(item) {
					sessionStorage.removeItem(item);
				});
			},
			clear: function() {
				sessionStorage.clear();
			}
		}
	}])

	.factory('AuthInterceptor', ["$location", "$q", "LocalStorageProvider", "GlobalConst", function($location, $q, LocalStorageProvider, GlobalConst) {
		return {
			request: function(config) {
				config.headers = config.headers || {};
				config.headers[GlobalConst.AUTH_TOKEN_HEADER_NAME] = LocalStorageProvider.get(GlobalConst.AUTH_TOKEN_CACHE_NAME, "");
				return config;
			},
			responseError: function(response) {
				if(response.status == 401) {
					LocalStorageProvider.set(GlobalConst.AUTH_TOKEN_CACHE_NAME, "");
					$location.url(GlobalConst.UNAUTH_ROUTER_URI);
				}
				return $q.reject(response);
			}
		};
	}])

	.config(function($httpProvider) {
		$httpProvider.defaults.transformRequest = function(obj) {
			var str = [];
			for(var p in obj) {
				if(obj[p] == null || obj[p] == 'null') {
					obj[p] = '';
				}
				str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			}
			return str.join("&");
		};
		$httpProvider.defaults.headers.post = {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})

	.config(function($httpProvider) {
		$httpProvider.interceptors.push('AuthInterceptor');
	});