const ProductModel = require("../models/productModel")

const homeDisplay = async(req, res)=>{
     const Product = await ProductModel.find();

    


     res.status(200).send(Product);
    
}

const productDisplay=async(req, res)=>{
    const {id} = req.query;
    const Product = await ProductModel.findById(id);
    res.status(200).send(Product);
    
}




const searchProducts = async (req, res) => {
  try {
    const q = req.query.q || "";
    const minPrice = parseFloat(req.query.minPrice) || 0;
    const maxPrice = parseFloat(req.query.maxPrice) || Number.MAX_SAFE_INTEGER;

    const keywords = q.trim().toLowerCase().split(/\s+/);

    // Match keywords in name, description, and exact match for category
    const orConditions = keywords.flatMap(keyword => [
      { name: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
      { category: { $regex: `^${keyword}$`, $options: "i" } } // exact match for category
    ]);

    const result = await ProductModel.find({
      $and: [
        { $or: orConditions },
        { price: { $gte: minPrice, $lte: maxPrice } }
      ]
    });

    res.status(200).json(result);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Search failed" });
  }
};




const getMaleProducts = async (req, res) => {
  try {
    const products = await ProductModel.find({ category: "male" });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getFemaleProducts = async (req, res) => {
  try {
    const products = await ProductModel.find({ category: "female" });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getKidsProducts = async (req, res) => {
  try {
    const products = await ProductModel.find({ category: "kids" });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};





const getSaleProducts = async (req, res) => {
  try {
    const products = await ProductModel.find({ 
      $or: [
        { category: "sale" },
        { discountPercentage: { $gt: 0 } }
      ]
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};







module.exports={
    homeDisplay,
    productDisplay,
    searchProducts,
    getMaleProducts,
    getFemaleProducts,
    getKidsProducts,

getSaleProducts,


   
}