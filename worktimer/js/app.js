Blocks = new Mongo.Collection('blocks');

if (Meteor.isClient) {

	angular.module('WorkTimer', ['ui.router', 'angular-meteor']);

	angular.module('WorkTimer').config(['$urlRouterProvider', '$stateProvider', '$locationProvider', function($urlRouterProvider, $stateProvider, $locationProvider){

		$locationProvider.html5Mode(true);

		$stateProvider
			.state('blocks', {
				url: '/blocks',
				controller:'BlocksListCtrl',
				templateUrl: 'views/home.ng.html'
			})
			.state('blockTimer', {
				url:'/blocks/:blockId', 
				templateUrl: 'views/timer.ng.html'
			});

			$urlRouterProvider.otherwise("/blocks");
	}]);

	angular.module('WorkTimer').controller('BlocksListCtrl', ['$scope', '$meteor', function($scope, $meteor){

		$scope.blocks = $meteor.collection(Blocks);

	/*$scope.newBlock = function(block){
		schedule.addBlock(block);
	};*/

		$scope.delete = function(block){
			$scope.blocks.remove(block);
		};

	}]);

/* TimerController */

	angular.module('WorkTimer').controller('TimerCtrl', ['$scope', '$meteor','$interval', '$stateParams', '$window', function($scope, $meteor, $interval, $stateParams, $window){

		$scope.block = $meteor.object(Blocks, $stateParams.blockId ); //might be bad practice to reuse this in two controllers, should move to a service
		$scope.runButton = "Start Timer";

		totalSeconds = $scope.block.duration * 60;

		var timer;
		var on = false;

		var hours = 0;
		var minutes = 0;
		var seconds = 0;

		var audio = new Audio('public/Small-bell-ringing.wav');

		var secondsDisplay = function(){

			if (seconds < 10) {
				return "0" + seconds.toString();
			}
			else {
				return seconds;
			}
		};

		var minutesDisplay = function(){

			if (minutes < 10) {
				return "0" + minutes.toString();
			}
			else {
				return minutes;
			}
		};

		$scope.displayTimer = function() {	
			hours = parseInt(totalSeconds / 3600);
			minutes = parseInt( (totalSeconds - (hours * 3600)) / 60 );
			seconds = totalSeconds % 60;

			var timeToShow = function() {
				return hours + ":" + minutesDisplay() + ":" + secondsDisplay();
			};

			return timeToShow();
		};

		$scope.runTimer = function(){
			if (on === false) {
				on = true;
				timer = $interval(function(){
					totalSeconds--;
					$scope.displayTimer();

					if (totalSeconds <= 0) {
						completedTimer();
					}
				}, 1000);
				$scope.runButton = "Stop Timer";
				$('#runBtn').attr("class", "btn btn-lg btn-danger");
			} else {
				on = false;
				$interval.cancel(timer);
				$scope.runButton = "Start Timer";
				$('#runBtn').attr('class', 'btn btn-lg btn-primary');
			}
		};

		completedTimer = function(){
			audio.play();
			$window.alert("Time's up!");
			$interval.cancel(timer);
		};

	}]); 


	/* DIRECTIVES */
	angular.module('WorkTimer').directive('entryForm', function(){
		return{
			restrict: 'E',
			templateUrl: 'js/directives/entryForm.ng.html'
		};
	});

	angular.module('WorkTimer').directive('taskList', function(){
		return {
			restrict: 'E',
			templateUrl: 'js/directives/taskList.ng.html'
		};
	});

}