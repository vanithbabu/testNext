import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface schedulingState {
  storeId: number;
  address_id: number;
  pickupDate:string[];
  deliverydDate:string[];
}

const initialState: schedulingState = {

  storeId: 0,
  address_id: 0,
  pickupDate:[],
  deliverydDate:[],

};

export const schedulingSlice = createSlice({
  name: "scheduling",
  initialState,
  reducers: {
    fetchscheduling: (state, action: PayloadAction<schedulingState>) => {
      state.storeId = action.payload.storeId;
      state.address_id = action.payload.address_id;
      state.pickupDate = action.payload.pickupDate;
      state.deliverydDate = action.payload.deliverydDate;
    },
    
  },
});

// Action creators are generated for each case reducer function
export const { fetchscheduling } = schedulingSlice.actions;

export const schedulingReducer = schedulingSlice.reducer;
