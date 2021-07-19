const express = require('express');
const axios = require('axios').default;

const backEndURL = process.env.BACK_END_URL;
const router = express.Router();

router.get('/role', async (req, res) => {
  if (req.session.isLoggedIn && req.session.isAdmin) {
    const allRoles = await axios(`${backEndURL}/jobs/job-roles`);
    res.render('pages/viewAdminDeleteRole', {
      title: 'Admin Delete Role',
      loggedIn: req.session.isLoggedIn,
      isAdmin: req.session.isAdmin,
      roles: allRoles.data,
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
  const { RoleName } = req.body;
  if (req.session.isLoggedIn && req.session.isAdmin) {
    const response = await axios({
      method: 'post',
      url: `${backEndURL}/delete/role`,
      data: {
        RoleName,
      },
    });
    handleResponse(res, req, response, '../delete/role');
  } else if (req.session.isLoggedIn) {
    res.redirect('../home');
  } else {
    res.redirect('../');
  }
});

function handleResponse(res, req, response, page) {
  if (response.data.success === true) {
    res.redirect('../jobs/job-roles');
    res.status(200);
  } else {
    handleErrorScenerio(req, response.data.message);
    res.redirect(page);
    res.status(400);
  }
}

function handleErrorScenerio(req, message) {
  req.session.popupType = 'error';
  req.session.popupMessage = message;
}

module.exports = router;
