const express = require('express');
const router = express.Router();
const axios = require('axios').default;
const backEndURL = process.env.BACK_END_URL;


 router.get('/family/:id', async function (req, res) {
    try {
        const id = req.params.id;
        const response = await axios(`${backEndURL}/capabilities/family/${id}`);
        //res.send(response.data);
        console.log(response.data);
        res.render('viewFamilyByCapabilityForm', {
          family: response.data
        });
        res.status(200);
      } catch (error) {
        console.error(error);
      }
  })
  module.exports = router;