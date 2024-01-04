import { createSlice } from "@reduxjs/toolkit";

const testSlice = createSlice({
  name: "test",
  initialState: { value: 0 },
  reducers: {
    setValue(state, action) {
      state.value = action.payload;
    },
  },
});

export default testSlice.reducer;
