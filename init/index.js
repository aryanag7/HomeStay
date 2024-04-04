const {data:sampleData}= require("./data");
const mongoose = require("mongoose");
const Listing = require("../models/listing");

main().then((res)=>{
    console.log("Connected to the database!");
    
}).catch((err) =>{
    console.log(err);
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/HomeStay');
}



const initDB = async ()=> {
    await Listing.deleteMany({});
    const Data= sampleData.map((obj)=> {
        return {...obj,owner:'6607e866dff6b52cb7fdeab9'};
    });
    await Listing.insertMany(Data);
    console.log("Database is initialized!");
}

initDB();