import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.info(`${action.payload.name} added again to bag`, {
          position: 'bottom-left',
          autoClose: 3000,
        });
      } else {
        const tempItem = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempItem);
        toast.success(`${action.payload.name} added to bag`, {
          position: 'bottom-left',
          autoClose: 3000,
        });
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    removeFromCart(state, action) {
      const restCartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );

      state.cartItems = restCartItems;
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));

      toast.warning(`${action.payload.name} removed from bag`, {
        position: 'bottom-left',
        autoClose: 3000,
      });
    },

    decreaseCartItem(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
        toast.warning(`${action.payload.name} removed from bag`, {
          position: 'bottom-left',
          autoClose: 3000,
        });
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const restCartItems = state.cartItems.filter(
          (item) => item._id !== action.payload._id
        );
        state.cartItems = restCartItems;
        toast.warning(`${action.payload.name} removed from bag`, {
          position: 'bottom-left',
          autoClose: 3000,
        });
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    clearCart(state, action) {
      state.cartItems = [];

      toast.warning('Bag Empty', {
        position: 'bottom-left',
        autoClose: 3000,
      });

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    getTotals(state, action) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        { total: 0, quantity: 0 }
      );

      state.cartTotalAmount = total;
      state.cartTotalQuantity = quantity;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  decreaseCartItem,
  clearCart,
  getTotals,
} = cartSlice.actions;

export default cartSlice.reducer;
