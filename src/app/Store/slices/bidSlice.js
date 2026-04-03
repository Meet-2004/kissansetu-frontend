import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getApi } from "@/services/apiService";

// Async thunk for fetching auctions
export const fetchAuctions = createAsyncThunk(

  "bid/fetchAuctions",
  async (page=0, { rejectWithValue }) => {
    try {
      const result = await getApi(`/buyers/auctions/?page=${page}`);

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
  auctions: [],
  loading: false,
  error: null,
  lastUpdated: null,
  page:0,
  totalPages:1,

};

const bidSlice = createSlice({
  name: "bid",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    invalidateAuctions: (state) => {
      state.lastUpdated = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuctions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAuctions.fulfilled, (state, action) => {
        state.loading = false;
        state.auctions = action.payload;
        state.lastUpdated = Date.now();
         state.page = action.payload.number;  
          state.totalPages = action.payload.totalPages;    
        state.error = null;
      })
      .addCase(fetchAuctions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, invalidateAuctions } = bidSlice.actions;
export default bidSlice.reducer;