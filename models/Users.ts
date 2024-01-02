const mongoose = require('mongoose');
const { Schema} = require('mongoose');
const Users = new mongoose.Schema({
    email    :{type:String, unique : true},
    password :{type: String},
    isAdmin  :{type: Boolean, default:false },
});


module.exports = mongoose.model('hiteshi_users', Users);