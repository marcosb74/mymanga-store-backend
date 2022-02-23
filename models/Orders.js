const { Schema, model } = require("mongoose");
const orderSchema = new Schema({
  _id: {},

  products: {
    type: Array,
    default: [],
  },
  total: {
    type: Number,
  },
  name: {
    type: String,
  },
  lastname: {
    type: String,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  country: {
    type: String,
  },
});

module.exports = model("Orders", orderSchema);
