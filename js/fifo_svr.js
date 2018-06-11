angular.module('app.services', [])

	.factory('UserSvr', ['$http', function($http) {
		var userSvr = {};

		userSvr.login = function(data) {
			return $http.post('auth/login', data);
		};

		userSvr.getUserInfo = function() {
			return $http.get('user/detail')
		};

		userSvr.add = function(data) {
			return $http.post('user/add', data);
		};

		userSvr.query = function(data) {
			return $http.post('user/list', data);
		};

		userSvr.modify = function(data) {
			return $http.post('user/modify', data);
		};

		userSvr.lock = function(id) {
			return $http.get('user/lock/' + id);
		};

		userSvr.unlock = function(id) {
			return $http.get('user/unlock/' + id);
		};

		return userSvr;
	}])
;