const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/todos");
        console.log("Connected to Mongo DB Database");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;