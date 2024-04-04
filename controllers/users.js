const User = require("../models/user");


module.exports.renderSignup = (req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.signUp = async(req,res)=>{
    try{
    let {password,...rest} = req.body.user;
    const newUser= new User(rest);

    const userRegistered = await User.register(newUser,password);
    console.log(userRegistered);
    req.login(userRegistered,(err)=>{
        if (err){
            return next(err);
        }
        req.flash("success","Welcome aboard! Your homestay journey begins now.")
        res.redirect("/listings");
    });
    } catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    };
     
};

module.exports.renderLogin = (req,res)=>{
    res.render("users/login.ejs");
};

module.exports.Login = async(req, res) =>{
    req.flash("success","Welcome back to your HomeStay!")
    res.redirect(res.locals.redirectUrl || "/listings");
  };

module.exports.Logout = (req,res,next)=>{
    //what should be done after logout, in the bracket callback
    req.logout((err)=>{
        if (err){
            next(err)
        }
        else{
            req.flash("success","You are logged out successfully!");
            res.redirect("/listings");
        }
    })
};