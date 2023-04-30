const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String
    },
    hashValue:{
        required: true,
        type: String
    },
    socketId:{
        required: true,
        type: String
    },
    score:{
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model("User",userSchema);