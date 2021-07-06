const express = require('express');
const router = express.Router();
const axios = require('axios').default;
const backEndURL = process.env.BACK_END_URL;

router.get('/findByJobId/:id', async function (req, res) {
    try {
        const id = req.params.id;
        const response = await axios(`${backEndURL}/capabilities/findByJobId/${id}`);
        res.send(response.data[0]);
        res.status(200);
      } catch (error) {
        console.error(error);
      }
})
module.exports = router;