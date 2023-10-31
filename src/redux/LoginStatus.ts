import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./Store";

interface LoginStatusState {
  isLogIn: boolean;
}

const initialState: LoginStatusState = {
  isLogIn: false,
};

const loginStatusSlice = createSlice({
  name: "loginStatus",
  initialState,
  reducers: {
    login: (state) => {
      state.isLogIn = true;
    },
    logout: (state) => {
      state.isLogIn = false;
    },
  },
});

export const { login, logout } = loginStatusSlice.actions;

export const selectIsLogIn = (state: RootState) => state.loginStatus.isLogIn;

export default loginStatusSlice.reducer;
