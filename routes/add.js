const express = require('express');
const axios = require('axios').default;

const backEndURL = process.env.BACK_END_URL;

const router = express.Router();

router.get('/role', async (req, res) => {
  if (req.session.isLoggedIn && req.session.isAdmin) {
    const getAllCapabilitiesResult = await axios(`${backEndURL}/capabilities/getAllCapabilityNames`);
    const getAllBandsResult = await axios(`${backEndURL}/bands/getAllBandNames`);
    res.render('pages/viewAdminAddRole', {
      title: 'Admin Add Role',
      loggedIn: req.session.isLoggedIn,
      isAdmin: req.session.isAdmin,
      capabilities: getAllCapabilitiesResult.data,
      bands: getAllBandsResult.data,
      popupType: req.session.popupType,
      popupMessage: req.session.popupMessage,
    });
    req.session.popupType = '';
    req.session.popupMessage = '';
    res.status(200);
  } else if (req.session.isLoggedIn) {
    res.redirect('../home');
  } else {
    res.redirect('../');
  }
});

router.post('/role', async (req, res) => {
  if (req.session.isLoggedIn && req.session.isAdmin) {
    try {
      const {
        RoleName, SpecSum, SpecLink, Capability, Band,
      } = req.body;
      const newRoleDetails = {
        RoleName,
        SpecSum,
        SpecLink,
        Capability,
        Band,
      };
      const response = await axios({
        method: 'post',
        url: `${backEndURL}/add/role`,
        data: {
          newRoleDetails,
        },
      });
      if (response.data.success === true) {
        handleSuccessScenerio(req, response.data.message);
        res.redirect('../add/role');
        res.status(200);
      } else {
        handleErrorScenerio(req, response.data.message);
        res.redirect('../add/role');
        res.status(400);
      }
    } catch (e) {
      console.log(e);
      res.send('error');
    }
  } else if (req.session.isLoggedIn) {
    res.redirect('../home');
  } else {
    res.redirect('../');
  }
});

function handleSuccessScenerio(req, message) {
  req.session.popupType = 'success';
  req.session.popupMessage = message;
}

function handleErrorScenerio(req, message) {
  req.session.popupType = 'error';
  req.session.popupMessage = message;
}

module.exports = router;
