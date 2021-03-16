//jshint esversion:6
const express=require("express");
const app=express();
const ejs=require("ejs");
const bcrypt=require("bcryptjs");
const salt=bcrypt.genSaltSync(10);
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost:27017/techDB",{useNewUrlParser:true});

app.get("/",function(req,res){
  res.render("signin");
});
const userSchema=({
  email:String,
  password:String
});
const User=new mongoose.model("User",userSchema);
app.post("/signin",function(req,res){
const hash=bcrypt.hashSync(req.body.password,salt);

  const newUser=new User({
    email:req.body.username,
    password:hash
  });
  newUser.save(function(err){
    if(err){
      console.log(err);
    }
    else{
      res.render("success");
    }
  });
});
app.listen(3000,function(){
console.log("Server engaged on port 3000");
});
