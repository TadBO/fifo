angular.module('app.routers', [])

	.config(function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/login');
		$stateProvider.state('login', {
			url: '/login',
			templateUrl: 'tpl/login.html?v=20180302',
			controller: "LoginCtrl"
		}).state('register', {
			url: '/register',
			templateUrl: 'tpl/register.html?v=20180302',
			controller: "RegisterCtrl"
		}).state('main', {
			url: '/main',
			templateUrl: 'tpl/main.html?v=20180302',
			controller: function ($state) {
				$state.go('main.member');
            }
		}).state('main.member',{
			url: '/member',
			templateUrl: 'tpl/member/member.html?v=20180302'

		}).state('main.warehouse',{
			url: '/warehouse',
            templateUrl: 'tpl/warehouse/warehouse.html?v=20180302'
		}).state('main.center', {
			url: '/center',
            templateUrl: 'tpl/center/center.html?v=20180302'
		});
	});