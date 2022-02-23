const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Atlas connected successfully!");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
module.exports = connectDB;
