app.factory('schedule', function(){
	var blocks = [];
	var allBlocks = {};

	allBlocks.addBlock = function(block){
		blocks.push(block);
		$('input[name=task]').focus();
	};

	allBlocks.removeBlock = function(block){
		var index = blocks.indexOf(block);
		blocks.splice(index, 1);
	};

	allBlocks.blocks = function(){
		return blocks;
	};

	return allBlocks;
});