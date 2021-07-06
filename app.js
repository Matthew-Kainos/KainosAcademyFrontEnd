const express = require('express');
const app = express();
require('dotenv').config();

const jobs  = require('./routes/jobs');
const capabilities  = require('./routes/capabilities');

app.use(express.json());
app.use(express.urlencoded());

app.use('/jobs', jobs);
app.use('/capabilities', capabilities);

// 404 Path
app.use((req, res) => {
    res.status(404).json({
        message: `Unable to find path ${req.path}`
    })
})

app.listen(3001, function() { 
    console.log('Express FrontEnd started') 
 });