const Cart = require('../models/cartModel');

// Sepeti oluştur ve kaydet
exports.createCart = async (req, res) => {
  try {
    const { items, totalItems, totalQuantity } = req.body;
    const newCart = new Cart({ items, totalItems, totalQuantity });
    await newCart.save();
    res.status(201).json({ success: true, cartId: newCart._id });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Cart creation failed', error });
  }
};

// Sepeti ID ile getir
exports.getCartById = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }
    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch cart', error });
  }
};
