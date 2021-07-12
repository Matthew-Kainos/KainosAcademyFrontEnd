const express = require('express');
const router = express.Router();
const axios = require('axios').default;
const backEndURL = process.env.BACK_END_URL;

router.get('/familyform' , async function (req, res) {
    res.render('viewFamilyByCapabilityForm')
    })
 

router.get('/family', async function (req, res) {
    try {
        const capName = req.query.capName;
          
            const response = await axios(`${backEndURL}/capabilities/checkIfCapabilityExists/${capName}`);
            console.log(response.date);  
            if(response.data === true){
                const response = await axios(`${backEndURL}/capabilities/family/${capName}`);
                res.render('viewFamilyByCapabilityResults',  { family: response.data, capName }); 
                res.status(200);
              } else {
                res.render('viewFamilyByCapabilityForm',  { error: 'Enter Selection'});
                res.status(400); 
            }
    
        } catch (error) {
          if(error.code === 'ECONNREFUSED'){
            res.send('Backend not running');
            res.status(500);
          }
          console.error(error);
      }
  }) 

  /* router.get('/family', async function (req, res) {
    try {
          const allCapabilities = await axios(`${backEndURL}/jobs/getAllFamiliesWithCapability`);
          res.render('pages/viewFamilyByCapability',  { title: 'Search for Family by Capability Name', results: allCapabilities.data}); 
          res.status(200);
        } catch (error) {
          if(error.code === 'ECONNREFUSED'){
            res.send('Backend not running');
            res.status(500);
          }
          console.error(error);
      }
  }) */


  module.exports = router;