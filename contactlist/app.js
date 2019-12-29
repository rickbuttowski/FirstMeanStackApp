//importing modules
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path');

var app = express();

const route = require('./routes/route');  // take all routes from route by importing it here

const port = 3000;

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/contactlist');

//on connection with mongodb
mongoose.connection.on('connected', ()=> {
    console.log("Connected to mongodb @ 27017");
});

//on connection with mongodb
mongoose.connection.on('error', (err)=> {
    if (err) {
        console.log('Error is mongodb connection : '+err);
    }
});

//adding middleware - cors
app.use(cors());

//body-parser
app.use(bodyparser.json());

//routes
app.use('/api', route);

//static files
app.use(express.static(path.join(__dirname,'public')));

//testing server
app.get('/',(req,res)=> {
    res.send('foobar');
});


app.listen(port , ()=> {
    console.log("server started at" + port);
})