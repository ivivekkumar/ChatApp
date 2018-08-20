/*
 *
 * Primary file for loading configuration settings
 */
'use strict';

if (process.env.NODE_ENV === 'production') {
    // Offer production stage environment variables
    module.exports = {
        dbURI: process.env.dbURI,
        sessionSecret: process.env.sessionSecret,
        fb: {
            clientID: process.env.fbClientID,
            clientSecret: process.env.fbClientSecret,
            callbackURL: process.env.host + "/auth/facebook/callback",
            profileFields: ["id", "displayName", "photos"]
        }
    }
} else {
    // Offer dev stage settings
    module.exports = require('./development.json');
}
