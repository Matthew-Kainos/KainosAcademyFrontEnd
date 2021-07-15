const express = require('express');

const router = express.Router();
const axios = require('axios').default;

const backEndURL = process.env.BACK_END_URL;

router.get('/allJobIds', async (req, res) => {
  try {
    const response = await axios(`${backEndURL}/jobs/allJobIds`);
    res.send(response.data);
    res.status(200);
  } catch (error) {
    console.error(error);
  }
});

// router.get('/viewRoleByBand', async (req, res) => {
//   try {
//     const path = `${backEndURL}/jobs/band`;
//     console.log(path);
//     const response = await axios(path);
//     res.render('pages/viewRoleByBand', {
//       roles: response.data,
//       error: 'No Errors',
//     });
//     res.status(200);
//   } catch (error) {
//     console.error(error);
//   }
// });

// router.post('/viewRoleByBand', async (req, res) => {
//   try {
//     const path = `${backEndURL}/jobs/band/${req.body.roleInput.replace(' ', '_')}`;
//     const response = await axios(path);
//     if (typeof response.data === 'string') {
//       res.render('pages/viewRoleByBand', {
//         roles: [],
//         error: response.data,
//       });
//     }
//     if (typeof response.data === 'object') {
//       res.render('pages/viewRoleByBand', {
//         roles: response.data,
//         error: 'No Errors',
//       });
//     }
//   } catch (error) {
//     console.error(error);
//   }
// });

router.get('/viewRoleByBand', async (req, res) => {
  try {
    const allRolesAndBands = await axios(`${backEndURL}/jobs/band`);
    res.render('pages/viewRoleByBand', { title: 'View Role and Band Level', results: allRolesAndBands.data });
    res.status(200);
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      res.send('Backend not running');
      res.status(500);
    }
    console.error(error);
  }
});

router.get('/getAllJobs', async (req, res) => {
  try {
    const response = await axios(`${backEndURL}/jobs/getAllJobs`);
    res.send(response.data);
    res.status(200);
  } catch (error) {
    console.error(error);
  }
});

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
