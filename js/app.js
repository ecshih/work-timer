var app = angular.module('WorkTimer', ['ngRoute']);
	app.config(function($routeProvider){
		$routeProvider
			.when('/', {
				controller:'MainController',
				templateUrl: 'views/main.html'
			})
			.otherwise({
				redirectTo: '/'
			});
	});
