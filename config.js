exports.mongodb = {
	uri : "mongodb://baraka:baraka123@ds125938.mlab.com:25938/zezedb"
	//uri: "mongodb://127.0.0.1:27017/zezeDB"
	//uri: 'mongodb://kariuki:androidapps@ds033126.mlab.com:33126/smsappdb'
};
exports.oauth = {

	'facebook' :{

		'clientID'    : '1091247900936084',
		'clientSecret': '941a60d3455544c0aa1ffbae17d3d95d',
		'callbackURL' : 'http://localhost:7000/oauth/facebook/callback'
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
