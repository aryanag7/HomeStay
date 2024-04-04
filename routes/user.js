const express= require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware")

const userController = require("../controllers/users")

router.route("/signup")
.get(userController.renderSignup)
.post(wrapAsync(userController.signUp));

// get signup
// router.get("/signup",userController.renderSignup);


//post signup
// router.post("/signup", wrapAsync(userController.signUp));

router.route("/login")
.get(userController.renderLogin)
.post(saveRedirectUrl,passport.authenticate("local", { failureRedirect: "/login",failureFlash:true}),userController.Login);



//get login
// router.get("/login",userController.renderLogin);

//post login
// to check if the user is authenticated, in the db or not
// router.post("/login",saveRedirectUrl,passport.authenticate("local", { failureRedirect: "/login",failureFlash:true}),userController.Login);


router.get("/logout",userController.Logout);



module.exports = router;