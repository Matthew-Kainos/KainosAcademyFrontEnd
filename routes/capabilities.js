const express = require('express');
const axios = require('axios').default;

const router = express.Router();

const backEndURL = process.env.BACK_END_URL;

router.get('/familyform', async (req, res) => {
  res.render('viewFamilyByCapabilityForm');
});

router.get('/family', async (req, res) => {
  try {
    const allCapabilities = await axios(`${backEndURL}/capabilities/getAllFamiliesWithCapability`);
    res.render('pages/viewFamilyByCapability', { title: 'Search for Family by Capability Name', results: allCapabilities.data });
    res.status(200);
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

// router.get('/viewCapabilityLead/:capID', async (req, res) => {
//   try {
//     const { capID } = req.params;
//     const response = await axios(`${backEndURL}/capabilities/viewCapabilityLead/${capID}`);
//     res.render('pages/viewCapabilityLeadResults', { capabilities: response.data, capID });
//     res.status(200);
//   } catch (error) {
//     console.error(error);
//   }
// });

router.get('/findByJobName', async (req, res) => {
  if (req.session.isLoggedIn) {
    try {
      const allJobs = await axios(`${backEndURL}/jobs/getAllJobsWithCapability`);
      res.render('pages/viewCapabilityByJobName', {
        title: 'Search for Capability by Job Name',
        results: allJobs.data,
        loggedIn: req.session.isLoggedIn,
        isAdmin: req.session.isAdmin,
      });
      res.status(200);
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        res.send('Backend not running');
        res.status(500);
      }
      console.error(error);
    }
  } else {
    res.redirect('/');
  }
});
module.exports = router;
