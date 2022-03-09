const express = require("express");
const router = express.Router();
const isAuthenticatedUser = require("../utils/logged");

const {
  getProductsController,
  getCartController,
  updateCartController,
  deleteCartController,
  checkoutController,
} = require("../controllers/products.controller");

router.get("/products", getProductsController);

router.get("/cart", isAuthenticatedUser, getCartController);
router.put("/cart", isAuthenticatedUser, updateCartController);
router.delete("/cart", isAuthenticatedUser, deleteCartController);

router.post("/checkout", isAuthenticatedUser, checkoutController); // isAuthenticatedUser test this
module.exports = router;
