const express = require('express');
const bcrypt = require('bcrypt');
const session = require('express-session');

const app = express();
require('dotenv').config();
const axios = require('axios').default;

const backEndURL = process.env.BACK_END_URL;
const nunjucks = require('nunjucks');
const jobs = require('./routes/jobs');
const capabilities = require('./routes/capabilities');
const admin = require('./routes/admin');
const bands = require('./routes/bands');

let sess = {};

app.use(session({ secret: 'Apples', resave: false, saveUninitialized: false }));

nunjucks.configure('views', {
  express: app,
});

app.set('view engine', 'njk');

app.use(express.json());
app.use(express.urlencoded());

// For rendering css and images
app.use(express.static('public'));

app.use('/bands', bands);
app.use('/jobs', jobs);
app.use('/capabilities', capabilities);
app.use('/admin', admin);

app.get('/', (req, res) => {
  if (req.session.isLoggedIn === true) {
    res.redirect('/home');
  } else {
    res.render('pages/login', {
      title: 'Login',
      loggedIn: req.session.isLoggedIn,
      isAdmin: req.session.isAdmin,
    });
  }
  res.status(200);
});

app.get('/home', (req, res) => {
  if (sess.isLoggedIn) {
    res.render('pages/viewHome', {
      title: 'Home',
      loggedIn: req.session.isLoggedIn,
      isAdmin: req.session.isAdmin,
    });
  } else {
    res.redirect('/');
  }
  res.status(200);
});

app.post('/login', async (req, res) => {
  try {
    const username = req.body.Username;
    const password = req.body.Password;

    const doesUserExist = await axios(`${backEndURL}/login/checkIfUserExists/${username}`);
    if (doesUserExist.data === true) {
      if (await this.checkIfPasswordValid(username, password) === true) {
        await this.initaliseSessionPermissions(req, username);
        res.redirect('/home');
      } else {
        res.render('pages/login', { title: 'Login', error: 'Incorrect Password' });
        res.status(400);
      }
    } else {
      res.render('pages/login', { title: 'Login', error: 'Incorrect Username' });
      res.status(400);
    }
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      res.send('Backend not running');
      res.status(500);
    }
    console.error(error);
  }
});

exports.checkIfPasswordValid = async (username, password) => {
  const getPasswordResults = await this.getPassword(username);
  const isPwValid = await bcrypt.compare(password, getPasswordResults.data);
  return isPwValid;
};

exports.getPassword = async (username) => {
  const getPasswordResults = await axios({
    method: 'post',
    url: `${backEndURL}/login/getPassword`,
    data: {
      username,
    },
  });
  return getPasswordResults;
};

exports.checkIfAdmin = async (username) => axios(`${backEndURL}/login/checkIfAdmin/${username}`);

exports.initaliseSessionPermissions = async (req, username) => {
  const isUserAdmin = await this.checkIfAdmin(username);
  if (isUserAdmin.data === true) {
    initaliseAdminSession(req, username);
  } else {
    initaliseUserSession(req, username);
  }
};

function initaliseAdminSession(req, username) {
  sess = req.session;
  sess.userID = username;
  sess.isAdmin = true;
  sess.isLoggedIn = true;
}

function initaliseUserSession(req, username) {
  sess = req.session;
  sess.userID = username;
  sess.isAdmin = false;
  sess.isLoggedIn = true;
}

app.get('/logout', async (req, res) => {
  sess = {};
  req.session.destroy();
  res.redirect('/');
});

// 404 Path
app.use((req, res) => {
  res.render('pages/view404', { error: `404: Unable to find path ${req.path}` });
  res.status(404);
});

app.listen(3001, () => {
  console.log('Express FrontEnd started');
});
