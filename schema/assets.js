'use strict';

module.exports = function(app , mongoose){

	var assetsSchema = new mongoose.Schema({

    owner       : {type: mongoose.Schema.Types.ObjectId, ref: 'Release'},
		dateCreated : {type : Date,default: Date.now()},
		title 			: {type: String},
		artwork 		: {type: String},
		subtitle 		: {type: String},
		pry_artist 	: {type: String},
		featuring 	: [],
		genre 			: {type: String},
		tracks      : {type: String},
		subgenre 		: {type: String},
		label 			: {type: String},
		format 			: {type: String},
		release_date : {type: String},
		c_line 			: {type: String},
		p_line 			: {type: String},
		production_yr : {type: String},
		upc 				: {type: String},
		catalogue_no : {type: String},
		remixer : {type: String },
		author : {type: String },
		composer : {type: String },
		arranger : {type: String },
		isrc  : {type: String },
		p_advisory : {type: String},
		track_lang : {type: String},
		lyrics_lang : {type: String },
		track_lyrics : {type: String},
		p_tier : {type: String}
	});
	app.db.model('Assets' , assetsSchema);
};
