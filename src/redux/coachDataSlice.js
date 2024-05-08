import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  coaches: null,
};

export const coachDataSlice = createSlice({
  name: "coach",
  initialState,
  reducers: {
    changeCoach: (state, { payload }) => {
      state.coaches = payload;
    },
    changeLoading: (state, { payload }) => {
      state.loading = payload;
    },
  },
});

export const { changeCoach,changeLoading } = coachDataSlice.actions;

export default coachDataSlice.reducer;
