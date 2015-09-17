app.controller('TimerController', ['$scope', '$interval', 'schedule', '$routeParams', '$window', function($scope, $interval, schedule, $routeParams, $window){
	$scope.schedule = schedule;
	$scope.task = schedule.blocks()[$routeParams.id];

	var totalTimeSec = $scope.task.duration * 60;

	$scope.seconds = 0;
	$scope.minutes = 0;
	$scope.hours = 0;

	$scope.runButton = "Start Timer";

	var on = false;
	var timer;

	$scope.secondsDisplay = function(){

		if ($scope.seconds < 10) {
			return "0" + $scope.seconds.toString();
		}
		else {
			return $scope.seconds;
		}
	};

	$scope.minutesDisplay = function(){

		if ($scope.minutes < 10) {
			return "0" + $scope.minutes.toString();
		}
		else {
			return $scope.minutes;
		}
	};

	$scope.displayTimer = function() {
		
		$scope.hours = parseInt(totalTimeSec / 3600);
		$scope.minutes = parseInt( (totalTimeSec - ($scope.hours * 3600)) / 60);
		$scope.seconds = totalTimeSec % 60;

		var timeToShow = function() {
			return $scope.hours + ":" + $scope.minutesDisplay() + ":" + $scope.secondsDisplay();
		};

		return timeToShow();
	};

	$scope.runTimer = function(){
		if (on == false) {
			on = true;
			timer = $interval(function(){
				totalTimeSec--;
				$scope.displayTimer();
				if (totalTimeSec <= 0) {
					$scope.completedTimer();
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

	$scope.completedTimer = function(){
		document.getElementById("completedSound").play();
		$window.alert("Time's up!");
		$interval.cancel(timer);
	};
}]);