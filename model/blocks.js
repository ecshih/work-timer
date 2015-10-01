Blocks = new Mongo.Collection('blocks');

Blocks.allow({
	insert: function (userId, block) {
		return userId && block.owner === userId;
	},
	
	update: function(userId, block, fields, modifier) {
		return userId && block.owner === userId;
	},
	
	remove: function(userId, block) {
		return userId && block.owner === userId;
	}
});