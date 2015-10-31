var labels = require('./labels')

module.exports = {
	uri : 'mongodb://localhost/melhoreme?authSource=melhoreme',
	options : {
		//db : { native_parser: true },
		//server : { poolSize: 5 },
		//replset : { rs_name: 'myReplicaSetName' },
		user : labels.mongoose.melhoreme.user,
		pass : labels.mongoose.melhoreme.pass
	}
}