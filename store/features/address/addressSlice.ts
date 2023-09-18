import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface addressState {
  address: string;
  city: string;
  state: string;
  address2:string;
  unitNumber:boolean;

}

const initialState: addressState = {
  address: "",
  city: "",
  state:"",
  address2:"",
  unitNumber:false,
 
};

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    fetchAddress: (state, action: PayloadAction<addressState>) => {
      state.address = action.payload.address;
      state.city = action.payload.city;
      state.state = action.payload.state;
      state.address2 = action.payload.address2;
      state.unitNumber=action.payload.unitNumber;
   
    },
    
  },
});

// Action creators are generated for each case reducer function
export const { fetchAddress } = addressSlice.actions;

export const addressReducer = addressSlice.reducer;
