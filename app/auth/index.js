/*
 *
 * Primary file for login strategy
 */
'use strict';
const passport = require('passport');
const config = require('../config');
const helper = require('../helpers');
const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        // Find the user using the _id
        helper.findById(id)
            .then(user => done(null, user))
            .catch(error => console.log('Error deserializing user'));
    });
    let authProcessor = (accessToken, refreshToken, profile, done) => {
        // Find a user in local db using profile.id
        // If user is found, return the user data using the done callback
        // If the user is not found locally, create one in local db and return
        helper.findOne(profile.id)
            .then(result => {
                if (result) {
                    done(null, result);
                } else {
                    //Create a new user and return
                    helper.createNewUser(profile)
                        .then(newChatUser => done(null, newChatUser))
                        .catch(console.log('Error when creating new user'));
               }   
            });
    }
    passport.use(new FacebookStrategy(config.fb, authProcessor));
}