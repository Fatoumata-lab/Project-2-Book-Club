var express = require('express');
var router = express.Router();

/* GET signin page */
router.get('/signin', function(req, res, next) {
  res.render('user/signin');
});

/* GET signup page */
router.get('/signup', function(req, res, next) {
  res.render('user/signup');
});

/* GET edit page */
router.get('/edit/:id', function(req, res, next) {
  res.render('user/edit');
});

/* GET user profile page */
router.get('/:id', function(req, res, next) {
  res.render('user/profile');
});

/* GET delete profile page */
router.get('/delete/:id', function(req, res, next) {
  res.redirect('/');
});

/* Signout */
router.get('/signout/:id', function(req, res, next) {
  res.redirect('user/signin');
});

module.exports = router;
