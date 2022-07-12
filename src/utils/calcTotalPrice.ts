import { CartItem } from '@store/cart/types';

export const calcTotalPrice = (items: CartItem[]) => {
  return items.reduce((a, v) => {
    const itemTotalPrice = v.count * v.price;
    return a + itemTotalPrice;
  }, 0);
};
