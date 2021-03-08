var express = require('express');
var router = express.Router();
const book = require("./../model/bookModel");


/* GET books page. */
router.get('/', function(req, res, next) {
  res.render('book/allbooks');
});

/* Get book details page*/
router.get('/:id', function(req, res, next) {
    res.render('book/bookdetail');
  });
  
/* Create book page*/
router.get('/create', function(req, res, next) {
    res.render('book/createbook');
  });

  /* Edit book page*/
router.get('/edit/:id', function(req, res, next) {
    res.render('book/editbook');
  });

    /* Delete book page*/
router.get('/delete/:id', function(req, res, next) {
    res.redirect('book/allbooks');
  });



module.exports = router;
