const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    work:{
        type: String,
        required:true
    }
});

const User = new mongoose.model("user", UserSchema);
module.exports = User;