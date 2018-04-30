'use strict';

module.exports = function(app , mongoose){

	var releaseSchema = new mongoose.Schema({

       //user       : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
		dateCreated : {type : Date,default: Date.now()},
		title 			: {type: String},
		artwork 		: {type: String},
		subtitle 		: {type: String},
		pry_artist 	: {type: String},
		featuring 			: [{title: String}],
		genre 			: {type: String},
		tracks      : [],
		subgenre 		: {type: String},
		label 			: {type: String},
		format 			: {type: String},
		release_date : {type: String},
		c_line 			: {type: String},
		p_line 			: {type: String},
		status        : {type: String},
		production_yr : {type: String},
		upc 				: {type: String},
		catalogue_no : {type: String},
	});
	app.db.model('Release' , releaseSchema);
};
