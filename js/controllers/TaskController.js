app.controller('TaskController', ['$scope', 'schedule', function($scope, schedule){

	$scope.newBlock = function(block){
		schedule.addBlock(block);
	};

	$scope.deleteBlock = function(block){
		schedule.removeBlock(block);
	};

	$scope.blocks = schedule.list;
}]);