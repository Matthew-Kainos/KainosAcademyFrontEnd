const express = require('express');
const axios = require('axios').default;

const router = express.Router();

const backEndURL = process.env.BACK_END_URL;

// MY CODE
router.get('/competencies', async (req, res) => {
  // if (req.session.isLoggedIn) {
  try {
    const allBands = await axios(`${backEndURL}/bands/getAllBandsAndCompetencies`);
    res.render('pages/viewCompetenciesByBand', {
      title: 'View Competencies Per Band',
      results: allBands.data,
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
  /*  } else {
    res.redirect('/');
  } */
});

module.exports = router;
