var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session)
  console.log(res.locals)
  res.render('index', { title: 'Express' });
});

module.exports = router;
