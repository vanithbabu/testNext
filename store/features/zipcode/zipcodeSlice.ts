import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface zipcodeState {
zipcode: number;
available_services:any;
}

const initialState: zipcodeState = {

  zipcode: 0,
  available_services:[]

};

export const zipcodeSlice = createSlice({
  name: "zipcode",
  initialState,
  reducers: {
    fetchzipcode: (state, action: PayloadAction<zipcodeState>) => {
      state.zipcode =action.payload.zipcode;
      state.available_services =action.payload.available_services;
    },
    
  },
});

// Action creators are generated for each case reducer function
export const { fetchzipcode } = zipcodeSlice.actions;

export const zipcodeReducer = zipcodeSlice.reducer;
