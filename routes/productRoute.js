// routes/productRoute.js
const express = require("express");
const route = express.Router();
const ProductController = require("../controllers/ProductController");

route.get("/homedisplay", ProductController.homeDisplay);
route.get("/productdisplay", ProductController.productDisplay);
route.get("/search", ProductController.searchProducts);
route.get("/male", ProductController.getMaleProducts);
route.get("/female", ProductController.getFemaleProducts);
route.get("/kids", ProductController.getKidsProducts);
route.get("/sale", ProductController.getSaleProducts);

module.exports = route;