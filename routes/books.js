var express = require('express');
var router = express.Router();
const BookModel = require("./../model/bookModel");


/* GET books page. */

// router.get("/", async (req, res, next) => {
//   try {

//     res.render("book/allbooks", { books: await BookModel.find() });
//   } catch (err) {
//     next(err);
//   }
// });

router.get("/", (req, res, next) => {
  BookModel.find()
    .then((dbRes) => {
      res.render("book/allbooks", {
        books: dbRes,
      });
    })
    .catch((dbError) => {
      next(dbError);
    });
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
