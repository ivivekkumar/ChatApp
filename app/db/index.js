/*
 *
 * Primary file or database configurations
 */
'use strict';

const config = require('../config');
const mongoose = require('mongoose').connect(config.dbURI);

//Log an error if connection fails
 mongoose.connection.on('error', error => {
     console.log('Mongoose error: ', error);
});

// Create a structure to define user schema
const chatUser = new mongoose.Schema({
    profileID: String,
    fullName: String,
    profilePic: String
});

// Turn the schema using a usable model
let userModel = mongoose.model('chatUser', chatUser); 

module.exports = {
    mongoose,
    userModel
}