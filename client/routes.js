angular.module('WorkTimer').run(['$rootScope', '$location', function($rootScope, $state){
	$rootScope.$on("stateChangeError", function(event, next, previous, error){
		if (error === 'AUTH_REQUIRED'){
			$state.go("/blocks");
		}
	});
}]);

angular.module('WorkTimer').config(['$urlRouterProvider', '$stateProvider', '$locationProvider', function($urlRouterProvider, $stateProvider, $locationProvider){
	$locationProvider.html5Mode(true);

	$stateProvider
		.state('blocks', {
			url: '/blocks',
			controller:'BlocksListCtrl',
			templateUrl: 'client/blocks/views/home.ng.html'
		})
		.state('blockTimer', {
			url:'/blocks/:blockId', 
			templateUrl: 'client/timer/views/timer.ng.html',
			resolve: {
				"currentUser": ["$meteor", function($meteor){
					return $meteor.requireUser();
				}]
			}
		});

	$urlRouterProvider.otherwise("/blocks");
}]);
