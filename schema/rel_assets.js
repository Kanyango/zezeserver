'use strict';

module.exports = function(app , mongoose){

	var releaseSchema = new mongoose.Schema({

    owner       : {type: mongoose.Schema.Types.ObjectId, ref: 'Release'},
		dateCreated : {type : Date,default: Date.now()},
		track       : {type: String},
		type        : {type: String},
		title 			: {type: String},
		artwork 		: {type: String},
		subtitle 		: {type: String},
		pry_artist 	: {type: String},
		featuring 	: [],
		genre 			: {type: String},
		subgenre 		: {type: String},
		label 			: {type: String},
		format 			: {type: String},
		release_date : {type: String},
		c_line 			: {type: String},
		p_line 			: {type: String},
		production_yr : {type: String},
		upc 				: {type: String},
		catalogue_no : {type: String
		remixer      : {type: String},
		author      : {type: String},
		composer    : {type: String},
		arranger    : {type: String},
		publisher   : {type: String},
		isrc      	: {type: String},
		price_tier  : {type: String},
		parental_ad : {type: String},
		track_title_language : {type: String},
		lyrics_language  : {type: String},
		track_lyrics     : {type: String},
		release_date 		 : {type: String},
		pre_order_date   : {type: String},
		ex_rel_date      : {type: String}
	});
	app.db.model('Release' , releaseSchema);
};
