import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/product';
import { productApi } from '../../api/productHandlers';


export interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
}

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedProduct(state, action: PayloadAction<Product>) {
      state.selectedProduct = action.payload;
    },
    clearSelectedProduct(state) {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      productApi.endpoints.getProducts.matchFulfilled,
      (state, { payload }) => {
        state.products = payload.products;
      }
    );
    builder.addMatcher(
      productApi.endpoints.getProductById.matchFulfilled,
      (state, { payload }) => {
        state.selectedProduct = payload;
      }
    );
  },
});

export const { setSelectedProduct, clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;