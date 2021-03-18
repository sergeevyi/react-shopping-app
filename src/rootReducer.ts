import { combineReducers } from '@reduxjs/toolkit';
import { productsSlice } from './features/products/productsSlice';
import store from './store';

const rootReducer = combineReducers({ products: productsSlice.reducer });
export type RootState = ReturnType<typeof store.getState>;

export default rootReducer;
