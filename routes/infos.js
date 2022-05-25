const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../model/User');


router.get('/',verify, (req,res)=>{
    
    const user = User.findOne({id: req.header('auth-token')});

    if(user){
        User.findById(req.user._id).then((user) => {
            res.send(user)
        });
    }else{
        res.send("there is not a token")
    }
})

module.exports = router;