const express = require('express');
const app = express();
require('dotenv').config();

const jobs  = require('./routes/jobs');
const capabilities = require('./routes/capabilities');
const bands = require('./routes/capabilities');

const nunjucks = require('nunjucks');
nunjucks.configure('views',{
       express:app
});

app.set('view engine', 'njk');

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/jobs', jobs);
app.use('/capabilities', capabilities);
app.use('/bands', bands);

app.get('/viewCapabilityLead/:capID', (req, res) => { 
    res.render('viewCapabilityLeadResults');
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