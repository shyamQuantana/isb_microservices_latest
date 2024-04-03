/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


const mongoose = require('mongoose');
const express = require('express');
var app = express();
var Constants = require('./constants');
let count = 0;

const options = {
    autoIndex: false, // Don't build indexes
    // reconnectTries: 30, // Retry up to 30 times
    // reconnectInterval: 500, // Reconnect every 500ms
    //poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    //bufferMaxEntries: 0,
    //geting rid off the depreciation errors
    //useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
    
};
const connectWithRetry = () => {
    console.log('MongoDB connection with retry')
    mongoose.connect(Constants.DB_URL, options).then(()=>{
        console.log('MongoDB is connected')
    }).catch(err=>{
        console.log('MongoDB connection unsuccessful, retry after 5 seconds. ', ++count);
        setTimeout(connectWithRetry, 5000)
    })
};

connectWithRetry();

exports.mongoose = mongoose;
