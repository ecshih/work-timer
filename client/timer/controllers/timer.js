	angular.module('WorkTimer').controller('TimerCtrl', ['$scope', '$meteor','$interval', '$stateParams', '$window', function($scope, $meteor, $interval, $stateParams, $window){

		$scope.block = $meteor.object(Blocks, $stateParams.blockId).subscribe('blocks');
		$scope.runButton = "Start Timer";

		var totalSeconds = $scope.block.duration * 60;

		var timer;
		var on = false;

		var hours = 0;
		var minutes = 0;
		var seconds = 0;

		var audio = new Audio('/Small-bell-ringing.wav');

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
			totalSeconds = $scope.block.duration * 60;

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
