import product from "../models/product.js";
import { validationResult } from 'express-validator';

export async function addOneProduct(req, res) {
    console.log("Product added seccuffuly");
   if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ errors: validationResult(req).array() });
    }else{
    const newProduct = new product();
    
    newProduct.name= req.body.name;
    newProduct.description = req.body.description;
    newProduct.prix = req.body.prix;
    newProduct.image = `${req.protocol}://${req.get("host")}/image/${req.file.filename}`;
    newProduct.availability = req.body.availability;
  
    newProduct.save();
    
  
    res.status(201).send({ newProduct });
  }};


  export function getAllProduct(req, res) {
    product
      .find()
      .then((docs) => {
        res.status(200).json(docs);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }

  export function getProductsByAvailability(req, res) {
    product
      .find({ availability: req.params.availability })
      .then((docs) => {
        res.status(200).json(docs);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }


  export async function deleteProductByID(req, res, next) {
    try {
      //const restaurantId = req.params.restaurentId;
      //const menuId = req.params.menuId;
      const productId = req.params.productId;


      if ( !(await product.findById(productId)) ) {
        return res.status(404).json({ error: 'product or Menu not found' });
      }
  
      // Find and delete the plat
      const deletedProduct = await product.findOneAndDelete({ productId: productId });
      if (!deletedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      // Construct the response JSON object
      const response = {
        productId: productId,
        _id: deletedProduct._id
      };
  
      return res.status(200).json(response); // Return the response JSON
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }



  export async function updateProduct(req, res, next) {
    try {
      const existingProduct = await product.findById(req.params.id);
      if (!existingProduct) {
        return res.status(404).json({ message: 'Menu not found' });
      }

      const updateProduct = await product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true    })
      res.status(200).json({ updateProduct: updateProduct });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

