const express = require("express");
const router = express.Router();
const UserModel = require("./../model/userModel");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const uploader = require("./../config/cloudinary");

/* GET Signin page : Render Signin page */

router.get('/signin', function (req, res, next) {
  res.render('auth/signin');
});

/* GET Signup page : Render Signin page */

router.get('/signup', function (req, res, next) {
  res.render('auth/signup');
});

/* GET Signout page : Close current user session & render Signin page*/

router.get('/signout', function (req, res, next) {
  console.log(req.session)
  req.session.destroy()
  res.redirect('/auth/signin');
});

/* POST Signin page : Signin validation, if ok redirect to user's profile page */

router.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;
  const foundUser = await UserModel.findOne({ email: email });
  if (!foundUser) {
    res.redirect("/auth/signin");
  } else {
    const isSamePassword = bcrypt.compareSync(password, foundUser.password);
    if (!isSamePassword) {
      res.redirect("/auth/signin");
    } else {
      const userObject = foundUser.toObject();
      delete userObject.password;
      req.session.currentUser = userObject;
      res.redirect("/users/profile");
    }
  }
});

/* POST Signup page : Signup validation, if ok redirect to Signin page */

router.post("/signup", uploader.single("avatar"), async (req, res, next) => {
  console.log('signup')
  try {
    const newUser = { ...req.body }; 
    const foundUser = await UserModel.findOne({ email: newUser.email });
    if (req.file) {
      newUser.avatar = req.file.path;
    }
    if (foundUser) {
      res.redirect("/auth/signup");
    } else {
      const hashedPassword = bcrypt.hashSync(newUser.password, 10);
      newUser.password = hashedPassword;
      await UserModel.create(newUser);
      res.redirect("/auth/signin");
    }
  } catch (err) {
    console.log(err);
    let errorMessage = "";
    for (field in err.errors) {
      errorMessage += err.errors[field].message + "\n";
    }
    res.redirect("/auth/signup");
  }
});

module.exports = router;