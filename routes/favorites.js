var express = require('express');
var router = express.Router();
const CommentModel = require("./../model/commentModel");
const BookModel = require("./../model/bookModel");
const FavoriteModel = require("./../model/favoriteModel")

router.post("/add/:id", async (req, res, next) => {
    const book = req.params.id;
    const user = req.session.currentUser._id;
    console.log(book, user);
    try {
        await FavoriteModel.create({
            user,
            book,
        })
        
        res.redirect(`/books/${book}`);

    } catch (err) {
        next(err);
    }
})

// router.post("/delete/:id", async (req, res, next) => {
//     try {
//         await FavoriteModel.findByIdAndDelete({
//             user,
//             book,
//         })
        
//         res.redirect(`/books/${book}`);

//     } catch (err) {
//         next(err);
//     }
// })


module.exports = router;