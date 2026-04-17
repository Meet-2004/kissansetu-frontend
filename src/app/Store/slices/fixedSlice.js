import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getApi } from "@/services/apiService";

// Async thunk for fetching fixed
export const fetchFixed = createAsyncThunk(
  "fixed/fetchFixed",
  
  async ({page=0,search=""}, { rejectWithValue }) => {
    console.log("this is search at redux !!!!!!!!",search);
    try {
      const result = await getApi(search ? `/buyers/fixed?page=${page}&search=${search}` :  `/buyers/fixed?page=${page}` );
      if(result.success){
        console.log("hello");
      }
      else{
        // console.log();
      }
      return result?.data;
    } catch (error) {
        console.log("this is error",error);
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  fixed: [],
  loading: false,
  error: null,
  lastUpdated: null,
  page:0,
  totalPages:1,
};

const fixedSlice = createSlice({
  name: "fixed",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    invalidatefixed: (state) => {
      state.lastUpdated = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFixed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFixed.fulfilled, (state, action) => {
        state.loading = false;
        state.fixed = action.payload;
        state.lastUpdated = Date.now();
        state.error = null;
        state.page=action.payload.number;
        state.totalPages=action.payload.totalPages;
      })
      .addCase(fetchFixed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, invalidatefixed } = fixedSlice.actions;
export default fixedSlice.reducer;