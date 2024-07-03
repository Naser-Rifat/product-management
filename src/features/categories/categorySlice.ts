import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { categoryApi } from '../../api/categoryHandlers';

interface CategoryState {
  categories: string[];
  selectedCategory: string | null;
}

const initialState: CategoryState = {
  categories: [],
  selectedCategory: null,
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setSelectedCategory(state, action: PayloadAction<string>) {
      state.selectedCategory = action.payload;
    },
    clearSelectedCategory(state) {
      state.selectedCategory = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      categoryApi.endpoints.getCategories.matchFulfilled,
      (state, { payload }) => {
        state.categories = payload;
      }
    );
  },
});

export const { setSelectedCategory, clearSelectedCategory } = categorySlice.actions;
export default categorySlice.reducer;
export type { CategoryState };  // Explicitly export CategoryState
