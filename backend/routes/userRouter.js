const express = require('express');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/user");
const authenticator = require('../middlewear/authienticator');

router.post("/register", async (req, res) => {
    const {fullname, email, password, confirmPass} = req.body;

    if(confirmPass !== password){
        return res.status(409).send({error: "Password does not match."});
    }

    try {

       let checkEmail = await User.findOne({email: email});

       if(checkEmail){
         return res.status(409).send({error: "The user is already registered"});
       }
       
       const salt = bcrypt.genSaltSync(10);
       const hashedPassword = bcrypt.hashSync(password, salt); 

       const newUser = new User({
            fullname: fullname,
            email: email,
            password: hashedPassword,
        });
        
      await newUser.save();

      res.status(201).send({message: "Registered Sucessfully. Please Login"});

    } catch (err) {
        res.status(500).send({error: err.message});
    }
});

router.post("/login", async (req, res) => {

    const {email, password} = req.body;

    try {
        let validUser = await User.findOne({email: email});

        if(!validUser){
            return res.status(400).send({error: "Email or password is wrong."});
        }

        let validPassword = bcrypt.compareSync(password, validUser.password);

        if(!validPassword){
            return res.status(400).send({error: "Email or password is wrong."})
        }

        const {password: _ , ...userData} = validUser.toObject();

        const token = jwt.sign(userData, process.env.JWT_SECRET, {expiresIn: "1d"});

        res.status(201).send({message: "Login Successfully.", token});
        
    } catch (err) {
        res.status(500).send({error: err.message})
    }
});

router.post("/logout", authenticator, (req, res) => {
    
})




module.exports = router;