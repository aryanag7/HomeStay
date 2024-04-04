const Listing = require("../models/listing");
const Review = require("../models/review");


module.exports.addReview = async(req,res)=> {
    let {id}= req.params;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);

    newReview.author = req.user._id; 
    listing.reviews.push(newReview);
    
    await listing.save();
    //change in existing document
    await newReview.save();
    req.flash("success","Review added successfully!")
    res.redirect(`/listings/${id}`);
};

module.exports.deleteReview = async(req,res)=>{

    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull: {reviews:reviewId}})
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review deleted successfully!")
    res.redirect(`/listings/${id}`);

};