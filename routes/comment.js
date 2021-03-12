var express = require('express');
var router = express.Router();
const CommentModel = require("./../model/commentModel");
const BookModel = require("./../model/bookModel");


/* GET comment form on bookdetail page */

router.get("/create", function (req, res, next) {
    res.render("book/bookdetail");
  });

/* POST comment create on bookdetail page : Create a user's comment & redirect to book details page */

router.post("/create/:id", async (req, res, next) => {
    const { comment } = req.body; 
    const book = req.params.id;
    const user = req.session.currentUser._id;
    try {
      await CommentModel.create({
        user,
        book,
        comment
      });
      res.redirect(`/books/${book}`);
    } catch (err) {
      next(err);
    }
    
  });

  module.exports = router;