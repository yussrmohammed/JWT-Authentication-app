const {Schema, default: mongoose}= require('mongoose')
const validator= require('validator')
const bcrypt= require('bcryptjs')
const jwt=require('jsonwebtoken')
const userSchema= new Schema({

    name:{
        type:String,
        required:[true,'Please provide a valid credentials']
    },
    email:{
        type:String,
        required:[true,'Please provide a valid credentials'],
        unique:true,
        validate:{
            validator:validator.isEmail,
            message: 'Please provide a valid credentials'
        }
    },
    password:{
        type:String,
        required:[true,'Please provide a valid credentials'],
        minlength:[6,'Password need to be longer!'],

    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    },
})

/*userSchema.pre("save", function(next){

const user = this
if(this.isModified("password") || this.isNew){
    bcrypt.getSalt(10, function (saltError, salt){
        if (saltError) return next(saltError)
        else{
            bcrypt.hash(user.password,salt ,function (hashError,hash){
                if(hashError) return next(hashError)
                user.password=hash
                next()

            })
        }

    })

}
else{
    return next()
}
})*/
userSchema.pre("save", async function(next){
   const user= this
   const hash =await bcrypt.hash(user.password,10)
   user.password=hash
   next()

})
userSchema.methods = { isValidPassword(password){
    const user =this
    const isPassCorrect=  bcrypt.compareSync(password, user.password)
    return isPassCorrect
},
createToken(){
    return jwt.sign({_id:this._id}, process.env.JWT_SECRET)
},
toJSON(){
    return {
        _id:this._id,
        userNsme:this.name,
        token:`JWT ${this.createToken()}`,
    }
}
}


module.exports= mongoose.model('User', userSchema)