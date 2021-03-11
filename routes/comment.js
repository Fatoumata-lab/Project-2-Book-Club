var express = require('express');
var router = express.Router();
const CommentModel = require("./../model/commentModel");
const BookModel = require("./../model/bookModel");


/*get comment form on bookdetail page*/
router.get("/create", function (req, res, next) {
    res.render("book/bookdetail");
  });

/* post comment create on bookdetail page*/

router.post("/create/:id", async (req, res, next) => {
    // this is the request body > an object containing the posted informations"
    console.log(req.body);
    // remember : keys are set on the HTML form with the name attributes !!!
    const { comment } = req.body; // destructuring syntax here !!!!
    const book = req.params.id;
    const user = req.session.currentUser._id;
    console.log(book,comment) ;
   
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

/* Delete one comment */
// router.get("/delete/:id", async (req, res, next) => {
//   try {
//     await CommentModel.findByIdAndDelete({comment: req.params.id});
//     res.redirect(`/home`);
//   } catch (err) {
//     next(err);
//   }
// });


  module.exports = router;