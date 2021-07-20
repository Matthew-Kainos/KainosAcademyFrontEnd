const express = require('express');
const axios = require('axios').default;

const router = express.Router();

const backEndURL = process.env.BACK_END_URL;

router.get('/:familyID', async (req, res) => {
  try {
    const { familyID } = req.params;
    const response = await axios(`${backEndURL}/capabilities/viewCapabilityLead/${familyID}`);
    res.render('pages/viewCapabilityLeadResults', {
      capabilities: response.data,
      title: 'View Capability Lead',
      loggedIn: req.session.isLoggedIn,
      isAdmin: req.session.isAdmin,
    });
    res.status(200);
  } catch (error) {
    console.error(error);
  }
});
module.exports = router;
