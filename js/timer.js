
var totalTimeSec = 0;

var minutes = 0;
var seconds = 0;
var on = false;
var timer = "";

var secondsDisplay = function(){
		if (seconds == 0) {
			return "00";
		}
		else if(seconds == 1) {
			return "01";
		}
		else if(seconds == 2) {
			return "02";
		}
		else if(seconds == 3) {
			return "03";
		}
		else if(seconds == 4) {
			return "04";
		}
		else if(seconds == 5) {
			return "05";
		}
		else if(seconds == 6) {
			return "06";
		}
		else if(seconds == 7) {
			return "07";
		}
		else if(seconds == 8) {
			return "08";
		}
		else if(seconds == 9) {
			return "09";
		}
		else {
			return seconds;
		}
	}

function displayTimer() {
	minutes = parseInt(totalTimeSec / 60);
	seconds = totalTimeSec % 60;

	document.getElementById("clock").innerHTML = minutes+":"+secondsDisplay();
}

function setTimer() {
	var totalTime = document.getElementById("timerLength").value;

	totalTimeSec = totalTime * 60;

	displayTimer();

	if (document.getElementById("runBtn").style.visibility == "hidden") {
		document.getElementById("runBtn").style.visibility = "visible";
	}

}

function runTimer() {


	if (on == false) {
		on = true;
		timer = setInterval(countdown, 1000);
		document.getElementById("runBtn").innerHTML = "Stop Timer";
		document.getElementById('runBtn').setAttribute("class","btn btn-lg btn-danger");
	} else {
		on = false;
		clearInterval(timer);
		document.getElementById("runBtn").innerHTML = "Start Timer";
		document.getElementById('runBtn').setAttribute("class","btn btn-lg btn-primary");

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

