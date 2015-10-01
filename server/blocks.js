Meteor.publish("blocks", function(){
	return Blocks.find({
		$and:[
			{owner:this.userId},
			{owner: {$exists: true}}
		]
	});
});