import { createSlice, isAnyOf } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: null,
    name: null,
    email: null,
    avatar: null,
  },
  stateChanged: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
});

export const authReducer = authSlice.reducer;

// export const { refreshUser, updateAvatar } = authSlice.actions;
