const express = require('express');

const router = express.Router();
const axios = require('axios').default;

const backEndURL = process.env.BACK_END_URL;

router.get('/:roleID', async (req, res) => {
  if (req.session.isLoggedIn) {
    try {
      const { roleID } = req.params;
      const response = await axios(`${backEndURL}/jobs/jobSpec/${roleID}`);
      res.render('pages/jobSpec', {
        title: 'Specification for Job Role',
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
