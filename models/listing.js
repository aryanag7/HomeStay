const mongoose = require("mongoose");
const Review = require("./review");

const listingSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  image : {
    url: String,
    filename: String
  
  },
  price: Number,
  location :String,
  country: String,
  reviews:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review"

  }],
  //each listing belongs to one single user
  owner:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"

  },
  geometry:{
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  category:{
    type:String,
    enum: ['mountains', 'beaches', 'cities', 'forests', 'campings', 'pools', 'treehouses', 'top-of-the-world']
    
  }
})

//post mongoose middleware to delete reviews from review collection, 
// after listing is deleted ,we need this post middleware to execute
listingSchema.post("findOneAndDelete",async(listing)=>{
  await Review.deleteMany({_id: {$in: listing.reviews}});
})


const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;