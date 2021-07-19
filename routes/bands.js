const express = require('express');

const router = express.Router();
const axios = require('axios').default;

const backEndURL = process.env.BACK_END_URL;

router.get('/addBand', async (req, res) => {
  try {
    const response = await axios(`${backEndURL}/bands/info`);
    res.render('pages/addBand', {
      names: response.data.names,
      competencies: response.data.competencies,
      training: response.data.training,
    });
    res.status(200);
  } catch (error) {
    console.error(error);
  }
});

router.post('/addBand', async (req, res) => {
  try {
    const Data = {
      name: req.body.bandName,
      aboveOrBelow: req.body.bandPlace,
      refBand: req.body.bands,
      training: req.body.training,
      competencies: req.body.competencies,
      responsiblities: req.body.responsiblities,
    };
    const response = await axios({
      method: 'post',
      url: `${backEndURL}/bands/addBand`,
      data: Data,
    });
    console.log(response.data);
    const resp = await axios(`${backEndURL}/bands/info`);
    res.render('pages/addBand', {
      names: resp.data.names,
      competencies: resp.data.competencies,
      training: resp.data.training,
    });
    res.status(200);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
