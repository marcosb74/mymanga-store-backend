const express = require("express");
const auth = require("./auth.route");
const products = require("./products.route");
const router = express.Router();

router.use("/auth", auth);
router.use("/listing", products);

module.exports = router;
