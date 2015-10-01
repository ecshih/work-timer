angular.module('WorkTimer').controller('BlocksListCtrl', ['$scope', '$meteor', function($scope, $meteor){

		$scope.blocks = $meteor.collection(Blocks).subscribe('blocks');


	/*$scope.newBlock = function(block){
		schedule.addBlock(block);
	};*/

		$scope.delete = function(block){
			$scope.blocks.remove(block);
		};


}]);