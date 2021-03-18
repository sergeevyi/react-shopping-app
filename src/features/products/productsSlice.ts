import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppThunk } from '../../store';
import { RootState } from '../../rootReducer';

export type Product = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

export interface ProductsState {
  products: Product[];
  loading: boolean;
  errors: string;
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  errors: ''
};

export const getProductsList = (): AppThunk => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const baseURL = 'https://fakestoreapi.com';
      const res = await axios.get(`${baseURL}/products`);
      dispatch(setLoading(false));
      dispatch(setProducts(res.data));
    } catch (error) {
      dispatch(setErrors(error));
      dispatch(setLoading(false));
    }
  };
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },
    setErrors: (state, { payload }: PayloadAction<string>) => {
      state.errors = payload;
    },
    setProducts: (state, { payload }: PayloadAction<Product[]>) => {
      console.log(payload);
      state.products = payload;
    },
    addProduct: (state, { payload }: PayloadAction<Product>) => {
      state.products = [payload, ...state.products];
    },
    removeProduct: (state, { payload }: PayloadAction<number>) => {
      console.log(state.products);
      state.products = state.products.filter(
        (product) => product.id !== payload
      );
    }
  }
});

export const {
  setLoading,
  setErrors,
  setProducts,
  addProduct,
  removeProduct
} = productsSlice.actions;

export const productSelector = (state: RootState) => {
  return state.products;
};
export default productsSlice.reducer;
