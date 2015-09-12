app.controller('TimerController', ['$scope', '$interval', 'schedule', '$routeParams', function($scope, $interval, schedule, $routeParams){
	$scope.schedule = schedule;
	$scope.task = schedule.blocks()[$routeParams.id];

	var totalTimeSec = $scope.task.duration * 60;

	$scope.seconds = totalTimeSec % 60;
	$scope.minutes = parseInt(totalTimeSec / 60);

	

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

	$scope.displayTimer = function() {
		$scope.minutes = parseInt(totalTimeSec / 60);
		$scope.seconds = totalTimeSec % 60;
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
		$window.alert("Time's up!");
		$interval.cancel(timer);
	}
}]);