const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDb connected successfully");
  } catch (e) {
    console.log("MongoDb connection failed", e);
    process.exit(1);
  }
};
module.exports = connectDb;
