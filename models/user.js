const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const roomImport = require('../models/temperature');
const Schema = mongoose.Schema;

const userSchema = new Schema
({
    /*name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, default: false, required: false}*/
    name: String,
    email: String,
    username: String,
    password: String,
    isAdmin: {type: Boolean, default: false, required: false}

        /*
        LEFT OUT TO TEST IF COULD LINK ROOM IN SIGNUP
        password: String,
        room: {type: String, required: false}
        */
    //date_created: {type: Date, default: new Date()}
    /*name: {String, required:[true, 'Name is required']},
    email: {String, required:[true, 'Email is required']},
    username: {String, required:[true, 'Username is required']},
    password: {String, required:[true, 'Password is required']}*/
});
userSchema.plugin(timestamp);
//create model from the schema and export
module.exports = mongoose.model('user', userSchema);