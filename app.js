const express = require('express');
const app = express();
require('dotenv').config();

const nunjucks = require('nunjucks');
nunjucks.configure('views', {express: app});
app.set('view engine', 'njk');

const jobs  = require('./routes/jobs');

app.use(express.json());
app.use(express.urlencoded());

app.use('/jobs', jobs);

// 404 Path
app.use((req, res) => {
    res.status(404).json({
        message: `Unable to find path ${req.path}`
    })
})

app.listen(3001, function() { 
    console.log('Express FrontEnd started') 
 });