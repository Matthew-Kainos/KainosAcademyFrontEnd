const express = require('express');
const router = express.Router();
const axios = require('axios').default;
const backEndURL = process.env.BACK_END_URL;

router.get('/viewRoleByBand', async function (req, res) {
  try {
      var path = `${backEndURL}/jobs/band`;
      console.log(path);
      const response = await axios(path);
      console.log(response);
      res.render("viewRoleByBand"
      ,{
        roles: response.data,
        error: "No Errors"
      }
      )
      res.status(200);
    } catch (error) {
      console.error(error);
    }
});

router.post('/viewRoleByBand', async (req, res) => {
  try {
    var path = `${backEndURL}/jobs/band/${req.body.band.replace(' ', '_')}`;
    const response = await axios(path);
    console.log(typeof response.data);
    if(typeof response.data == 'string'){
      res.render("viewRoleByBand",{
        band: req.body.band,
        roles: [],
        error: response.data
      })
    }
    if(typeof response.data == 'object'){
      console.log(response.data);
      res.render("viewRoleByBand",{
        band: req.body.band,
        roles: response.data,
        error: "No Errors"
      })
    }
    res.status(200);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;