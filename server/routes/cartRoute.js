const express = require('express');
const router = express.Router();
const Cart = require('../models/cartModel');
const mongoose = require('mongoose');

router.post('/carts', async (req, res) => {
  try {
    const cart = new Cart({
      cartId: req.body.cartId || new mongoose.Types.ObjectId(),
      items: req.body.items.map(item => ({
        productName: item.productName,
        productImage: item.productImage,
        description: item.description,
        quantity: item.quantity,
        purchased: item.purchased
      })),
      totalItems: req.body.totalItems,
      totalQuantity: req.body.totalQuantity
    });

    const savedCart = await cart.save();
    res.status(201).json({ 
      success: true, 
      cartId: savedCart.cartId,
      message: 'Sepet başarıyla kaydedildi'
    });
  } catch (error) {
    console.error('Cart creation error:', error);
    res.status(500).json({ error: 'Sepet oluşturulurken bir hata oluştu' });
  }
});

router.get('/carts/:id', async (req, res) => {
  try {
    const cart = await Cart.findOne({ cartId: req.params.id });
    if (!cart) {
      return res.status(404).json({ error: 'Sepet bulunamadı' });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Sepet getirilirken bir hata oluştu' });
  }
});

module.exports = router;
