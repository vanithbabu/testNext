import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface frequencyState {
frequencyId: number;
}

const initialState: frequencyState = {

  frequencyId: 3,

};

export const frequencySlice = createSlice({
  name: "frequency",
  initialState,
  reducers: {
    fetchFrequency: (state, action: PayloadAction<frequencyState>) => {
        return action.payload;
    },
    
  },
});

// Action creators are generated for each case reducer function
export const { fetchFrequency } = frequencySlice.actions;

export const frequencyReducer = frequencySlice.reducer;
