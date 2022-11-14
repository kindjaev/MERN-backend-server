
const User = require("../models/userModel")
const jwt = require("jsonwebtoken")

require("dotenv").config() //maybe i could skip the line

const createToken = (id) => {
    return jwt.sign({_id: id}, process.env.SECRET, {expiresIn: "3d"})
}

// user login 
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)

        // create token
        const token = createToken(user._id)
        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    // res.json({mssg: "login user"})
}

// user signup
const signupUser = async (req, res ) => {
    const {email, password} = req.body

    try {
        const user = await User.signup(email, password)
        // create token
        const token = createToken(user._id)

        res.status(200).json({email, token})

    } catch(err){
        res.status(400).json({error: err.message})
    }
    // res.json({mssg: "signup user"}) // mssg that we use in teh begining
}   

module.exports = {
    loginUser, 
    signupUser
}