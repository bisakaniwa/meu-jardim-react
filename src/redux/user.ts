import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReduxApp, ReduxUser, UserTokenInfo } from "../interfaces/ReduxInterfaces";

export const appInitialState: ReduxApp = {
   userData: {} as ReduxUser,
   userToken: {
      currentToken: "",
      expirationTime: "",
      isExpired: false,
   } as UserTokenInfo,
   isLoggedIn: false,
   isLoading: false,
   error: false,
};

const userSlice = createSlice({
   name: 'user',
   initialState: appInitialState,
   reducers: {
      actionStarted: (state) => {
         state.isLoading = true;
      },
      actionFinished: (state) => {
         state.isLoading = false;
      },
      saveUserData: (state, action: PayloadAction<ReduxUser>) => {
         state.userData = action.payload;
      },
      saveUserToken: (state, action: PayloadAction<UserTokenInfo>) => {
         state.userToken = action.payload;
      },
      changeLoginState: (state, action: PayloadAction<boolean>) => {
         state.isLoggedIn = action.payload;
      },
      clearOnLogout: (state, action: PayloadAction<ReduxApp>) => {
         state.userData = action.payload.userData;
         state.userToken = action.payload.userToken;
         state.isLoggedIn = action.payload.isLoggedIn;
      },
   }
})

export const {
   actionStarted, actionFinished, saveUserData, saveUserToken, changeLoginState, clearOnLogout
} = userSlice.actions;

export default userSlice.reducer;
