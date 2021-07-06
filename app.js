const express = require('express');
const app = express();
require('dotenv').config();

const jobs  = require('./routes/jobs');

// Nunjucks:
const nunjucks = require('nunjucks'); 
//const { response } = require('express');
nunjucks.configure('views', { 
express: app 
});
app.set('view engine', 'njk');

app.use(express.json());
app.use(express.urlencoded());

app.use('/jobs', jobs);

app.get('/job-roles', (req, res) => {
    res.render('viewJobRoles');
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