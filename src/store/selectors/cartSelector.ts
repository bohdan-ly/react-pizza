const selectCart = (state) => ({ ...state.cart });

const selectCartItemById = (id) => (state) => ({
  item: state.cart.items.find((el) => el.id === id),
});

export { selectCart, selectCartItemById };
