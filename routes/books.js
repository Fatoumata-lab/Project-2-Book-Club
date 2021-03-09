var express = require('express');
var router = express.Router();
const BookModel = require("./../model/bookModel");


/* GET books page. */

router.get("/", async (req, res, next) => {
  try {
    const books = await BookModel.find()
    res.render("book/allbooks", { books });
  } catch (err) {
    next(err);
  }
});

/* Create book page*/
router.get('/create', function (req, res, next) {
  res.render('book/createbook');
});

/* Get book details page*/
router.get('/:id', function (req, res, next) {
  BookModel.findById(req.params.id)
    .then((book) => {
      res.render("book/bookdetail", { book });
    })
    .catch((dbError) => {
      next(dbError);
    });
});



/* Edit book page*/
router.get('/edit/:id', function (req, res, next) {
  BookModel.findById(req.params.id)
  console.log(req.params.id)
    .then((book) => res.render("book/editbook", { book }))
    .catch((dbError) => {
      next(dbError);
    });
});

/* Delete book page*/
router.get('/delete/:id', function (req, res, next) {
  res.redirect('book/allbooks');
});



module.exports = router;
