import axios from 'axios';

// Backend API URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://your-vercel-backend-url.vercel.app';

// Kullanıcı kaydetme
export const registerUser = async (name, surname, email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/register`, {
      name,
      surname,
      email,
      password,
    });
    return response.data; // Başarılı yanıtı döndür
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Kayıt sırasında hata oluştu');
  }
};

// Kullanıcı girişi
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/login`, { email, password });
    return response.data; // Başarılı yanıtı döndür
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Giriş sırasında hata oluştu');
  }
};

// Sepet oluşturma
export const createCart = async (cartData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/carts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartData),
    });
    return await response.json();
  } catch (error) {
    throw new Error('Sepet oluşturulurken bir hata oluştu');
  }
};

// Sepeti ID ile getirme
export const getCartById = async (cartId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/cart/${cartId}`);
    return response.data; // Başarılı yanıtı döndür
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Sepeti getirirken hata oluştu');
  }
};
