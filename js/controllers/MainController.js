app.controller('MainController', ['$scope', 'schedule', function($scope, schedule){
	$scope.newBlock = {};
	$scope.schedule = schedule;
}]);