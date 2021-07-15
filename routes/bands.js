const express = require('express');

const router = express.Router();
// const axios = require('axios').default;

// const backEndURL = process.env.BACK_END_URL;

router.get('/addBand', async (req, res) => {
  try {
    // const { roleID } = req.params;
    // const response = await axios(`${backEndURL}/jobs/job-roles-spec/${roleID}`);
    res.render('pages/addBand', {
      bands: ['Principal', 'associate'],
    });
    res.status(200);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
