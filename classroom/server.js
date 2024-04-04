const express = require("express");
const app =express();
const port = 3000;
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.use(session({secret: "mysupersecretstring",resave:false, saveUninitialized:true}));
app.use(flash());


app.set("view engine","ejs");
app.set("views", path.join(__dirname,"/views"));

app.use((req,res,next)=>{
    res.locals.message = req.flash("success");
    next();
})

app.get("/register",(req,res)=>{
    let {name="anonymous"}= req.query;
    req.session.name=name;
    req.flash("success","User registered successfully!")
    res.redirect("/greet");
})

app.get("/greet",(req,res)=>{
    // res.locals.message = req.flash("success");
    res.render("page.ejs",{name:req.session.name});

})
app.listen(port,()=>{
    console.log("server is listening on port",port);
})
