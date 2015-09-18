app.controller('TimerController', ['$scope', '$interval', 'schedule', '$routeParams', '$window', function($scope, $interval, schedule, $routeParams, $window){
	var task = schedule.list[$routeParams.id];
	$scope.currentTaskName = task.task;

	$scope.runButton = "Start Timer";

	var on = false;
	var timer;

	$scope.secondsDisplay = function(){

		if (task.estSeconds < 10) {
			return "0" + task.estSeconds.toString();
		}
		else {
			return task.estSeconds;
		}
	};

	$scope.minutesDisplay = function(){

		if (task.estMinutes < 10) {
			return "0" + task.estMinutes.toString();
		}
		else {
			return task.estMinutes;
		}
	};

	$scope.displayTimer = function() {
		
		//This is a work-around, will remove this when I refactor to use single property of totalTimeSec leaving the rest to be pushed through display logic only
		task.estHours = parseInt(task.totalTimeSec / 3600);
		task.estMinutes = parseInt((task.totalTimeSec - (task.estHours * 3600)) / 60);
		task.estSeconds = task.totalTimeSec % 60;


		var timeToShow = function() {
			return task.estHours + ":" + $scope.minutesDisplay() + ":" + $scope.secondsDisplay();
		};

		return timeToShow();
	};

	$scope.runTimer = function(){
		if (on == false) {
			on = true;
			timer = $interval(function(){
				task.totalTimeSec--;
				$scope.displayTimer();
				if (task.totalTimeSec <= 0) {
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