import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPolicies = createAsyncThunk(
  "policies/fetchAll",
  async (params = {}, { rejectWithValue }) => {
    try { 
      const response = await axios.get(
        "https://mocki.io/v1/9341b465-16a7-4ac4-b1a7-68605c38eccb ",
      );

      return {
        policies: response.data,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

const policiesSlice = createSlice({
  name: "policies",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchPolicies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchPolicies.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.policies;
      })

      .addCase(fetchPolicies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default policiesSlice.reducer;