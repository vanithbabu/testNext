import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state
export interface OrderState {
  orders: any[]; // Replace 'any' with the actual type of your credit card objects
}

const initialState: OrderState = {
  orders: [],
};

// Create the orderSlice
export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    // Define a reducer to update the credit card state
    fetchOrder: (state, action: PayloadAction<any[]>) => {
      state.orders = action.payload;
    },
  },
});

// Export the action creators
export const { fetchOrder } = orderSlice.actions;

// Export the reducer
export const orderReducer = orderSlice.reducer;
