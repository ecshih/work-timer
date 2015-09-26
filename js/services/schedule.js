app.factory('schedule', function($meteor){
	var allBlocks = {};

	allBlocks.list = [];

	//refactor to create an object prototype - see if I can get the estHours, estMinutes, estSeconds to autocalculate based on totalTimeSec or else move them to view only since they're all calculated from same base totalTimeSec variable.

	allBlocks.addBlock = function(block){
		/*if (block.duration.search((\d:\d+)|\d+)) {

		}*/
		block.totalTimeSec = block.duration * 60;
		block.estHours = parseInt(block.totalTimeSec / 3600);
		block.estMinutes = parseInt((block.totalTimeSec - (block.estHours * 3600)) / 60);
		block.estSeconds = block.totalTimeSec % 60;

		allBlocks.list.push(block);
		$('input[name=task]').focus();
	};

	allBlocks.removeBlock = function(block){
		var index = allBlocks.list.indexOf(block);
		allBlocks.list.splice(index, 1);
	};

	return allBlocks;
});