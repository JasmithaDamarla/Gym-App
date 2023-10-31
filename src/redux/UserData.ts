import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./Store";

interface UserDataState {
  userName: string;
  userType: string;
}

const initialState: UserDataState = {
  userName: "",
  userType: "",
};

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      console.log('setUserName action dispatched:', action);
      state.userName = action.payload;
    },
    setUserType: (state, action: PayloadAction<string>) => {
      console.log('setUserType action dispatched:', action);
      state.userType = action.payload;
    },
    removeUserName : (state) =>{
      state.userName='';
    },
    removeUserType : (state) =>{
      state.userType='';
    }
  },
});

export const { setUserName, setUserType,removeUserName,removeUserType } = userDataSlice.actions;

export const selectUserName = (state: RootState) => state.userData.userName;
export const selectUserType = (state: RootState) => state.userData.userType;

export default userDataSlice.reducer;
