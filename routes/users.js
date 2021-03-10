var express = require('express');
var router = express.Router();
const UserModel = require("./../model/userModel");
const protectRoute = require('./../middlewares/protectRoute')

/* GET edit page */
router.get('/edit/:id', function (req, res, next) {
  UserModel.findById(req.params.id)
    .then((user) => res.render("user/edituser", { user }))
    .catch((dbError) => {
      next(dbError);
    });
});

/* GET delete profile page */
router.get('/delete/:id', async function (req, res, next) {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.redirect('/')
  } catch (dbError) {
    next(dbError);
  }
});

/* GET user profile page */
router.get("/profile", protectRoute, function (req, res) {
  res.render("user/profile");
});

// router.get('/profile', protectRoute, function (req, res, next) {
//  const founduser = UserModel.findById(req.params.id)
//     .then((user) => res.render("/user/profile", { user }))
//     .catch((dbError) => {
//       next(dbError);
//     });
// });

module.exports = router;
