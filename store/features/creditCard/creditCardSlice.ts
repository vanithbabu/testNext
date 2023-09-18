import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state
export interface CreditCardState {
  cards: any[]; // Replace 'any' with the actual type of your credit card objects
}

const initialState: CreditCardState = {
  cards: [],
};

// Create the creditCardSlice
export const creditCardSlice = createSlice({
  name: "creditCards",
  initialState,
  reducers: {
    // Define a reducer to update the credit card state
    fetchCreditCard: (state, action: PayloadAction<any[]>) => {
      state.cards = action.payload;
    },
  },
});

// Export the action creators
export const { fetchCreditCard } = creditCardSlice.actions;

// Export the reducer
export const creditCardReducer = creditCardSlice.reducer;
