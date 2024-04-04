const Review = require("./models/review");

//to check if the user is logged in or not
const isLoggedin = (req,res,next)=>{
    // console.log(req.user);
    // console.log(req);
    if (!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","Please log in to create a listing.");
        return res.redirect("/login");
    }
    next();
}


const saveRedirectUrl = (req,res,next)=>{
    if (req.session.redirectUrl){
        res.locals.redirectUrl= req.session.redirectUrl;
    }
    next();
}

//protecting routes , an alternative to hide buttons directly
const isReviewAuthor = async(req,res,next)=>{
    let {id,reviewId}=req.params;
    let review = await Review.findById(reviewId);
    if (! res.locals.currUser._id.equals(review.author)){
        req.flash("error","You are not the author of this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports = {isLoggedin,saveRedirectUrl,isReviewAuthor};