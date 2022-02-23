const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  avatar: {
    type: String,
    required: false,
    default:
      "https://res.cloudinary.com/worldseed/image/upload/v1626727116/sdr2ixqmzj7pnoikray0.png",
  },
  isAdmin: {
    type: Boolean,
    required: false,
    default: false,
  },

  _id: {},
});

// Return JWT
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

// Compare User Password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = model("User", userSchema);
