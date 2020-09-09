let mongoose = require('mongoose')
let uniqueValidator = require('mongoose-unique-validator');
let crypto = require('crypto');
let jwt = require('jsonwebtoken');
let secret_key = require('../config/config').key


const required_string = {
    type: String,
    required: true,
}

let UserSchema = new mongoose.Schema({

    first_name: required_string,

    last_name: required_string,

    username:{
        type: String, 
        lowercase: true,
        unique: true, 
        required: [true, "can't be blank"], 
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        index: true //Optimiza queries que usen este campo
    },

    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true
    },

    bio: String,

    hash: String,

    salt: String,

    token: String
},{
    timestamps: true
})


UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

UserSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validPassword = function(password) {
    let hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {
    let today = new Date();
    let ext = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000),   
    }, secret_key);
};

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;