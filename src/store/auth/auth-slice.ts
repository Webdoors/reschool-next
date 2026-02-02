import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../models/userModel";

const initialSettingsState: {
  LoggedIn: boolean;
  token?: string;
  user: User | null;
  loading: boolean;
  error: string;
  showRegistrationModal: boolean;
  userUpdateSuccess: boolean;
  showUpdateModal: boolean;
  c_token: string
} = { LoggedIn: false, user: null, userUpdateSuccess: false, loading: false, showRegistrationModal: false, showUpdateModal: false, error: "", c_token: '' };
const AuthSlice = createSlice({
  name: "settings",
  initialState: initialSettingsState,
  reducers: {
    authenticationInProgress(state) {
      state.loading = true;
    },
    authenticationSuccess(state, action: { payload: any }) {
    
      if(action.payload.user){
        state.user = action.payload.user;
        state.loading = false;
        state.LoggedIn = true;
        state.error =''

      
      localStorage.setItem('user', JSON.stringify(action.payload.user))
      }
      
    },
    authenticationFiles(state, action: { payload: string }) {
      state.error = action.payload;
      state.LoggedIn = false;
      state.loading = false;
      state.userUpdateSuccess =false
    },
    logout(state, _action) {
      state.LoggedIn = false;
      state.token = "";
      state.user = null;
      state.error =''
       state.userUpdateSuccess =false
    },
    clearAuthError(state, _action) {
      state.error = "";
      state.userUpdateSuccess =false
    },
    registrationSuccess(state, action: { payload: any }) {
    
      state.user = action.payload.user;
      state.loading = false;
      state.error =''
      state.LoggedIn =true
      
    },
    toggleRegistrationModal(state, action: {payload: boolean}){
      console.log('toggled')

      state.userUpdateSuccess =false
      state.showUpdateModal =false
        state.showRegistrationModal = action.payload;
      if(!action.payload &&  state.showUpdateModal){
        state.showUpdateModal =false
      }
      
      
    },
    showUpdateModal(state, action: {payload: boolean}){
      state.showUpdateModal = action.payload;
      state.userUpdateSuccess = false;
    },
    updateUserSuccess(state, action: {payload: User}){
      state.user =action.payload;
      state.loading =false;
      state.error=''
      state.userUpdateSuccess =true
    },
   
    cTokenAdded(state, action: {payload: string}){
      state.c_token =action.payload
    }
  },
});

export const authActions = AuthSlice.actions;

export default AuthSlice.reducer;
