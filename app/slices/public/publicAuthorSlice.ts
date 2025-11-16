import { Author } from "@/app/utils/interfaces";
import { authors } from "@/db/schema";
import axiosObj from "@/services/AxiosService";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

export const getPbAuthors = createAsyncThunk(
  "publicAuthor/getPbAuthors",
  async (params: Record<string, any> | undefined, { dispatch, rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axiosObj.get(`/api/public/authors`);
      if (response && response.status !== 200) {
        throw new Error(`HTTP error ${response.status}`);
      }
      const data = await response.data;
      return data;
    } catch (error: any) {
      // dispatch(showError(error.message || "Failed to load authors"));
      return rejectWithValue(error.message);
    }
  }
);

interface AuthorDataState {
  loading: Boolean; 
  authors: Author[]; 
}
const initialState: AuthorDataState = {
  loading: false, 
  authors: [], 
};


const publicAuthorSlice = createSlice({
  name: "publicAuthor",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(getPbAuthors.fulfilled, (state, action: PayloadAction<{ authors: Author[]}>) => {
      state.authors = action.payload.authors;
      // for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    })
  }
});

export default publicAuthorSlice.reducer;