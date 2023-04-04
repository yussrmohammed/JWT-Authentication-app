const joi=require('joi')

const passwordReg =/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/

const signUpValidation= {
    body: joi.object({
    email: joi.string().email().required(),
    password:joi.string().regex(passwordReg).required(),
    name: joi.string().required()
    }),
}

module.exports ={signUpValidation}