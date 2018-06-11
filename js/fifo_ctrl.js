angular.module('app.controllers', [])

	.controller("LoginCtrl", function($scope, $state, UserSvr, LocalStorageProvider, GlobalConst) {
		$scope.data = {};

		$scope.submit = function() {
			UserSvr.login($scope.data).success(function(res) {
				if(res.code == 200) {
					LocalStorageProvider.set(GlobalConst.AUTH_TOKEN_CACHE_NAME, res.data);
					$state.go(GlobalConst.DEFAULT_WELCOME_URI);
				} else {
					alert(res.errorMsg);
				}
			});
		};

		$scope.init = function() {
			if(LocalStorageProvider.get(GlobalConst.AUTH_TOKEN_CACHE_NAME, "") != "") {
				$state.go(GlobalConst.DEFAULT_WELCOME_URI);
			}
		};
		$scope.init();
	})

	.controller("RegisterCtrl", function($rootScope, $scope, $state, UserSvr, LocalStorageProvider, GlobalConst) {

	})

	.controller("MainCtrl", function($rootScope, $scope, $state, UserSvr, LocalStorageProvider, GlobalConst) {
		
	});