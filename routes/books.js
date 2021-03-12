var express = require("express");
var router = express.Router();
const BookModel = require("./../model/bookModel");
const uploader = require("./../config/cloudinary");
const mongoose = require("mongoose");
const protectRoute = require('./../middlewares/protectRoute');
const CommentModel = require("./../model/commentModel");

/* GET books page : Render books page if user signed in */

router.get("/", protectRoute, async (req, res, next) => {
  try {
    const books = await BookModel.find();
    res.render("book/allbooks", { books });
  } catch (err) {
    next(err);
  }
});

/* GET create book page : Render create a book page if user signed in */

router.get("/create", protectRoute, function (req, res, next) {
  res.render("book/createbook");
});

/* POST create book page : Create a new book in the DB and redirect to books page */

router.post("/create", uploader.single("cover"), async (req, res, next) => {
  const {
    title,
    author,
    year,
    genre,
    synopsis,
    comment,
    rating,
  } = req.body;

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

/* GET book details page : Render book details page if user signed in */

router.get("/:id", protectRoute, function (req, res, next) {
  BookModel.findById(req.params.id)
    .then((book) => {

      CommentModel.find({ book: req.params.id }).populate("user")
        .then(comments => {
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

/* GET edit book page : Render book details page if user signed in */

router.get('/edit/:id', protectRoute, function (req, res, next) {
  BookModel.findById(req.params.id)
  console.log(req.params.id)
    .then((book) => res.render("book/editbook", { book }))
    .catch((dbError) => {
      next(dbError);
    });
});

/* GET delete one book page : Delete one book page & redirect to books page if user signed in */

router.get("/delete/:id", protectRoute, async (req, res, next) => {
  try {
    await BookModel.findByIdAndDelete(req.params.id);
    res.redirect("/books");
  } catch (err) {
    next(err);
  }
});

/* POST edit one book page : Edit one book page & redirect to books page if user signed in */

router.post("/edit/:id", protectRoute, uploader.single("cover"), async (req, res, next) => {
  const {
    title,
    author,
    year,
    genre,
    synopsis,
    comment,
    rating,
    cover,
  } = req.body;
  const bookToUpdate = req.body;
  if (req.file) { bookToUpdate.cover = req.file.path }
  else { delete bookToUpdate.cover }
  try {
    await BookModel.findByIdAndUpdate(req.params.id,
      bookToUpdate
    );
    res.redirect("/books");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
