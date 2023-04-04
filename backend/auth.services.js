

const passport = require('passport')
const LocalStrategy =require('passport-local').Strategy
const {Strategy, ExtractJwt}= require('passport-jwt')
const User = require('./models/userModel')
const localOpts = {
    usernameField : "email",
}

const localStrategy= new LocalStrategy(localOpts, async (email,password,done)=>{

    try {
        const user =await User.findOne({email:email})
        if(!user){ return done(null,false)
        }
        else if(!user.isValidPassword(password)){
            return done(null,false)
        }
        return done(null,user) 
    } catch (error) {
        return done(error,false)
    }
})
const jwtOpts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: process.env.JWT_SECRET
}

const jwtStratgy= new Strategy(jwtOpts, async (payload , done)=>{
    try {
        const user= User.findById(payload._id)
        if(!user){return done (null, false)}
        return done(null ,user)

    } catch (error) {
        done(error,false)
        
    }
})

passport.use(localStrategy)
passport.use(jwtStratgy)
 const authLocal = passport.authenticate('local',{
    session:false
})
const authJwt = passport.authenticate('jwt', {session:false})
module.exports ={
    authLocal,
    authJwt
}