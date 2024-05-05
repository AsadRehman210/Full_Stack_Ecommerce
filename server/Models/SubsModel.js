const mongoose = require("mongoose");

const SubsSchema = new mongoose.Schema({
    email:{
        type: String,
        required:true
    }
});

const Subscriber = new mongoose.model("SUBSCRIBER", SubsSchema)
module.exports = Subscriber;