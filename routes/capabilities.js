const express = require('express');

const router = express.Router();
const axios = require('axios').default;

const backEndURL = process.env.BACK_END_URL;

router.get('/familyform', async (req, res) => {
  res.render('viewFamilyByCapabilityForm');
});

router.get('/family', async (req, res) => {
  try {
    const { capName } = req.query;

    const response = await axios(`${backEndURL}/capabilities/checkIfCapabilityExists/${capName}`);
    console.log(response.date);
    if (response.data === true) {
      const familyResponse = await axios(`${backEndURL}/capabilities/family/${capName}`);
      res.render('viewFamilyByCapabilityResults', { family: familyResponse.data, capName });
      res.status(200);
    } else {
      res.render('viewFamilyByCapabilityForm', { error: 'Enter Selection' });
      res.status(400);
    }
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      res.send('Backend not running');
      res.status(500);
    }
    console.error(error);
  }
});

router.get('/findByJobNameForm', (req, res) => {
  res.render('viewCapabilityByJobNameForm');
});

router.get('/findByJobName', async (req, res) => {
  try {
    const allJobs = await axios(`${backEndURL}/jobs/getAllJobsWithCapability`);
    res.render('pages/viewCapabilityByJobName', { title: 'Search for Capability by Job Name', results: allJobs.data });
    res.status(200);
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      res.send('Backend not running');
      res.status(500);
    }
    console.error(error);
  }
});
module.exports = router;
