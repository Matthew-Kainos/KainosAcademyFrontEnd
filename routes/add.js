const express = require('express');
const axios = require('axios').default;

const backEndURL = process.env.BACK_END_URL;
const router = express.Router();

const validation = require('../validation');

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
      const validateDetails = validation.validateNewRoleInput(newRoleDetails);
      if (validateDetails.error === false) {
        const response = await axios({
          method: 'post',
          url: `${backEndURL}/add/role`,
          data: {
            newRoleDetails,
          },
        });
        handleResponse(res, req, response, '../add/role');
      } else {
        handleErrorScenerio(req, validateDetails.message);
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

function handleResponse(res, req, response, page) {
  if (response.data.success === true) {
    handleSuccessScenerio(req, response.data.message);
    res.redirect(page);
    res.status(200);
  } else {
    handleErrorScenerio(req, response.data.message);
    res.redirect(page);
    res.status(400);
  }
}

router.get('/band', async (req, res) => {
  try {
    const response = await axios(`${backEndURL}/bands/info`);
    res.render('pages/viewAdminAddBand', {
      names: response.data.names,
      competencies: response.data.competencies,
      training: response.data.training,
    });
    res.status(200);
  } catch (error) {
    console.error(error);
  }
});

router.post('/band', async (req, res) => {
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
    res.render('pages/viewAdminAddBand', {
      names: resp.data.names,
      competencies: resp.data.competencies,
      training: resp.data.training,
    });
    res.status(200);
  } catch (error) {
    console.error(error);
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
