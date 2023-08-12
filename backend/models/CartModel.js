const mongoose = require("mongoose");

// const imageSchema = new mongoose.Schema({
//     public_id: {
//       String,
//       required: [true, "image public id not available"] 
//     },
//     url: {
//       String,
//       required: [true, 'image url not available']
//     },
//     id: {
//       String,
//     required: [true, 'image id not available']
//   }
// });

const cartSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, "Please enter your product name"],
  },
  productPrice: {
    type: Number,
    required: [true, "Please enter your product price"],
  },
  productImage: {
    type: String,
    required: [true, "Please enter your product image"],
  },
  quantity: {
    type: Number,
    required: [true, "Please enter your product quantity"],
  },
  userId: {
    type: String,
    required: [true, "Please enter your user id"],
  },
  productId: {
    type: String,
    required: [true, "Please enter your user id"],
  },
  Stock: {
    type: Number,
    required: [true, "Please enter your product stock"],
  }
});

module.exports = mongoose.model("Cart", cartSchema);
