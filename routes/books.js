var express = require("express");
var router = express.Router();
const BookModel = require("./../model/bookModel");
const uploader = require("./../config/cloudinary");

/* GET books page. */

router.get("/", async (req, res, next) => {
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

router.post("/create", uploader.single("image"), async (req, res, next) => {
  const {
    title,
    author,
    year,
    genre,
    synopsis,
    comment,
    rating,
    cover,
  } = req.body; // destructuring syntax here !!!!

  let image;
  if (req.file) {
    image = req.file.path;
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
      cover,
    });
    res.redirect("/books");
  } catch (err) {
    next(err);
  }
});

/* Get book details page*/
router.get("/:id", function (req, res, next) {
  BookModel.findById(req.params.id)
    .then((book) => {
      res.render("book/bookdetail", { book });
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
  if (req.file) bookToUpdate.cover = req.file.path;
  try {
    await BookModel.findByIdAndUpdate(req.params.id, {
      title,
      author,
      year,
      genre,
      synopsis,
      comment,
      rating,
      cover,
    });
    res.redirect("/books");
  } catch (err) {
    next(err);
  }
});






// router.post("edit/:id", uploader.single("cover"), async (req, res, next) => {
//   try {
//     const bookToUpdate = req.body;
//     if (req.file) bookToUpdate.cover = req.file.path;

//     await BookModel.findByIdAndUpdate(req.params.id, bookToUpdate);
//     res.redirect("/books");
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = router;
