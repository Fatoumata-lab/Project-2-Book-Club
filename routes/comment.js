var express = require('express');
var router = express.Router();
const CommentModel = require("./../model/commentModel");
const BookModel = require("./../model/bookModel");


/*get comment form on bookdetail page*/
//localhost:3000/comment/create
router.get("/create", function (req, res, next) {
    res.render("book/bookdetail");
  });

/* post comment create on bookdetail page*/

router.post("/create", async (req, res, next) => {
    // this is the request body > an object containing the posted informations"
    console.log(req.body);
    // remember : keys are set on the HTML form with the name attributes !!!
    const { user,book,comment } = req.body; // destructuring syntax here !!!!
    console.log(user,book,comment) ;
   
    try {
      await CommentModel.create({
        user,
        book,
        comment
      });
     // BookModel.findByIdAndUpdate({req.params.id})
      //}

     // });
      res.redirect("/books/{{this.book._id}}");
    } catch (err) {
      next(err);
    }
    
  });


//   Book.findOneAndUpdate({_id: req.params.id}, {$push: {authors: author}}, {new: true}, function(err, book) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("author inserted");
//       res.status(200).send();

    //   router.post("/edit/:id", async (req, res, next) => {
    //     const { name, email, favLangage, isRegistered } = req.body; // destructuring syntax here !!!!
    //     try {
    //       await HackerModel.findByIdAndUpdate(req.params.id, {
    //         name,
    //         email,
    //         favLangage,
    //         isRegistered: isRegistered === "on",
    //       });
    //       res.redirect("/hackers");
    //     } catch (err) {
    //       next(err);
    //     }
    //   });

  module.exports = router;