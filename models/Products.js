const { Schema, model } = require("mongoose");
const productSchema = new Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  stock: {
    type: Number,
  },
  description: {
    type: String,
  },
  img: {
    type: String,
  },
  category: {
    type: String,
  },
});

module.exports = model("Products", productSchema);
