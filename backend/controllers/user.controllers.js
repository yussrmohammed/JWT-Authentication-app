const User= require( '../models/userModel')

const signUp= async (req,res)=>{
    const {name,email,password}= req.body
    try {
        const user =await User.create({name,email,password})
        res.status(201).json(user)
    } catch (error) {
        return res.status(500).json(error)
    }
}
const logIn= async (req,res, next)=>{
    res.status(200).json(req.user)
    return next()
    



}

module.exports = {
    signUp,
    logIn
}