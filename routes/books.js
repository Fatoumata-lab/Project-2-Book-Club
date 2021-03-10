var express = require("express");
var router = express.Router();
const BookModel = require("./../model/bookModel");
const uploader = require("./../config/cloudinary");
const mongoose = require("mongoose");
const protectRoute = require('./../middlewares/protectRoute');
const CommentModel =require("./../model/commentModel");

/*Get random page*/

// router.get("/", (req, res, next) =>{
//   const BookRandom = mongoose.model('BookRandom', bookSchema);
// console.log("test");
// BookRandom.findOneRandom()
//   .then((randomBookFromDb) => {
//     console.log("test2", randomBookFromDb)
//     res.render("/", { randomBook: randomBookFromDb[0]}) 
//     console.log("randomBookFromDb")
// })
// .catch(next)
// });
//const protectRoute = require('./../middlewares/protectRoute')

/* GET books page. */

router.get("/", protectRoute, async (req, res, next) => {
  try {
    const books = await BookModel.find();
    res.render("book/allbooks", { books });
  } catch (err) {
    next(err);
  }
});

/* get Create book page*/
router.get("/create", function (req, res, next) {
  res.render("book/createbook");
});

/* Post create book page*/

router.post("/create", uploader.single("cover"), async (req, res, next) => {
  const {
    title,
    author,
    year,
    genre,
    synopsis,
    comment,
    rating,
  } = req.body; // destructuring syntax here !!!!

  let cover;
  if (req.file) {
cover = req.file.path;
  }

  try {
    await BookModel.create({
      title,
      author,
      year,
      genre,
      synopsis,
      comment,
      rating,
      cover
    });
    res.redirect("/books");
  } catch (err) {
    next(err);
  }
});


//localhost:3000/books/abc123
/* Get book details page*/
router.get("/:id", function (req, res, next) {
  BookModel.findById(req.params.id)
    .then((book) => {

      CommentModel.find({book:req.params.id})
      .then(comments =>{
        res.render("book/bookdetail", { book, comments });
      }) 
      .catch((dbError) => {
        next(dbError);
      });
    })
    .catch((dbError) => {
      next(dbError);
    });
});

/* GET Edit book page*/
router.get("/edit/:id", function (req, res, next) {
  BookModel.findById(req.params.id)
    //console.log(req.params.id)
    .then((bookDB) => res.render("book/editbook", { book: bookDB }))
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

/* Delete one book page*/
router.get("/delete/:id", async (req, res, next) => {
  try {
    await BookModel.findByIdAndDelete(req.params.id);
    res.redirect("/books");
  } catch (err) {
    next(err);
  }
});

/* POST Edit one book page*/
router.post("/edit/:id",uploader.single("cover"), async (req, res, next) => {
  const {
    title,
    author,
    year,
    genre,
    synopsis,
    comment,
    rating,
    cover,
  } = req.body;  // destructuring syntax here !!!!
  const bookToUpdate = req.body;
  if (req.file) {
    bookToUpdate.cover = req.file.path;
    console.log("this is the book to update cover" , bookToUpdate.cover);
  }

else{
delete bookToUpdate.cover
console.log("second console log" )
}
    
  //console.log(bookToUpdate);
  try {
    await BookModel.findByIdAndUpdate(req.params.id, 
     bookToUpdate
    );
    res.redirect("/books");
  } catch (err) {
    next(err);
  }
});

/*Get random book*/

// function random_book(books)
// {
//   console.log(books[1])
// return books[Math.floor(Math.random()*books.length)];
// }
// random_book()

module.exports = router;
