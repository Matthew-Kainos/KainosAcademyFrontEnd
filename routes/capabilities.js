const express = require('express');
const axios = require('axios').default;

const router = express.Router();

const backEndURL = process.env.BACK_END_URL;

router.get('/findByJobNameForm', (req, res) => {
  res.render('viewCapabilityByJobNameForm');
});

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
