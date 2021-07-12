const express = require('express');
const router = express.Router();
const axios = require('axios').default;
const backEndURL = process.env.BACK_END_URL;

router.get('/getAllJobs', async function (req, res) {
    try {
        const response = await axios(`${backEndURL}/jobs/getAllJobs`);
        res.send(response.data);
        res.status(200);
      } catch (error) {
        console.error(error);
      }
})
module.exports = router;