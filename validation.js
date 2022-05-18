//VALIDATION

const Joi = require('@hapi/joi');


//register validation

const registerValidation = ()=>{

    const registerSchema = Joi.object({
        name: Joi.string()
        .min(6)
        .required(),
        email: Joi.string()
        .min(6)
        .required()
        .email(),
        password: Joi.string()
        .min(6)
        .required()
    });

    

}




module.exports = router;