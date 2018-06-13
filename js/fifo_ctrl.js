angular.module('app.controllers', [])

	.controller("LoginCtrl", function($scope, $state, UserSvr, LocalStorageProvider, GlobalConst) {
		$scope.data = {
            username: '',
            password: ''
		};
		$scope.submit = function() {
            $state.go(GlobalConst.DEFAULT_WELCOME_URI);
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
		$scope.data = {
			phone: '',
            verification: '',
			password: ''
		}
        console.log($scope.data);
        $scope.submit = function () {
            console.log($scope.data);
            $state.go('login');
            UserSvr.register($scope.data).success(function (res) {

            })
        }
	})

	.controller("MainCtrl", function($rootScope, $scope, $state, UserSvr, LocalStorageProvider, GlobalConst) {
		
	})
    .controller("MemberCtr", function($rootScope, $scope, $state, UserSvr, LocalStorageProvider, GlobalConst) {
        console.log('member');
    })
	.controller("WarehouseCtr", function ($rootScope, $scope, $state, UserSvr, LocalStorageProvider, GlobalConst) {
        console.log('WarehouseCtr');
    })
    .controller("CenterCtr", function ($rootScope, $scope, $state, UserSvr, LocalStorageProvider, GlobalConst) {
        console.log('CenterCtr');
    })
    .controller("AppointmentCtr", function ($rootScope, $scope, $state, UserSvr, LocalStorageProvider, GlobalConst) {
        console.log('AppointmentCtr');
    })


;