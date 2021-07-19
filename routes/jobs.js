const express = require('express');

const router = express.Router();
const axios = require('axios').default;

const backEndURL = process.env.BACK_END_URL;

router.get('/allJobIds', async (req, res) => {
  if (req.session.isLoggedIn) {
    try {
      const response = await axios(`${backEndURL}/jobs/allJobIds`);
      res.send(response.data);
      res.status(200);
    } catch (error) {
      console.error(error);
    }
  } else {
    res.redirect('/');
  }
});

router.get('/job-roles', async (req, res) => {
  try {
    const response = await axios(`${backEndURL}/jobs/job-roles`);
    console.log(response);
    res.render('pages/viewJobRoles', {
      jobs: response.data,
      title: 'Show Job Roles in hierarchy',
    });
    res.status(200);
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      res.send('Backend not running');
      res.status(500);
    }
  }
});

router.get('/viewRoleByBand', async (req, res) => {
  if (req.session.isLoggedIn) {
    try {
      const allRolesAndBands = await axios(`${backEndURL}/jobs/band`);
      res.render('pages/viewRoleByBand', {
        title: 'View Role and Band Level',
        results: allRolesAndBands.data,
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

router.post('/viewRoleByBand', async (req, res) => {
  if (req.session.isLoggedIn) {
    try {
      const path = `${backEndURL}/jobs/band/${req.body.roleInput.replace(' ', '_')}`;
      const response = await axios(path);
      if (typeof response.data === 'string') {
        res.render('viewRoleByBand', {
          roles: [],
          error: response.data,
          loggedIn: req.session.isLoggedIn,
          isAdmin: req.session.isAdmin,
        });
      }
      if (typeof response.data === 'object') {
        res.render('viewRoleByBand', {
          roles: response.data,
          error: 'No Errors',
          loggedIn: req.session.isLoggedIn,
          isAdmin: req.session.isAdmin,
        });
      }
    } catch (error) {
      console.error(error);
    }
  } else {
    res.redirect('/');
  }
});
module.exports = router;
