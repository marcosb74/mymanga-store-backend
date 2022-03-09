const {
  getProductsService,
  getCartService,
  updateCartService,
  deleteCartService,
  checkoutService,
} = require("../services/products.service");

function getProductsController(req, res) {
  const resolve = getProductsService(req, res);
  return resolve;
}

function getCartController(req, res) {
  const resolve = getCartService(req, res);
  return resolve;
}

function updateCartController(req, res) {
  const resolve = updateCartService(req, res);
  return resolve;
}

function deleteCartController(req, res) {
  const resolve = deleteCartService(req, res);
  return resolve;
}

function checkoutController(req, res) {
  const resolve = checkoutService(req, res);
  return resolve;
}

module.exports = {
  getProductsController,
  getCartController,
  updateCartController,
  deleteCartController,
  checkoutController,
};
