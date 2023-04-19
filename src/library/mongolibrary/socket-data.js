const express = require('express');
const _ = require('underscore');
var app = express();
var http = require('http').createServer(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');
const User = mongoose.model('User');
var config = require('../../config/config.js');
var userquery = require('../mongolibrary/userlibrary.js');

// socket.io
io.on('connection', (socket) => {
    console.log('enters in connection');
    socket.on('userslist', (users) => {
        userquery.commonselectquery(User).then(resp => {
            console.log('getting users list', resp);
        }).catch(err => {
            console.log('error while getting users list', err);
        })
        io.emit('my users', `server: ${users}`);
    });
});