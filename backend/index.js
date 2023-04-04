require('dotenv').config()

const express= require('express')
const dbConnection= require('./db/dbConnection')
const userRoutes=  require( './routers/user.routes')
const {  ValidationError } = require('express-validation')
const passport= require('passport')
const { authJwt } = require('./auth.services')
const app=express()
const port= process.env.PORT || 3000


app.use(express.json())
app.use(passport.initialize())



app.use('/api/v1', userRoutes)
app.use('/api/v1/private', authJwt,(req,res)=>{
  res.send('this is a private route!')
})

app.use(function(err, req, res, next) {
    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json(err)
    }
  
    return res.status(500).json(err)
  })

const startServer= async ()=>{
try {        
     await dbConnection(process.env.MONGO_URI)
     app.listen(port, ()=>{

        console.log(`The server is now running on port: ${port}`)
        
    })
    
} catch (error) {
    console.log(error)
    
}
  
}
startServer()