app.directive('taskList', function(){
	return {
		restrict: 'E',
		scope: {
			todo: '=',
			index: '@'
		},
		controller: function($scope, schedule) {
			$scope.schedule = schedule;
		},
		templateUrl: 'js/directives/taskList.html'
	};
});