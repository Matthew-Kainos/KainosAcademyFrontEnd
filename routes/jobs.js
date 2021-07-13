const express = require('express');

const router = express.Router();
const axios = require('axios').default;

const backEndURL = process.env.BACK_END_URL;

router.get('/getAllJobs', async (req, res) => {
  if (req.session.isLoggedIn) {
    try {
      const response = await axios(`${backEndURL}/jobs/getAllJobs`);
      res.send(response.data);
      res.status(200);
    } catch (error) {
      console.error(error);
    }
  } else {
    res.redirect('/');
  }
});

router.get('/job-roles-spec/:roleID', async (req, res) => {
  if (req.session.isLoggedIn) {
    try {
      const { roleID } = req.params;
      const response = await axios(`${backEndURL}/jobs/job-roles-spec/${roleID}`);
      res.render('job-spec', {
        jobs: response.data,
        loggedIn: req.session.isLoggedIn,
        isAdmin: req.session.isAdmin,
      });
      res.status(200);
    } catch (error) {
      console.error(error);
    }
  } else {
    res.redirect('/');
  }
});

module.exports = router;
