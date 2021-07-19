const express = require('express');
const axios = require('axios').default;

const router = express.Router();

const backEndURL = process.env.BACK_END_URL;

router.get('/:capID', async (req, res) => {
  try {
    const { capID } = req.params;
    const response = await axios(`${backEndURL}/capabilities/viewCapabilityLead/${capID}`);
    res.render('pages/viewCapabilityLeadResults', { capabilities: response.data, title: 'View Capability Lead', capID });
    res.status(200);
  } catch (error) {
    console.error(error);
  }
});
module.exports = router;
