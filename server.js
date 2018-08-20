/*
 *
 * The primary file for the application, serves as entry point.
 */

'use strict';

const express = require('express');
const fs = require('fs');
const app = express();
const http = require('http');
const https = require('https');
const passport = require('passport');
const privateKey = fs.readFileSync('./app/sslCert/key.pem');
const certificate = fs.readFileSync('./app/sslcert/cert.pem');

const chatApp = require('./app');
const credentials = { key: privateKey, cert: certificate };
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);
const io = require('socket.io')(httpsServer);
io.use((socket, next) => {
    require('./app/session')(socket.request, {}, next); 
});
require('./app/socket')(io, app);
app.locals.chatrooms = [];

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(chatApp.session);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', chatApp.router);


httpServer.listen(8080);
httpsServer.listen(8443);
 