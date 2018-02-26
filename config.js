exports.mongodb = {
	uri : "mongodb://baraka:baraka123@ds125938.mlab.com:25938/zezedb"
	//uri: "mongodb://127.0.0.1:27017/zezeDB"
	//uri: 'mongodb://kariuki:androidapps@ds033126.mlab.com:33126/smsappdb'
};
exports.oauth = {

	'facebook' :{

		'clientID'    : '336654756824204',
		'clientSecret': '53c80849f1fb2d6f738b2e1d8dc2c7c9',
		'callbackURL' : 'https://zezeapp.herokuapp.com/release'
	},

	'twitter' :{
		'consumerKey'    : 't3r87nEjaUpQpyayIzRwKPhOO',
		'consumerSecret' : 'OI5xaXTgkURzEKkIMbONQuYudAJTOq0mve509Vl39lW3iUFwrD',
		'callbackUrl' : 'http://localhost:7000/oauth/twitter/callback'
	},

	'cloudinary' :{
		'cloud_name'    : 'dxomvhu0p',
		'api_key'       : '811296612498678',
		'api_secret'    : 'j8BV1pcR-Jagxi63jCJSAMrImVM'
	}
};
