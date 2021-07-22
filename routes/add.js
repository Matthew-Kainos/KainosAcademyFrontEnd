const express = require('express');
const axios = require('axios').default;

const backEndURL = process.env.BACK_END_URL;
const router = express.Router();

const validation = require('../validation');
const sendAxioRequests = require('./sendAxioRequests');

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
        handleResponse(res, req, response, '../jobs/job-roles', '../add/role');
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

router.get('/capability', async (req, res) => {
  await processNewCapabilityGetRequest(req, res);
});

router.post('/capability', async (req, res) => {
  await processNewCapabilityPostRequest(req, res);
});

async function processNewCapabilityGetRequest(req, res) {
  if (req.session.isLoggedIn === true && req.session.isAdmin === true) {
    res.render('pages/viewAdminAddCapability', {
      title: 'Admin Add Capability',
      loggedIn: req.session.isLoggedIn,
      isAdmin: req.session.isAdmin,
      popupType: req.session.popupType,
      popupMessage: req.session.popupMessage,
    });
    res.status(200);
    req.session.popupType = '';
    req.session.popupMessage = '';
  } else if (req.session.isLoggedIn) {
    res.status(404);
    res.redirect('../home');
  } else {
    res.status(404);
    res.redirect('../');
  }
}

async function processNewCapabilityPostRequest(req, res) {
  if (req.session.isLoggedIn && req.session.isAdmin) {
    try {
      const { Name } = req.body;
      const newCapabilityDetails = { Name };
      const validateDetails = validation.validateNewCapabilityInput(newCapabilityDetails);
      if (validateDetails.error === false) {
        const response = await sendAxioRequests
          .sendCreateCapabilityPostRequest(newCapabilityDetails);
        handleResponse(res, req, response, '../add/capability', '../add/capability');
      } else {
        handleErrorScenerio(req, validateDetails.message);
        res.status(400);
        res.redirect('../add/capability');
      }
    } catch (e) {
      console.log(e);
      res.send('error');
    }
  } else if (req.session.isLoggedIn) {
    res.status(404);
    res.redirect('../home');
  } else {
    res.status(404);
    res.redirect('../');
  }
}

router.get('/family', async (req, res) => {
  if (req.session.isLoggedIn && req.session.isAdmin) {
    const getAllCapabilitiesResult = await axios(`${backEndURL}/capabilities/getAllCapabilityNames`);
    res.render('pages/viewAdminAddFamily', {
      title: 'Admin Add Family',
      loggedIn: req.session.isLoggedIn,
      isAdmin: req.session.isAdmin,
      capabilities: getAllCapabilitiesResult.data,
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

router.post('/family', async (req, res) => {
  if (req.session.isLoggedIn && req.session.isAdmin) {
    try {
      const {
        FamilyName, LeadName, LeadMessage, LeadImage, Capability,
      } = req.body;
      const newFamilyDetails = {
        FamilyName,
        LeadName,
        LeadMessage,
        LeadImage,
        Capability,
      };
      const validateDetails = validation.validateNewFamilyInput(newFamilyDetails);
      if (validateDetails.error === false) {
        const response = await axios({
          method: 'post',
          url: `${backEndURL}/add/family`,
          data: {
            newFamilyDetails,
          },
        });
        handleResponse(res, req, response, '../add/family', '../add/family');
      } else {
        handleErrorScenerio(req, validateDetails.message);
        res.redirect('../add/family');
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

function handleResponse(res, req, response, detinationSuccess, detinationFailure) {
  if (response.data.success === true) {
    handleSuccessScenerio(req, response.data.message);
    res.redirect(detinationSuccess);
    res.status(200);
  } else {
    handleErrorScenerio(req, response.data.message);
    res.redirect(detinationFailure);
    res.status(400);
  }
}

function handleSuccessScenerio(req, message) {
  req.session.popupType = 'success';
  req.session.popupMessage = message;
}

function handleErrorScenerio(req, message) {
  req.session.popupType = 'error';
  req.session.popupMessage = message;
}

module.exports = {
  router,
  processNewCapabilityGetRequest,
  processNewCapabilityPostRequest,
};
