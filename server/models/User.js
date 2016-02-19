var mongoose    = require('mongoose');
var bcrypt      = require('bcrypt');

var Schema      = mongoose.Schema;

var SALT_WORK_FACTOR = 10;



var UserSchema  = new Schema({
    email:      { type: String, unique: true, lowercase: true },
    password    : { type: String, select: false },
    displayName : String,
    picture     : String,
    bitbucket   : String,
    facebook    : String,
    foursquare  : String,
    google      : String,
    github      : String,
    instagram   : String,
    linkedin    : String,
    live        : String,
    yahoo       : String,
    twitter     : String,
    twitch      : String,


    confirmaPassword        : String,

    // Atributos de Sistema
    token                   : String,
    contaTentativasDeLogin  : { type: Number, default: 0 },
    tempoPrimeiraTentativa  : { type: Number, default: 0 },

    // ForgotPass
    resetPasswordToken      :String,
    resetPasswordExpires    :String
});


UserSchema.pre('save', geraHashDaSenha);
UserSchema.pre('save', zeraConfirmaSenha);
UserSchema.pre('save', zeraACadaTrintaMinutos);

/**
 * Descriptografa senha da base, e compara com o request,
 * para credenciar o usuario
 *
 * @param {String} senhaCandidata
 * @param {Function} done
 */
UserSchema.methods.comparePassword = function(senhaCandidata, done) {
    bcrypt.compare(senhaCandidata, this.password, function(err, isMatch) {
        if (err) return done(err);
        done(null, isMatch);
    });
};
/**
 * Deixa a senha salva na base encriptada.
 *
 * @param next
 * @returns {*}
 */
function geraHashDaSenha (next) {
    var user = this;
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if (err) return console.error(err);
        if(err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash){
            if (err) return console.error(err);
            if(err) return next(err);

            user.password = hash;
            console.log(user.password);
            next();
        });
    });
}

/**
 * Denecessario manter na base
 * @param next
 */
function zeraConfirmaSenha(next) {
    this.confirmaPassword = '';
    next();
}

/**
 * Metodo auxiliar para uso do captcha. A cada 30 minutos a
 * necessidade do captcha é removida.
 * (ele é incluido novamente apos 6 tentativas dentro deste tempo)
 * @param next
 */
function zeraACadaTrintaMinutos(next) {
    var trintaMinutos = 30 * 60;

    if(this.contaTentativasDeLogin > 0) {
        console.log('this.contaTentativasDeLogin > 0');
        if (this.contaTentativasDeLogin === 1) {
            this.tempoPrimeiraTentativa = Date.now();
        } else {
            var percorrido = miliEmSegundos(Date.now() - this.tempoPrimeiraTentativa);

            console.log(percorrido);
            console.log(trintaMinutos);

            // trinta minutos
            if (percorrido >= trintaMinutos) {
                this.tempoPrimeiraTentativa = 0;
                this.contaTentativasDeLogin = 0;
            }
        }
    }
    function miliEmSegundos(num) {
        return num / 1000;
    }

    next();
}



module.exports = mongoose.model('User', UserSchema);