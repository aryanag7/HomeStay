const express= require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const Listing = require("../models/listing");
const {validateListingSchema} = require("../schemaValidation");
const {isLoggedin} = require("../middleware");
const multer  = require('multer')
const {storage} = require("../cloudConfig");
//save image files from form in the destination 
// const upload = multer({ dest: 'uploads/' });
const upload = multer({ storage});

// listingController has all the methods wrt listing 
const listingController = require("../controllers/listings");

const validateListing = (req,res,next)=>{
    //returns value and error
    let {error} = validateListingSchema.validate(req.body);
    if (error){
        return next(new ExpressError(400,error));
    }
    else{
        next();
    }
}


router.get("/category/:findCategory",async(req,res)=>{
    let {findCategory} = req.params;
    // console.log(findCategory)
    let listings = await Listing.find({category:findCategory});
    res.send(listings);

})

router.get("/search/:countryName",async(req,res)=>{
    let {countryName}= req.params;
    const regex = new RegExp(countryName,"i")
    let listings = await Listing.find({country:{ $regex : regex} });
    res.send(listings);
    
})

router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedin , upload.single("listing[image]"),validateListing,  wrapAsync(listingController.addListing));
 

//new route - new listing
router.get("/new",isLoggedin,listingController.newForm);

router.route("/:id")
.get(wrapAsync(listingController.showListing))
.patch(isLoggedin,upload.single("listing[image]"),validateListing,wrapAsync(listingController.updateListing))
.delete(isLoggedin,wrapAsync(listingController.deleteListing));

//index route - all listings
// router.get("/",wrapAsync(listingController.index));



//show route - particular listing 
// router.get("/:id", wrapAsync(listingController.showListing));


//create listing in db
// router.post("/", isLoggedin ,validateListing, wrapAsync(listingController.addListing));

//edit route
router.get("/:id/edit",isLoggedin,wrapAsync(listingController.editForm));

//update route
// router.patch("/:id",isLoggedin,validateListing,wrapAsync(listingController.updateListing));


//delete route
// router.delete("/:id",isLoggedin,wrapAsync(listingController.deleteListing));

module.exports = router;


