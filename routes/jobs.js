const express = require('express');
const router = express.Router();
const axios = require('axios').default;
const backEndURL = process.env.BACK_END_URL;

router.get('/band/:substr', async function (req, res) {
  try {
      var path = `${backEndURL}/jobs/band/${req.params.substr}`;
      const response = await axios(path);
      res.send(response.data);
      res.status(200);
    } catch (error) {
      console.error(error);
    }
});
module.exports = router;