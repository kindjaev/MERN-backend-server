const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})

// ===== STATIC signup MODEL ======
userSchema.statics.signup = async function(email, password) { // can't use arrorw function id we have this
    // validation 
    if(!email || !password){
        throw Error("All fields must be filled")
    }
    if(!validator.isEmail(email)){
        throw Error("Email is not valid")
    }
    if(!validator.isStrongPassword(password)){
        throw Error("Password is not strong enough. There must be at least 8 characters, 1 number, 1 uppercase letter, and 1 symbol")
    }

    const exists = await this.findOne({email})
    if(exists){
        throw Error("Email already in use!")
    }

    const saltRounds = 10
    const salt = await bcrypt.genSalt(saltRounds)
    const hash = await bcrypt.hash(password , salt)

    const user = await this.create({email, password: hash})

    return user
}

// static login model
userSchema.statics.login = async function (email, password){
    // validation
    if(!email || !password){
        throw Error("All Fields must be filled")
    }

    const user = await this.findOne({email})
    if(!user){
        throw Error("Incorrect email")
    }

    const match = await bcrypt.compare(password, user.password)
    if(!match){
        throw Error("Incorrect password")
    }

    return user
}

module.exports = mongoose.model('User', userSchema)