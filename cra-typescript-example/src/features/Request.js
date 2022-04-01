import { createSlice } from "@reduxjs/toolkit";

export const RequestReducer = createSlice({
  name:"request",
  initialState: {
    initialRequest: "1mosce",
    recordRequest: "",
  },
  reducers: {
    recordRequestValue: (state, action) => {
      state.recordRequest += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { recordRequest } = RequestReducer.actions;

export default RequestReducer.reducer;
