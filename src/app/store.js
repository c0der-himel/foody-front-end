import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import cartReducer from '../features/cartSlice';
import { menuApi } from '../services/menuApi';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [menuApi.reducerPath]: menuApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(menuApi.middleware),
});

setupListeners(store.dispatch);
