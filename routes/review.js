const express= require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const {validateReviewSchema} = require("../schemaValidation");
const {isLoggedin,isReviewAuthor} = require("../middleware");

const reviewController = require("../controllers/reviews");

const validateReview = (req,res,next)=>{
    //returns value and error
    let {error} = validateReviewSchema.validate(req.body);
    if (error){
        return next(new ExpressError(400,error));
    }
    else{
        next();
    }

}

//add review
router.post("/",isLoggedin,validateReview, wrapAsync(reviewController.addReview));


//delete review
router.delete("/:reviewId",isLoggedin,isReviewAuthor,wrapAsync(reviewController.deleteReview));

module.exports = router;
