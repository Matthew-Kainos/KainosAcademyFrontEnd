const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
  if (req.session.isLoggedIn && req.session.isAdmin) {
    res.render('pages/viewAdminMenu', {
      title: 'Admin Menu',
      loggedIn: req.session.isLoggedIn,
      isAdmin: req.session.isAdmin,
    });
    res.status(200);
  } else if (req.session.isLoggedIn) {
    res.redirect('../home');
  } else {
    res.redirect('../');
  }
});

router.get('/menu', async (req, res) => {
  if (req.session.isLoggedIn && req.session.isAdmin) {
    res.render('pages/viewAdminMenu', {
      title: 'Admin Menu',
      loggedIn: req.session.isLoggedIn,
      isAdmin: req.session.isAdmin,
    });
    res.status(200);
  } else if (req.session.isLoggedIn) {
    res.redirect('../home');
  } else {
    res.redirect('../');
  }
});

router.get('/add', async (req, res) => {
  if (req.session.isLoggedIn && req.session.isAdmin) {
    res.render('pages/viewAdminAddMenu', {
      title: 'Admin Add Menu',
      loggedIn: req.session.isLoggedIn,
      isAdmin: req.session.isAdmin,
    });
    res.status(200);
  } else if (req.session.isLoggedIn) {
    res.redirect('../home');
  } else {
    res.redirect('../');
  }
});

router.get('/delete', async (req, res) => {
  if (req.session.isLoggedIn && req.session.isAdmin) {
    res.render('pages/viewAdminDeleteMenu', {
      title: 'Admin Delete Menu',
      loggedIn: req.session.isLoggedIn,
      isAdmin: req.session.isAdmin,
    });
    res.status(200);
  } else if (req.session.isLoggedIn) {
    res.redirect('../home');
  } else {
    res.redirect('../');
  }
});

module.exports = router;
