import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ProfileState {
  first_name: string;
  last_name: string;
  email:string;
  phone:string;
  address_services:object;
  user_orders:object;
  address_time_slot:object;
}

const initialState: ProfileState = {
first_name: "",
last_name: "",
email:"",
phone:"",
address_services:{},
user_orders:{},
address_time_slot:{},
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    fetchProfile: (state, action: PayloadAction<ProfileState>) => {
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.address_services = action.payload.address_services;
      state.user_orders = action.payload.user_orders;
      state.address_time_slot = action.payload.address_time_slot;
    },
    
  },
});

// Action creators are generated for each case reducer function
export const { fetchProfile } = profileSlice.actions;

export const profileReducer = profileSlice.reducer;
