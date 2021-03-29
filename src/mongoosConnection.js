const mongoose = require('mongoose'),
    url = 'mongodb://127.0.0.1:27017',
    dbName = 'accounts',
    connectionString = url + '/' + dbName;
    express = require('express')

mongoose.connect(connectionString,
    {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false});

const db = mongoose.connection
const app = express()

db.on('error', console.error.bind(console, 'MongoDB connection error:'));