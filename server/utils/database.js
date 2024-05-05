const mongoose = require("mongoose");

const URL = process.env.MONG_URL

const connectDB = async ()=>{
    try {
        await mongoose.connect(URL)
        
    } catch (error) {
        console.log(`DataBase Connection Failed ${error}`)
        process.exit(0)
    }

}
module.exports = connectDB;