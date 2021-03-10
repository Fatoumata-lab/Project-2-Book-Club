const express = require("express");
const router = express.Router();
const UserModel = require("./../model/userModel");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const uploader = require("./../config/cloudinary");

/* GET signin page */
router.get('/signin', function (req, res, next) {
  res.render('auth/signin');
});

/* GET signup page */
router.get('/signup', function (req, res, next) {
  res.render('auth/signup');
});

/* GET signout page */
router.get('/signout', function (req, res, next) {
  console.log(req.session)
  req.session.destroy()
  res.redirect('/auth/signin');
});

/* POST signin page */
router.post("/signin", async (req, res, next) => {
  // DO something
  //   res.render("auth/signin.hbs");
  const { email, password } = req.body;
  const foundUser = await UserModel.findOne({ email: email });
  console.log(foundUser)
  if (!foundUser) {
    //   Display an error message telling the user that either the password
    // or the email is wrong
    // req.flash("error", "Invalid credentials");
    res.redirect("/auth/signin");
    // res.render("auth/signin.hbs", { error: "Invalid credentials" });
  } else {
    // https://www.youtube.com/watch?v=O6cmuiTBZVs
    const isSamePassword = bcrypt.compareSync(password, foundUser.password);
    console.log(isSamePassword)
    if (!isSamePassword) {
      // Display an error message telling the user that either the password
      // or the email is wrong
      // req.flash("error", "Invalid credentials");
      res.redirect("/auth/signin");
      // res.render("auth/signin.hbs", { error: "Invalid credentials" });
    } else {
      // everything is fine so :
      // Authenticate the user...
      const userObject = foundUser.toObject();
      console.log("1st objetct", userObject)
      delete userObject.password; // remove password before saving user in session
      console.log("2nd objetct", userObject)
      // console.log("Req.session", req.session);
      req.session.currentUser = userObject; // Stores the user in the session (data server side + a cookie is sent client side)
      console.log("Req.session.currentUser", req.session.currentUser)
      // req.flash("success", "Successfully logged in...");
      res.redirect("/users/profile");
    }
  }
});

/* POST signup page */
router.post("/signup", uploader.single("avatar"), async (req, res, next) => {
  console.log('signup')
  try {
    const newUser = { ...req.body }; // clone req.body with spread operator
    const foundUser = await UserModel.findOne({ email: newUser.email });

    if (foundUser) {
      console.log('if')
      console.log("User email already registered")
      // req.flash("warning", "Email already registered");
      res.redirect("/auth/signup");
    } else {
      console.log('else')
      const hashedPassword = bcrypt.hashSync(newUser.password, 10);
      // console.log(newUser.password, hashedPassword);
      console.log(newUser)
      newUser.password = hashedPassword;
      await UserModel.create(newUser);
      console.log('else3')
      // req.flash("success", "Congrats ! You are now registered !");
      res.redirect("/auth/signin");
    }
  } catch (err) {
console.log(err);   
 let errorMessage = "";
    for (field in err.errors) {
      errorMessage += err.errors[field].message + "\n";
    }
    // req.flash("error", errorMessage);
    res.redirect("/auth/signup");
  }
});

module.exports = router;