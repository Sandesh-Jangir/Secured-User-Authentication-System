const mongoose = require("mongoose")
const mongoURI = "mongodb://localhost:27017/UserAuth-System"

// Perparing for change in mongoose 7.
mongoose.set('strictQuery', false)

const connectToMongo = async ()=>{
    await mongoose.connect(mongoURI)
    console.log("Connected to MongoDB.")
}

module.exports = connectToMongo;