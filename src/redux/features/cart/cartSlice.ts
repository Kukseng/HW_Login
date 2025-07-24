

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";
import { CartProductType } from "@/lib/CartProductType";

const initialState = {
	products: [] as CartProductType[],
	totalPrice: 0,
	count: 0
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<CartProductType>) => {
			state.products.push(action.payload);
			state.totalPrice += action.payload.price;
			state.count +=1
		},
		removeFromCart: (state, action: PayloadAction<string>) => {
            // find product by id
            const product = state.products.find((product) => product.id === action.payload);

            state.totalPrice -= product?.price || 0;
			state.count -=1

			state.products = state.products.filter(
				(product) => product.id !== action.payload
			);
		},
	},
});

// export actions
export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;

// create selector
export const selectProducts = (state: RootState) => state.cart.products;
export const selectTotalPrice = (state: RootState) => state.cart.totalPrice;
export const selectCounter = (state:RootState) => state.cart.count
