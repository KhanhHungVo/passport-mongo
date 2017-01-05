var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;
var AccountSchema = new Schema({
    username: String,
    password: String,
    avatar: String
})

AccountSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password)
}
AccountSchema.statics.generateHash = function(password) {
    return bcrypt.hashSync(password)
}

AccountSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Account',AccountSchema);
