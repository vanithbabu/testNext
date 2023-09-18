import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface createUserState {
  first_name: string;
  last_name: string;
  email:string;
  phone:string;
  id:number;

}

const initialState: createUserState = {
id:0,
first_name: "",
last_name: "",
email:"",
phone:"",

};

export const createUserSlice = createSlice({
  name: "createUser",
  initialState,
  reducers: {
    fetchUser: (state, action: PayloadAction<createUserState>) => {
      state.first_name = action.payload.first_name;
      state.id = action.payload.id;
      state.last_name = action.payload.last_name;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
    },
    
  },
});

// Action creators are generated for each case reducer function
export const { fetchUser } = createUserSlice.actions;

export const createUserReducer = createUserSlice.reducer;
