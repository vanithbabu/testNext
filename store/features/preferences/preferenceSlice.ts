import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface PreferenceState {
    delivery_loc: string;
    delivery_notes: string;
}

const initialState: PreferenceState = {

    delivery_loc: "",
    delivery_notes:"",

};

export const preferenceSlice = createSlice({
  name: "preference",
  initialState,
  reducers: {
    fetchPreference: (state, action: PayloadAction<PreferenceState>) => {
      state.delivery_loc = action.payload.delivery_loc;
      state.delivery_notes = action.payload.delivery_notes;
   
    },
    
  },
});

// Action creators are generated for each case reducer function
export const { fetchPreference } = preferenceSlice.actions;

export const preferenceReducer = preferenceSlice.reducer;
