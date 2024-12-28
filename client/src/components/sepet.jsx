import React, { useState, useEffect } from 'react';
import { FaTimes, FaWhatsapp } from 'react-icons/fa';
import { createCart } from '../services/api'; // Bağlantıyı içe aktar
import '../styles/sepet.css';

const Sepet = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState('');
  const [shareableLink, setShareableLink] = useState('');

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart.map(item => ({ ...item, Adet: item.Adet || 1, Alındı: false, Açıklama: '' })));
  }, []);

  const handleSaveCart = async () => {
    const totalItems = cartItems.length;
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.Adet, 0);

    try {
      const cartData = {
        items: cartItems.map(item => ({
          productName: item['Ürün Adı'],
          productImage: item['Resim URL'],
          description: item.Açıklama || '',
          quantity: item.Adet,
          purchased: item.Alındı || false,
        })),
        totalItems,
        totalQuantity,
      };

      const response = await createCart(cartData);
      
      if (response.success) {
        setCartId(response.cartId);
        localStorage.setItem('currentCartId', response.cartId);
        const shareLink = `${window.location.origin}/sepet/${response.cartId}`;
        setShareableLink(shareLink);
        alert(`Sepet başarıyla kaydedildi! Sepet ID: ${response.cartId}`);
      }
    } catch (error) {
      alert('Sepeti kaydederken bir hata oluştu: ' + error.message);
    }
  };

  const updateItem = (index, updates) => {
    setCartItems(cartItems.map((item, i) => (i === index ? { ...item, ...updates } : item)));
  };

  const calculateTotals = () => {
    const totalUniqueItems = cartItems.length;
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.Adet, 0);
    const purchasedItems = cartItems.filter(item => item.Alındı).length;
    
    return { totalUniqueItems, totalQuantity, purchasedItems };
  };

  const shareOnWhatsApp = () => {
    const message = encodeURIComponent(`Alışveriş listem: ${shareableLink}`);
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  return (
    <div className="sepet-container">
      <h1>Sepetiniz</h1>
      {cartItems.length > 0 ? (
        <div className="cart-list">
          {cartItems.map((product, index) => (
            <div key={index} className="cart-item">
              <img
                src={product['Resim URL']}
                alt={product['Ürün Adı']}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h3>{product['Ürün Adı']}</h3>
                <p>Miktar: {product['Adet']}</p>
                <div className="quantity-buttons">
                  <button
                    onClick={() =>
                      updateItem(index, { Adet: Math.max(product.Adet - 1, 1) })
                    }
                  >
                    -
                  </button>
                  <button onClick={() => updateItem(index, { Adet: product.Adet + 1 })}>
                    +
                  </button>
                </div>
                <textarea
                  placeholder="Açıklama ekleyin..."
                  value={product.Açıklama}
                  onChange={(e) => updateItem(index, { Açıklama: e.target.value })}
                  className="item-description"
                />
              </div>
              <div className="item-actions">
                <FaTimes
                  className="remove-item-icon"
                  onClick={() => setCartItems(cartItems.filter((_, i) => i !== index))}
                />
                <input
                  type="checkbox"
                  checked={product.Alındı}
                  onChange={() => updateItem(index, { Alındı: !product.Alındı })}
                  className="item-purchased-checkbox"
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Sepetinizde ürün bulunmamaktadır.</p>
      )}

      <div className="cart-summary">
        <h3>Sepet Özeti</h3>
        <div className="summary-details">
          <p>Sepetteki Farklı Ürün Sayısı: <span>{calculateTotals().totalUniqueItems}</span></p>
          <p>Toplam Ürün Adedi: <span>{calculateTotals().totalQuantity}</span></p>
          <p>Alındı İşaretlenen Ürün: <span>{calculateTotals().purchasedItems}</span></p>
        </div>
      </div>

      <button className="save-cart-button" onClick={handleSaveCart}>
        Sepeti Kaydet
      </button>

      {shareableLink && (
        <div className="share-section">
          <div className="share-link">
            <input 
              type="text" 
              value={shareableLink} 
              readOnly 
              className="share-link-input"
            />
            <button 
              className="copy-link-button"
              onClick={() => {
                navigator.clipboard.writeText(shareableLink);
                alert('Link kopyalandı!');
              }}
            >
              Linki Kopyala
            </button>
          </div>
          <button 
            className="whatsapp-share-button"
            onClick={shareOnWhatsApp}
          >
            <FaWhatsapp /> WhatsApp'ta Paylaş
          </button>
        </div>
      )}

      {cartId && <p>Sepet ID: {cartId}</p>}
    </div>
  );
};

export default Sepet;
