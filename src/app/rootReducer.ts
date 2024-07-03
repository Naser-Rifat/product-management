import { combineReducers } from '@reduxjs/toolkit';
import productReducer from '../features/products/productSlice';
import categoryReducer from '../features/categories/categorySlice';
import { productApi } from '../api/productHandlers';
import { categoryApi } from '../api/categoryHandlers';

const rootReducer = combineReducers({
  [productApi.reducerPath]: productApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  products: productReducer,
  categories:categoryReducer ,
});

export default rootReducer;
