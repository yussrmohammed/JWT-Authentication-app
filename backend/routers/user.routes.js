const express= require('express')
const {validate} =require('express-validation')
const {signUpValidation}= require('../user.validation')
const {signUp,logIn} = require( '../controllers/user.controllers')
const {authLocal}= require('../auth.services')
const routes = express.Router()

routes.post('/signup', validate(signUpValidation,{},{}),signUp)
routes.post('/login', authLocal, logIn )
module.exports= routes