import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/product";

interface ProductState {
  products: Product[];
  deletedProducts: Product[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
}

const initialState: ProductState = {
  products: [],
  deletedProducts: [],
  isLoading: false,
  error: null,
  searchQuery: "",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // setProducts: (state, action: PayloadAction<Product[]>) => {
    //   state.products = action.payload;
    //   state.error = null;
    // },
    // addProduct: (state, action: PayloadAction<Product>) => {
    //   state.products.push(action.payload);
    // },
    // updateProduct: (state, action: PayloadAction<Product>) => {
    //   const index = state.products.findIndex((p) => p.id === action.payload.id);
    //   if (index !== -1) {
    //     state.products[index] = action.payload;
    //   }
    // },
    deleteProduct: (state, action: PayloadAction<Product>) => {
      state.deletedProducts.push(action.payload);
      // state.deletedProducts = [...state.deletedProducts, ...state.products.filter((p) => p.id === action.payload)];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  // setProducts,
  // addProduct,
  // updateProduct,
  deleteProduct,
  setLoading,
  setError,
  clearError,
} = productSlice.actions;

export default productSlice.reducer;


