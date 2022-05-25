const router = require('express').Router();
const User = require('../model/User');
const {registerValidation, loginValidation}= require('../validation');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

router.post('/register', async (req,res)=>{
    // validation of the data 
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //checing if the user is already in the database
    const emailExist = await User.findOne({email: req.body.email});

    if(emailExist) return res.status(400).send('Email already exists');
            

    //Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save()
        res.send({user: user._id});
    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
});

//login 

router.post('/login',async (req, res) =>{
     // validation of the data 
     const {error} = loginValidation(req.body);
     if(error) return res.status(400).send(error.details[0].message);

     //checing if the user is already in the database
     const user = await User.findOne({email: req.body.email});
     if(!user) return res.status(400).send("Email is wrong");

     //PASSWORD IS CORRECT
     const validPass = await bcrypt.compare(req.body.password, user.password);
     if(!validPass) return res.status(400).send('Invalid password');

     //Create and assign a token
     const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
     res.header('auth-token',token).send({user: user._id, token});
     

    //  res.send("You are connected")
}); 

module.exports = router;