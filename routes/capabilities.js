const express = require('express');
const router = express.Router();
const axios = require('axios').default;
const backEndURL = process.env.BACK_END_URL;


router.get('/findByJobNameForm', (req, res) => { 
  res.render('viewCapabilityByJobNameForm'); 
}); 

router.get('/findByJobName', async function (req, res) {
  try {
      const jobName = req.query.jobName;
        if(jobName){
          const response = await axios(`${backEndURL}/jobs/checkIfJobExists/${jobName}`);
            if(response.data === true){
              const response = await axios(`${backEndURL}/capabilities/findByJobName/${jobName}`);
              res.render('viewCapabilityByJobNameResults',  { capability: response.data, jobName }); 
              res.status(200);
            } else {
              res.render('viewCapabilityByJobNameForm',  { error: `Job Role with name "${jobName}" does not exist`});
              res.status(400); 
          }
        } else {
          res.render('viewCapabilityByJobNameForm',  { error: 'Enter Selection'});
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
module.exports = router;