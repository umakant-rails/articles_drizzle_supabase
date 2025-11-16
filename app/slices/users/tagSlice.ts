import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosObj from "@/services/AxiosService";
import { getParamsStringFromHash } from "../../utils/utilityFunctions";
import { AxiosResponse } from "axios";
import { NewTag, Tag, UpdateTag } from "@/app/utils/interfaces";

export const getTags = createAsyncThunk(
  "tag/getTags",
  async (params: Record<string, any> | undefined, { dispatch, rejectWithValue }) => {
    try {
      // Optional: build query string if params exist
      const paramsStr = params ? getParamsStringFromHash(params) : "";
      const response: AxiosResponse = await axiosObj.get(`/api/users/tags`);
      if (response && response.status !== 200) {
        throw new Error(`HTTP error ${response.status}`);
      }
      const data = await response.data; // ✅ fetch returns a Response
      return data; // ✅ this becomes action.payload in reducers
    } catch (error: any) {
      // dispatch(showError(error.message || "Failed to load tags"));
      return rejectWithValue(error.message);
    }
  }
);


export const createTag = createAsyncThunk(
  "tag/createTag",
  async ( form: NewTag,  { dispatch, rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axiosObj.post(`/api/users/tags/`, form);

      if (response && response.status !== 200) {
        throw new Error(`HTTP error ${response.status}`);
      }
      const data = await response.data; // ✅ fetch returns a Response
      return data; // ✅ this becomes action.payload in reducers
    } catch (error: any) {
      // dispatch(showError(error.message || "Failed to load tags"));
      return rejectWithValue(error.message);
    }
  }
);

export const updateTag = createAsyncThunk(
  "tag/updateTag",
  async ({ id, form }: UpdateTag,  { dispatch, rejectWithValue }) => {
    try {
      // Optional: build query string if params exist
      const response: AxiosResponse = await axiosObj.put(`/api/users/tags/${id}`, form);
      if (response && response.status !== 200) {
        throw new Error(`HTTP error ${response.status}`);
      }
      const data = await response.data; // ✅ fetch returns a Response
      return data; // ✅ this becomes action.payload in reducers
    } catch (error: any) {
      // dispatch(showError(error.message || "Failed to load tags"));
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTag = createAsyncThunk(
  "tag/deleteTag",
  async (id: Number,  { dispatch, rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axiosObj.delete(`/api/users/tags/${id}`);
      if (response && response.status !== 200) {
        throw new Error(`HTTP error ${response.status}`);
      }
      const data = await response.data; // ✅ fetch returns a Response
      return data; // ✅ this becomes action.payload in reducers
    } catch (error: any) {
      // dispatch(showError(error.message || "Failed to load tags"));
      // return rejectWithValue(error.message);
      if (error.response) {
        // Server responded with a status outside 2xx
        console.error("Server error:", error.response.data);
        console.error("Status code:", error.response.status);
      } else if (error.request) {
        // Request was made but no response received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request
        console.error("Error setting up request:", error.message);
      }
    }
  }
);
interface TagsState {loading: Boolean; tags: Tag[]; updatedTag: Tag | null}
const initialState : TagsState = {loading: false, tags: [], updatedTag: null};

const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(getTags.fulfilled, (state, action: PayloadAction<{ tags: Tag[] }>) => {
      state.tags = action.payload.tags;
      // for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    })

    // .addCase(approveToTag.pending, (state, action) => {
    //   state.loading = true;
    // }).addCase(approveToTag.fulfilled, (state, action) => {
    //   for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    //   state.loading = false;
    // }).addCase(approveToTag.rejected, (state, action) => {
    //   state.loading = false;
    // })

    .addCase(createTag.pending, (state, action) => {
      state.loading = true;
    }).addCase(createTag.fulfilled, (state, action) => {
      // state.updatedTag = action.payload.tag;
      state.loading = false;
    }).addCase(createTag.rejected, (state, action) => {
      state.loading = false;
    })

    .addCase(updateTag.pending, (state, action) => {
      state.loading = true;
    }).addCase(updateTag.fulfilled, (state, action) => {
      state.updatedTag = action.payload.tag;
      // for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(updateTag.rejected, (state, action) => {
      state.loading = false;
    })
    
    // .addCase(deleteTag.pending, (state, action) => {
    //   state.loading = true;
    // }).addCase(deleteTag.fulfilled, (state, action) => {
    //   for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    //   state.loading = false;
    // }).addCase(deleteTag.rejected, (state, action) => {
    //   state.loading = false;
    // });
  },
});

export default tagSlice.reducer;