var express = require('express');
var router = express.Router();
const UserModel = require("./../model/userModel");
const protectRoute = require('./../middlewares/protectRoute')
const uploader = require("./../config/cloudinary");
const FavoriteModel = require('./../model/favoriteModel')

/* GET edit profile page */
router.get('/edit', protectRoute, function (req, res, next) {
  UserModel.findById(req.params.id)
    .then((user) => res.render("user/edituser", { user }))
    .catch((dbError) => {
      next(dbError);
    });
});

/* GET delete profile page */
router.get('/delete', async function (req, res, next) {
  try {
    await UserModel.findByIdAndDelete(req.session.currentUser._id);
    req.session.destroy()
    res.redirect('/')
  } catch (dbError) {
    console.log(err)
    next(dbError);
  }
});

/* GET profile page */
router.get("/profile", protectRoute, function (req, res) {
  console.log(req.session.currentUser._id)
 FavoriteModel.find({user: req.session.currentUser._id}).populate("book")
  .then(favorite => {
    console.log(favorite)
    res.render("user/profile", {favorite});
  })
  .catch((dbError) => {
  next(dbError);
});
})

/* POST edit profile page */
router.post("/edit",uploader.single("avatar"), async (req, res, next) => {
  console.log('Hello')
  const {
    firstName,
    lastName,
    email,
    avatar,
  } = req.body;  // destructuring syntax here !!!!
  const userToUpdate = req.body;
  if (req.file) {

    userToUpdate.avatar = req.file.path;
    console.log("if");
  }

else{
delete userToUpdate.avatar
console.log("second console log" )
}
    
  console.log(userToUpdate);
  try {
    const foundUser = await UserModel.findByIdAndUpdate(req.session.currentUser._id, 
      userToUpdate, {new: true}
    ).select("-password")
    req.session.currentUser = foundUser
    res.redirect("/users/profile");
  } catch (err) {
    console.log(err)
    next(err);
  }
});

module.exports = router;
