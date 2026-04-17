import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "Your Name",
  // token: null,
  role: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  id:null,
  userMail:"Your Email",
  fullName:null,

};

const authSlice = createSlice({
  name: "auth",
  initialState,

reducers: {
    //  Start login/signup request
    authStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    //  Login / Signup success
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      // state.token = action.payload.token;
      state.role = action.payload.role;
      state.isAuthenticated = true;
      state.error = null;
      state.id=action.payload.id;
      state.userMail=action.payload.userMail;
      state.fullName=action.payload.fullName;
    },

    // Failure case
    authFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //  Logout
    logout: (state) => {
      state.user = null;
      // state.token = null;
      state.role = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.id=null;
    },
  },
});

export const {
  authStart,
  loginSuccess,
  authFailure,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
