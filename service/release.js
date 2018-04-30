'use strict';
var mongoose = require('mongoose');
var multer = require('multer');
var fs = require('fs');
var path = require('path');
var apikey   = '12f34bba9ea25cae365b6dc1b92fba2e881ee332213923f91dcd18e4c47540e6';
var cloudinary = require('cloudinary');
var Storage = require('@google-cloud/storage');
const projectId = 'zezemusicstore';
const https = require('https');
const storage = new Storage({
  projectId: projectId,
});
const bucketName = 'artworks';
var release = {

	create : function(req , res , next)
	{
		var fieldsToSet = {

			title 			: req.body.title,
			artwork 		: '',
			subtitle 		: req.body.subtitle,
			pry_artist 	        : req.body.pry_artist,
			featuring 	        : req.body.featuring,
			genre 			: req.body.genre,
			subgenre 		: req.body.subgenre,
			label 			: req.body.label,
			format 			: req.body.format,
			release_date            : req.body.release_date,
			c_line 			: req.body.c_line,
			p_line 			: req.body.p_line,
			status                  : 'incomplete',
			production_yr           : req.body.production_yr,
			upc 	                : req.body.upc,
			catalogue_no            :req.body.catalogue_no
		};

		req.app.db.models.Release.create(fieldsToSet ,
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
		req.app.db.models.Release.find({},
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
		req.app.db.models.Release.findById(id,
		    function(err , docs)
			{
				if(err)
				{
					return next(err);
				}
				res.status(200).json(docs);
			});
	},
	artwork: function(req, res, next)
	{
		var id = mongoose.Types.ObjectId(req.params.id);

		var storage = multer.diskStorage({
  // destination
		  destination: function (req, file, cb) {
		    cb(null, './uploads/')
		  },
		  filename: function (req, file, cb) {
		    cb(null, file.originalname);
		  }
		});

	var upload = multer({ //multer settings
                    storage: storage
                }).single('photo');



							            //var fieldsToSet = { img : {data : fs.readFileSync(req.file.path, "base64"), contentType : 'img/png' } };


	upload(req,res,function(err){
						            if(err){
						                 //res.json({error_code:1,err_desc:err});
						                return next(err);
						            }

												 var pathy = req.file.path;
												 cloudinary.config({
												 cloud_name: 'dxomvhu0p',
												 api_key: '811296612498678',
												 api_secret: 'j8BV1pcR-Jagxi63jCJSAMrImVM'
											 });
											 cloudinary.uploader.upload(pathy,
											 function(result) {
												  var fieldsToSet = { artwork : result.secure_url };
													var options = { new: true };
			req.app.db.models.Release.findByIdAndUpdate(id, fieldsToSet, options, function(err , docs){
													if(err)
											    	{
											    		return next(err);
											    	}
														res.status(200).json(docs);
											 });

						        });
									});

	},
	assets_upload: function(req, res, next)
	{
		var id = mongoose.Types.ObjectId(req.params.id);

		var storage = multer.diskStorage({
  // destination
		  destination: function (req, file, cb) {
		    cb(null, './uploads/')
		  },
		  filename: function (req, file, cb) {
		    cb(null, file.originalname);
		  }
		});

	var upload = multer({ //multer settings
                    storage: storage
                }).single('asset');



							            //var fieldsToSet = { img : {data : fs.readFileSync(req.file.path, "base64"), contentType : 'img/png' } };


	upload(req,res,function(err){
						            if(err){
						                 //res.json({error_code:1,err_desc:err});
						                return next(err);
						            }

												 var pathy = req.file.path;
												 cloudinary.config({
												 cloud_name: 'dxomvhu0p',
												 api_key: '811296612498678',
												 api_secret: 'j8BV1pcR-Jagxi63jCJSAMrImVM'
											 });
											 cloudinary.v2.uploader.upload(pathy,
												 { resource_type: "video" },
											 function(error, result) {
												 console.log('Iam the error',error);
												 console.log('Iam the result',result);
												  //var fieldsToSet = { artwork : result.secure_url };
													var options = { new: true };
							req.app.db.models.Release.update({_id: id},
				 			{ $addToSet: {tracks:  { 'cloud_file': result.secure_url,
				  			'original_filename': result.original_filename }
																}
															}, function(err , docs){
													if(err)
											    	{
															console.log(err);
											    		return next(err);

											    	}
														res.status(200).json(docs);
											 });

						        });
									});
	},
  single : function(req , res , next)
	{
		var id = mongoose.Types.ObjectId(req.params.id);
		req.app.db.models.Release.findById(id,
		    function(err , docs)
			{
				if(err)
				{
					return next(err);
				}
				res.status(200).json(docs);
			});
	},
	statusUpdate : function(req , res , next)
	{
		var id = req.params.id;
		var fieldsToSet = {status : req.body.status };
		req.app.db.models.Release.findByIdAndUpdate(
			mongoose.Types.ObjectId(id) , fieldsToSet ,
			options , function(err , docs){
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
			catalogue_no :req.body.catalogue_no
		};

		var options = { new : true };

		req.app.db.models.Release.findByIdAndUpdate(
			mongoose.Types.ObjectId(id) , fieldsToSet ,
			options , function(err , docs){
				if(err)
		    	{
		    		return next(err);
		    	}
			 res.status(200).json(docs);
			});
	  }
	// read : function(req , res , next)
	// {
  //
	// 	req.app.db.models.Car.find({},
	// 	    function(err , docs)
	// 		{
	// 			if(err)
	// 			{
	// 				return next(err);
	// 			}
	// 			res.status(200).json(docs);
	// 		});
	// },
	// single_car : function(req , res , next)
	// {
	// 	var id = mongoose.Types.ObjectId(req.params.id);
	// 	req.app.db.models.Car.findById(id,
	// 	    function(err , docs)
	// 		{
	// 			if(err)
	// 			{
	// 				return next(err);
	// 			}
	// 			res.status(200).json(docs);
	// 		});
	// },
	// reserved : function(req , res , next)
	// {
  //
	// 	req.app.db.models.Car.find({ status: 'reserved' },
	// 	    function(err , docs)
	// 		{
	// 			if(err)
	// 			{
	// 				return next(err);
	// 			}
	// 			res.status(200).json(docs);
	// 		});
	// },
	// clres : function(req , res , next)
	// {
  //
	// 	function sendMessage() {
  //
	//             // var to     = '+254726281045,+254716281045,+254726591218';
	// 	     var cl_no    =  req.body.phone;
	// 	     var to       = '+254726390101,' + cl_no;
	// 	     var  Plate   =  req.body.plate_no;
	// 	     var  Rent_Start = moment(req.body.start).format("MMM Do YY");
	// 	     var  Return = moment(req.body.end).format("MMM Do YY");
	// 	     var  Email = req.body.email;
	// 	     var  Phone =  req.body.phone;
	// 	     var nat_id = req.body.nat_id;
	// 	     var dl = req.body.dl;
  //
	// 	var message = "Vehicle: " + Plate + "DL No " + dl + "ID No: " + nat_id + "Client Mail: " + Email + "Client Phone: " + Phone;
	// 	console.log(message);
  //
	// 	var post_data = querystring.stringify({
  //       'username' : username,
  //       'to'       : to,
  //       'message'  : message
  //   });
  //
  //   var post_options = {
  //       host   : 'api.africastalking.com',
  //       path   : '/version1/messaging',
  //       method : 'POST',
  //
  //       rejectUnauthorized : false,
  //       requestCert        : true,
  //       agent              : false,
  //
  //       headers: {
  //           'Content-Type' : 'application/x-www-form-urlencoded',
  //           'Content-Length': post_data.length,
  //           'Accept': 'application/json',
  //           'apikey': apikey
  //       }
  //   };
  //    var post_req = https.request(post_options, function(res) {
  //       res.setEncoding('utf8');
  //       res.on('data', function (chunk) {
  //           var jsObject   = JSON.parse(chunk);
  //           var recipients = jsObject.SMSMessageData.Recipients;
  //           if ( recipients.length > 0 ) {
  //               for (var i = 0; i < recipients.length; ++i ) {
  //                   var logStr  = 'number=' + recipients[i].number;
  //                   logStr     += ';cost='   + recipients[i].cost;
  //                   logStr     += ';status=' + recipients[i].status; // status is either "Success" or "error message"
  //                   console.log(logStr);
  //                   }
  //               } else {
  //                   console.log('Error while sending: ' + jsObject.SMSMessageData.Message);
  //           }
  //       });
  //   });
  //
  //   // Add post parameters to the http request
	// 		    post_req.write(post_data);
  //
	// 		    post_req.end();
	// 		   };
  //
	// 		  sendMessage();
  //
	// },
	// available : function(req , res , next)
	// {
  //
	// 	req.app.db.models.Car.find({ status: 'available' },
	// 	    function(err , docs)
	// 		{
	// 			if(err)
	// 			{
	// 				return next(err);
	// 			}
	// 			res.status(200).json(docs);
	// 		});
	// },
	// remove : function(req , res , next)
	// {
	// 	var id =  mongoose.Types.ObjectId(req.params.id);
	// 	req.app.db.models.Car.findByIdAndRemove(id,
	// 	    function(err , docs)
	// 		{
	// 			if(err)
	// 			{
	// 				return next(err);
	// 			}
	// 			res.status(200).json(docs);
	// 		});
	// },
  //
	// multis : function(req, res , next)
	// {
	// 		var id = req.body.id;
	// 		var fieldsToSet =
	// 		{
	// 			pricing : req.body.inputs
	// 		};
  //
	// 		var options = { new: true };
  //
	// 		console.log(req.body.formData);
  //
	// 		req.app.db.models.Car.findByIdAndUpdate(mongoose.Types.ObjectId(id), fieldsToSet, options,
	// 			function(err, docs){
	// 				if(err)
	// 			{
	// 				return next(err);
	// 			}
	// 			res.status(200).json(docs);
	// 		});
	// },
	// uploadDL: function(req, res, next)
	// {
	//      var transporter = nodemailer.createTransport({
	// 	    host: 'kizusismartexlimited',
	// 	    port: 465,
	// 	    secure: true, // secure:true for port 465, secure:false for port 587
	// 	    auth: {
	// 	        user: 'info@kizusismartexlimited.co.ke',
	// 	        pass: '0726390101kibe'
	// 	    }
	// 	});
  //
	// 	// setup email data with unicode symbols
	// 	var mailOptions = {
	// 	    from: req.params.email, // sender address
	// 	    to: 'info@kizusismartexlimited.co.ke', // list of receivers
	// 	    subject: req.params.subject, // Subject line
	// 	    text: 'Query', // plain text body
	// 	    html: '<p>'+ req.params.message  +'</p>' // html body
	// 	};
  //
	// 	// send mail with defined transport object
	// 	transporter.sendMail(mailOptions, (error, info) => {
	// 	    if (error) {
	// 	        return console.log(error);
	// 	    }
	// 	    console.log('Message %s sent: %s', info.messageId, info.response);
	// 	});
  //
	// },
  //
	// upload: function(req, res, next)
	// {
	// 	var id = mongoose.Types.ObjectId(req.params.id);
  //
	// 	var storage = multer.diskStorage({
	//   		destination: function(request , file , callback)
	//   		{
	//   			callback(null , './client/www/uploads');
	//   		},
	//   		filename: function (request, file, callback) {
	// 	    callback(null, file.originalname)
	// 	  }
	//   	});
  //
  //
  //    var upload = multer({ //multer settings
  //                   storage: storage
  //               }).single('file');
  //
	// 	upload(req,res,function(err){
  //           if(err){
  //                res.json({error_code:1,err_desc:err});
  //                return;
  //           }
  //            res.json({error_code:0,err_desc:null});
  //            var pathy = req.file.path;
  //            console.log('one ' + pathy);
  //
  //           //var fieldsToSet = { img : {data : fs.readFileSync(req.file.path, "base64"), contentType : 'img/png' } };
  //
  //           cloudinary.config({
	// 	  cloud_name: 'dxomvhu0p',
	// 	  api_key: '811296612498678',
	// 	  api_secret: 'j8BV1pcR-Jagxi63jCJSAMrImVM'
	// 	});
  //       cloudinary.uploader.upload(pathy,
  //       function(result) {
  //        console.log('two ' + result);
  //        var fieldsToSet = { photo : result.secure_url };
  //       	var options = { new : true };
  //            req.app.db.models.Car.findByIdAndUpdate(id, fieldsToSet, options, function(err , docs){
	// 			if(err)
	// 	    	{
	// 	    		return next(err);
	// 	    	}
	// 		// res.status(200).json(docs);
	// 		});
  //        });
  //       });
  //
  //
  //
	// },
  //
	// sendMail: function(req, res, next)
	// {
	// 	var transporter = nodemailer.createTransport({
	// 	    host: 'mail.kizusismartexlimited.co.ke',
	// 	    port: 465,
	// 	    secure: true, // secure:true for port 465, secure:false for port 587
	// 	    auth: {
	// 	        user: 'info@kizusismartexlimited.co.ke',
	// 	        pass: '0716281045'
	// 	    }
	// 	});
  //
	// 	// setup email data with unicode symbols
	// 	var mailOptions = {
	// 	    from: req.params.email, // sender address
	// 	    to: 'info@kizusismartexlimited.co.ke', // list of receivers
	// 	    subject: req.params.subject, // Subject line
	// 	    text: 'Query', // plain text body
	// 	    html: '<p>'+ req.params.message  +'</p>' // html body
	// 	};
  //
	// 	// send mail with defined transport object
	// 	transporter.sendMail(mailOptions, (error, info) => {
	// 	    if (error) {
	// 	        return console.log(error);
	// 	    }
	// 	    console.log('Message %s sent: %s', info.messageId, info.response);
	// 	});
	// }
}
module.exports = release;
