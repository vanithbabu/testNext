import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface selectedDateState {
  pickupDate: string;
  deliveryDate:string;
}

const initialState: selectedDateState = {

  pickupDate: '',
  deliveryDate: '',

};

export const selectedDateSlice = createSlice({
  name: "selectedDate",
  initialState,
  reducers: {
    fetchselectedDate: (state, action: PayloadAction<selectedDateState>) => {

      state.pickupDate = action.payload.pickupDate;
      state.deliveryDate = action.payload.deliveryDate;
    },
    
  },
});

// Action creators are generated for each case reducer function
export const { fetchselectedDate } = selectedDateSlice.actions;

export const selectedDateReducer = selectedDateSlice.reducer;
