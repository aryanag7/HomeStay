const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken =  process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });



module.exports.index= async (req,res)=>{
    allListings = await Listing.find();
    res.render("listings/index.ejs",{allListings});
};

module.exports.newForm = (req,res)=>{
    res.render("listings/new.ejs");
};

module.exports.showListing = async(req,res)=>{
    let {id}= req.params;
    let listing = await Listing.findById(id).populate({path:"reviews",populate: {path: "author"}}).populate("owner");

    if (!listing){
        req.flash("error","Listing does not exist!")
        res.redirect("/listings");

    }else{
        res.render("listings/show.ejs",{listing});
    }
  
};

module.exports.addListing = async(req,res,next)=>{ 
    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1 
      })
        .send()
   
    
    let url = req.file.path;
    let filename= req.file.filename;
    let newListing = new Listing( req.body.listing);
    newListing.owner= req.user._id;
    newListing.image = {url,filename};

    newListing.geometry=response.body.features[0].geometry;

    await newListing.save();
      
    // flash setup
    req.flash("success","Listing added successfully!")
    res.redirect("/listings");
};

module.exports.editForm = async(req,res)=>{
    let {id}= req.params;
    let listing = await Listing.findById(id);
    let originaUrl = listing.image.url;
    originaUrl= originaUrl.replace("/upload","/upload/h_300,w_250");
    res.render("listings/edit.ejs",{listing,originaUrl});  
};

module.exports.updateListing = async(req,res)=>{
    let {id}= req.params;
    newDescription=req.body.listing.description;
    newCategory=req.body.listing.category;
    let listing = await Listing.findOneAndUpdate({_id:id},{description:newDescription,category:newCategory});
    //wont run if file is not sent to the backend
    if (req.file){
        let url = req.file.path;
        let filename= req.file.filename;  
        listing.image= {url,filename};
        await listing.save();
    }
    req.flash("success","Review updated successfully!")
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async(req,res)=>{
    let {id}= req.params;
    await Listing.findByIdAndDelete({_id:id});
    req.flash("success","Listing deleted successfully!")
    res.redirect("/listings");
    
};