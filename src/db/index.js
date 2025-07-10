const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {});
    console.log("Database connected successfuly");
  } catch (e) {
    console.log("Database connection attempt failed");
    console.log(e.message);
  }
};

module.exports = connectDB;
