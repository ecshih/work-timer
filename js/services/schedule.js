app.factory('schedule', function(){
	var blocks = [];
	var allBlocks = {};

	allBlocks.addBlock = function(block){
		blocks.push(block);
	};

	allBlocks.blocks = function(){
		return blocks;
	};

	return allBlocks;
});