import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  state: null,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {},
});

export default menuSlice.reducer;
