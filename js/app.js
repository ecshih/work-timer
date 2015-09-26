Blocks = new Mongo.Collection('blocks');

if (Meteor.isClient) {

	var app = angular.module('WorkTimer', ['ngRoute', 'angular-meteor']);

	app.config(function($routeProvider){
		$routeProvider
			.when('/', {
				controller:'TaskController',
				templateUrl: 'views/home.html'
			})
			.when('/:id', {
				controller: 'TimerController',
				templateUrl: 'views/timer.html'
			})
			.otherwise({
				redirectTo: '/'
			});
	});

}