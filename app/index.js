/*
 *
 * File to render the routes defined in routes
 */ 
'use strict';

// Social authentication logic
require('./auth')();



module.exports = {
    router: require('./routes')(),
    session: require('./session'),
    
}