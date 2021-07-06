const express = require('express');
const router = express.Router();
const axios = require('axios').default;
const backEndURL = process.env.BACK_END_URL;


router.get('/findByJobId', async function (req, res) {
  try {
      const jobID = req.query.jobID;
        if(!isNaN(jobID)){
          const response = await axios(`${backEndURL}/jobs/checkIfJobExists/${jobID}`);
            if(response.data === true){
              const response = await axios(`${backEndURL}/capabilities/findByJobId/${jobID}`);
              res.render('viewCapabilityByJobIdResults',  { capability: response.data, jobID }); 
              res.status(200);
            } else {
              res.render('viewCapabilityByJobIdForm',  { error: 'Employee ID does not exist. Select again'}); 
          }
        } else {
          res.render('viewCapabilityByJobIdForm',  { error: 'Invalid selection. Enter Integer'}); 
        }
      } catch (error) {
        console.error(error);
    }
})
module.exports = router;