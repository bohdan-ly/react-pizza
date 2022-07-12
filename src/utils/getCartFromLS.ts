import { calcTotalPrice } from './calcTotalPrice';

const getCartFromLs = () => {
  const cart = localStorage.getItem('cart');
  const items = cart ? JSON.parse(cart) : { totalPrice: 0, items: [] };
  const totalPrice = calcTotalPrice(items);

  return {
    totalPrice,
    items,
  };
};

export default getCartFromLs;
