import { Tag } from "@/app/utils/interfaces";
import axiosObj from "@/services/AxiosService";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

export const getPbTags = createAsyncThunk(
  "publicTag/getPbTags",
  async (params: Record<string, any> | undefined, { dispatch, rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axiosObj.get(`/api/public/tags`);
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

interface TagDataState {
  loading: Boolean; 
  tags: Tag[]; 
}
const initialState: TagDataState = {
  loading: false, 
  tags: [], 
};


const publicTagSlice = createSlice({
  name: "publicTag",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(getPbTags.fulfilled, (state, action: PayloadAction<{ tags: Tag[]}>) => {
      state.tags = action.payload.tags;
      // for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    })
  }
});

export default publicTagSlice.reducer;