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


  // export async function updateProduct(req, res, next) {
  //   const productId = req.params.id
  //   console.log(productId)
  //   const existingProduct= await product.findById(productId);
   
  
  //   if (!existingProduct) {
  //     return res.status(404).json({ message: 'product not found' });
  //   }
  //    console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
  //   console.log(existingProduct);
  //   if (req.body.name) {
  //     existingProduct.name = req.body.name;
  //   }
  //   if (req.body.description) {
  //     existingProduct.description = req.body.description;
  //   }
  //   if (req.body.prix) {
  //     existingProduct.prix = req.body.prix;
  //   }
  //   if (req.body.availability) {
  //     existingProduct.availability = req.body.availability;
  //   }
  //   if (req.body.image) {
  //     existingProduct.image = req.body.image;
  //   }
  
  //   const Productupdate = await existingProduct.save();
  //   await existingProduct.save()
  //     .then(prod => res.status(200).json({ updateProduct: Productupdate }))
  //     .catch(error => res.status(400).json({ error }));
  // }


  export async function updateProduct(req, res) {
    if (!validationResult(req).isEmpty()) {
        return res.status(500).json({ errors: validationResult(req).array() });
    }else{
      const productId = req.params.id;
    let found = await product.findOneAndModify({ _id: req.params.id })
    console.log(found)

    let product = await product.findById({ _id: req.params.id }
    
    );

    return res.status(200).send({ product,found, message: "Success: match Is Updated" });

    }
};

