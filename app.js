if (process.env.NODE_ENV != "production"){
    //using it in development phase
    require('dotenv').config();
}



const express = require("express");
const app =express();
const mongoose = require("mongoose");
const port = 8080;
const path = require("path");
const methodOverride = require('method-override');
const ejsMate= require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const session = require("express-session");
const MongoStore = require('connect-mongo')
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User =  require("./models/user");

const listing_routes = require("./routes/listing");
const review_routes = require("./routes/review");
const user_routes = require("./routes/user");


const dbUrl = process.env.ATLASDB_URL;


main().then((res)=>{
    console.log("Connected to the database!");
    
}).catch((err) =>{
    console.log(err);
});

async function main() {
  await mongoose.connect(dbUrl);
}


app.set("view engine","ejs");
app.set("views", path.join(__dirname,"/views"));

app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"/public")));
app.use(methodOverride("_method"));

// boilerplate layout
app.engine('ejs',ejsMate);


const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24*60*60
})

store.on("error", ()=>{
    console.log("ERROR in Mongo Session Store!",err);
})

const sessionOptions = {
    store:store,
    secret: process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60  * 1000,
        maxAge: 7 * 24 * 60 * 60  * 1000,
        httpOnly: true
}
};



// app.get("/",(req,res)=>{
//     res.send("working");
// })




app.use(session(sessionOptions));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

//serialize is to store user data in session- no need to login again until session is ended
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//flash middleware
app.use((req,res,next)=>{
    res.locals.successMsg = req.flash("success");
    res.locals.failureMsg = req.flash("error");
    res.locals.currUser = req.user;
    next();
})


app.get("/", (req, res) => {
    res.redirect("/listings"); // Redirect to the listing routes homepage
});

app.use("/listings",listing_routes);
app.use("/listings/:id/reviews",review_routes);
app.use("/",user_routes);



//explicitly generating error from custom errror class
app.get("*",(req,res,next)=>{
    next(new ExpressError(401,"Page not found! Check the path again."))
})


// error handler middleware defined by us which sends the response to client
app.use((err,req,res,next)=>{
    let {statusCode = 500, message = "Something went wrong :("} = err;
    res.status(statusCode).render("error.ejs",{message});
    // res.status(statusCode).send(message);
})

app.listen(port,()=>{
    console.log("server is listening on port",port);
})
