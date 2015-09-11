
//$(document).ready(function(){

	var totalTimeSec = 0;
	var minutes = 0;
	var seconds = 0;
	var on = false;
	var timer = "";

	var secondsDisplay = function(){

		if (seconds < 10) {
			return "0" + seconds.toString();
		}
		else {
			return seconds;
		}
	}

	function displayTimer() {
		minutes = parseInt(totalTimeSec / 60);
		seconds = totalTimeSec % 60;

		$('#clock').text(minutes+":"+secondsDisplay());
	}

	function setTimer() {
		var totalTime = document.getElementById("timerLength").value;

		totalTimeSec = totalTime * 60;

		//change instruction to name of task eventually, hide for now
		
		displayTimer();

		if ($('#runBtn').css('visibility') == 'hidden'){
			$('#runBtn').css('visibility', 'visible');
		}

	}

	function runTimer() {


		if (on == false) {
			on = true;
			timer = setInterval(countdown, 1000);
			$('#runBtn').text("Stop Timer");
			$('#runBtn').attr("class", "btn btn-lg btn-danger");
		} else {
			on = false;
			clearInterval(timer);
			$('#runBtn').text("Start Timer");
			$('#runBtn').attr('class', 'btn btn-lg btn-primary');
		}
		function countdown(){
		totalTimeSec--;

		displayTimer();

		if (totalTimeSec <= 0) {
			alert("Time's up!");
			clearInterval(timer);
		}
		}
	}
//});

