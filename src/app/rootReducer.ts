import { combineReducers } from '@reduxjs/toolkit';
import productReducer from '../features/products/productSlice';
import { productApi } from '../api/productHandlers';

const rootReducer = combineReducers({
  [productApi.reducerPath]: productApi.reducer,
  products: productReducer,
});

export default rootReducer;
