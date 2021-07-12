const express = require('express');
const router = express.Router();
const axios = require('axios').default;
const backEndURL = process.env.BACK_END_URL;

// Example
router.get('/Hello', async function (req, res) {
    try {
        const response = await axios(`${backEndURL}/Hello`);
        res.send(response.data);
        res.status(200);
      } catch (error) {
        console.error(error);
      }
})

router.get('/job-roles', async function (req, res) {
  try {
      const response = await axios(`${backEndURL}/jobs/job-roles`);
      res.render('viewJobRoles', {
        jobs: response.data
      });
      res.status(200);
    } catch (error) {
      if(error.code === 'ECONNREFUSED'){
        res.send('Backend not running');
        res.status(500);
      }
      // console.error(error);
    }
})
module.exports = router;