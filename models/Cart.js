const { Schema, model } = require("mongoose");
const cartSchema = new Schema({
  owner: {
    type: String,
  },
  products: {
    type: Array,
    default: [],
  },
  _id: {},
});

module.exports = model("Carts", cartSchema);
