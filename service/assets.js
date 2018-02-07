'use strict';
var mongoose = require('mongoose');
var multer = require('multer');
var fs = require('fs');
var path = require('path');
var apikey   = '12f34bba9ea25cae365b6dc1b92fba2e881ee332213923f91dcd18e4c47540e6';
var cloudinary = require('cloudinary');
const https = require('https');


var asset = {

	create : function(req , res , next)
	{
		var fieldsToSet = {
			owner       : req.body.owner,
			title 			: req.body.title,
			artwork 		: req.body.artwork,
			subtitle 		: req.body.subtitle,
			pry_artist 	: req.body.pry_artist,
			featuring 	: req.body.featuring,
			genre 			: req.body.genre,
			subgenre 		: req.body.subgenre,
			label 			: req.body.label,
			format 			: req.body.format,
			release_date : req.body.release_date,
			c_line 			: req.body.c_line,
			p_line 			: req.body.p_line,
			production_yr : req.body.production_yr,
			upc 				: req.body.upc,
			catalogue_no :req.body.catalogue_no,
			remixer 	  : req.body.remixer,
			author 			: req.body.author,
			composer    : req.body.composer,
			arranger    : req.body.arranger,
			isrc        : req.body.isrc,
			p_advisory  : req.body.p_advisory,
			track_lang  : req.body.track_lang,
			lyrics_lang : req.body.lyrics_lang,
			track_lyrics : req.body.track_lyrics,
			p_tier      : req.body.p_tier
		};

		req.app.db.models.Assets.create(fieldsToSet ,
			function(err ,  docs){

				if(err)
				{
					return next(err);
				}
				res.status(200).json(docs);
			});
	},
	read : function(req , res , next)
	{
		req.app.db.models.Assets.find({},
		    function(err , docs)
			{
				if(err)
				{
					return next(err);
				}
				res.status(200).json(docs);
			});
	},
	single : function(req , res , next)
	{
		var id = mongoose.Types.ObjectId(req.params.id);
		req.app.db.models.Assets.find({owner: id},
		    function(err , docs)
			{
				if(err)
				{
					return next(err);
				}
				res.status(200).json(docs);
			});
	},
	single_asset : function(req , res , next)
	{
		var id = mongoose.Types.ObjectId(req.params.id);
		req.app.db.models.Assets.findById(id,
		    function(err , docs)
			{
				if(err)
				{
					return next(err);
				}
				res.status(200).json(docs);
			});
	},
	update : function(req , res , next)
	{
		var id = req.params.id;
		var fieldsToSet =
		{
			owner       : req.body.owner,
			title 			: req.body.title,
			artwork 		: req.body.artwork,
			subtitle 		: req.body.subtitle,
			pry_artist 	: req.body.pry_artist,
			featuring 	: req.body.featuring,
			genre 			: req.body.genre,
			subgenre 		: req.body.subgenre,
			label 			: req.body.label,
			format 			: req.body.format,
			release_date : req.body.release_date,
			c_line 			: req.body.c_line,
			p_line 			: req.body.p_line,
			production_yr : req.body.production_yr,
			upc 				: req.body.upc,
			catalogue_no :req.body.catalogue_no,
			remixer 	  : req.body.remixer,
			author 			: req.body.author,
			composer    : req.body.composer,
			arranger    : req.body.arranger,
			isrc        : req.body.isrc,
			p_advisory  : req.body.p_advisory,
			track_lang  : req.body.track_lang,
			lyrics_lang : req.body.lyrics_lang,
			track_lyrics : req.body.track_lyrics,
			p_tier      : req.body.p_tier
		};

		var options = { new : true };

		req.app.db.models.Assets.findByIdAndUpdate(
			mongoose.Types.ObjectId(id) , fieldsToSet ,
			options , function(err , docs){
				if(err)
		    	{
		    		return next(err);
		    	}
			 res.status(200).json(docs);
			});
	  }
}
module.exports = asset;
