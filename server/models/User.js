var mongoose    = require('mongoose');
var bcrypt      = require('bcrypt');

var Schema      = mongoose.Schema;

var SALT_WORK_FACTOR = 10;


var UserSchema  = new Schema({
    email: String,
    senha: String,
    confirmaSenha: String,
    token: String
});

function geraHashDaSenha (next) {
    var user = this;
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if (err) return console.error(err);
        if(err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash){
            console.log('b');
            if (err) return console.error(err);
            if(err) return next(err);

            user.password = hash;
            console.log(user.password);
            next();
        });
    });
}

// Cria hash do password
UserSchema.pre('save', geraHashDaSenha);

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);