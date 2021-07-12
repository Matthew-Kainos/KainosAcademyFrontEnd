const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

const jobs  = require('./routes/jobs');
const capabilities  = require('./routes/capabilities');

const nunjucks = require('nunjucks'); 
nunjucks.configure('views', { 
         express: app 
}); 

app.set('view engine', 'njk');

app.use(express.json());
app.use(express.urlencoded());

// For rendering css and images
app.use(express.static('public'));

app.use('/jobs', jobs);
app.use('/capabilities', capabilities);

app.get('/', function (req, res) {
    res.render('./pages/viewHome'); 
    res.status(200);
});

// 404 Path
app.use((req, res) => {
    res.status(404).json({
        message: `Unable to find path ${req.path}`
    })
})
app.listen(3001, function() { 
    console.log('Express FrontEnd started') 
 });