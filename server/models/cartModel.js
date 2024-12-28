const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true
  },
  items: [{
    productName: { 
      type: String, 
      required: true 
    },
    productImage: { 
      type: String,
      required: true 
    },
    description: { 
      type: String,
      default: '' 
    },
    quantity: { 
      type: Number, 
      required: true,
      min: 1 
    },
    purchased: { 
      type: Boolean, 
      default: false 
    }
  }],
  totalItems: { 
    type: Number, 
    required: true 
  },
  totalQuantity: { 
    type: Number, 
    required: true 
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Cart', cartSchema);
