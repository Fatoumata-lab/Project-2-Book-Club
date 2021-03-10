var express = require('express');
var router = express.Router();
const UserModel = require("./../model/userModel");
const protectRoute = require('./../middlewares/protectRoute')
const uploader = require("./../config/cloudinary");

/* GET edit profile page */
router.get('/edit', protectRoute, function (req, res, next) {
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

/* GET profile page */
router.get("/profile", protectRoute, function (req, res) {
  res.render("user/profile");
});

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
