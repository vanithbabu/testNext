import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IAuthState {
  isAuth: boolean;
  token: string;
  userID: number;
  userType:number;
}

const initialState: IAuthState = {
  isAuth: false,
  token: "",
  userID:0,
  userType:1,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<IAuthState>) => {
      state.isAuth = action.payload.isAuth;
      state.token = action.payload.token;
      state.userID = action.payload.userID;
      state.userType = action.payload.userType;
    },
    
  },
});

// Action creators are generated for each case reducer function
export const { setLogin } = authSlice.actions;

export const authReducer = authSlice.reducer;
