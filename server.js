require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts.js");
const userRoutes = require("./routes/user")


// express app 
const app = express();


//========== MIDDLEWARE =========
app.use(express.json()) // if any request comes in, it looks for the body and pass it to the req object
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()
})

// ======= ROUTS ======
// app.get("/", (req ,res) => {
//     res.json({mssg: "Welcome to the app"})
// })
app.use("/api/workouts", workoutRoutes) // hit workoutRoutes only if pass /api/workouts
app.use("/api/user", userRoutes)

// connect to DB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    // listen for request 
    app.listen(process.env.PORT, () => { //listening requests only if we connected to the database
        console.log("Connected to DB & Listening on Port", process.env.PORT)
    })
})
.catch(err => console.log(err))

// // listen for request 
// app.listen(process.env.PORT, () => {
//     console.log("Listening on Port", process.env.PORT)
// })