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

//      BookModel.findByIdAndUpdate(req.params.id)
//      console.log(req.params.id);

//     .then((newBookModel)=>{
//         console.log("this is the new model", newBookModel);
//         res.render("/book/bookdetail", {bookComment : newBookModel});
//     });
// });
//     .catch((dbError) => {
//         next(dbError);
//       });

     // });
      res.redirect(`/books/${book}`);
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