import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setTaxYear(state, action) {
      state.taxYear = action.payload;
    },
    setUserInfo(state, action) {
      const { first_name, last_name, email, role, phone_no, gender, address } =
        action.payload;
      state.first_name = first_name;
      state.last_name = last_name;
      state.phone_no = phone_no;
      state.email = email;
      state.role = role;
      state.gender = gender;
      state.address = address;
    },
  },
});

export const { setTaxYear, setUserInfo } = appSlice.actions;

export default appSlice.reducer;
