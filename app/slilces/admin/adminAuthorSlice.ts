import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosObj from "@/services/AxiosService";
import { getParamsStringFromHash } from "../../utils/utilityFunctions";
import { AxiosResponse } from "axios";
import { NewAuthor, Author, UpdateAuthor } from "@/app/utils/interfaces";

export const getAdminAuthors = createAsyncThunk(
  "adminAuthor/getAdminAuthors",
  async (params: Record<string, any> | undefined, { dispatch, rejectWithValue }) => {
    try {
      // Optional: build query string if params exist
      const paramsStr = params ? getParamsStringFromHash(params) : "";
      const response: AxiosResponse = await axiosObj.get(`/api/authors`);
      if (response && response.status !== 200) {
        throw new Error(`HTTP error ${response.status}`);
      }
      const data = await response.data; // ✅ fetch returns a Response
      return data; // ✅ this becomes action.payload in reducers
    } catch (error: any) {
      // dispatch(showError(error.message || "Failed to load authors"));
      return rejectWithValue(error.message);
    }
  }
);

export const createAdminAuthor = createAsyncThunk(
  "adminAuthor/createAdminAuthor",
  async ( form: NewAuthor,  { dispatch, rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axiosObj.post(`/api/authors/`, form);
      
      if (response && response.status !== 200) {
        throw new Error(`HTTP error ${response.status}`);
      }
      const data = await response.data; 
      return data;
      return null;
    } catch (error: any) {
      // dispatch(showError(error.message || "Failed to load authors"));
      return rejectWithValue(error.message);
    }
  }
);

export const updateAdminAuthor = createAsyncThunk(
  "adminAuthor/updateAdminAuthor",
  async ({ id, form }: UpdateAuthor,  { dispatch, rejectWithValue }) => {
    try {
      // Optional: build query string if params exist
      const response: AxiosResponse = await axiosObj.put(`/api/authors/${id}`, form);
      if (response && response.status !== 200) {
        throw new Error(`HTTP error ${response.status}`);
      }
      const data = await response.data; // ✅ fetch returns a Response
      return data; // ✅ this becomes action.payload in reducers
    } catch (error: any) {
      // dispatch(showError(error.message || "Failed to load authors"));
      return rejectWithValue(error.message);
    }
  }
);

export const deleteAdminAuthor = createAsyncThunk(
  "adminAuthor/deleteAdminAuthor",
  async (id: Number,  { dispatch, rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axiosObj.delete(`/api/authors/${id}`);
      if (response && response.status !== 200) {
        throw new Error(`HTTP error ${response.status}`);
      }
      const data = await response.data; // ✅ fetch returns a Response
      return data; // ✅ this becomes action.payload in reducers
    } catch (error: any) {
      // dispatch(showError(error.message || "Failed to load authors"));
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
interface AdminAuthorsState {loading: Boolean; authors: Author[]; updatedAuthor: Author | null}
const initialState : AdminAuthorsState = {loading: false, authors: [], updatedAuthor: null};

const adminAuthorSlice = createSlice({
  name: "adminAuthor",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(getAdminAuthors.fulfilled, (state, action: PayloadAction<{ authors: Author[] }>) => {
      state.authors = action.payload.authors;
      // for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    })

    // .addCase(approveToAuthor.pending, (state, action) => {
    //   state.loading = true;
    // }).addCase(approveToAuthor.fulfilled, (state, action) => {
    //   for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    //   state.loading = false;
    // }).addCase(approveToAuthor.rejected, (state, action) => {
    //   state.loading = false;
    // })

    .addCase(createAdminAuthor.pending, (state, action) => {
      state.loading = true;
    }).addCase(createAdminAuthor.fulfilled, (state, action) => {
      // state.updatedAuthor = action.payload.author;
      state.loading = false;
    }).addCase(createAdminAuthor.rejected, (state, action) => {
      state.loading = false;
    })

    .addCase(updateAdminAuthor.pending, (state, action) => {
      state.loading = true;
    }).addCase(updateAdminAuthor.fulfilled, (state, action) => {
      state.updatedAuthor = action.payload.author;
      // for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(updateAdminAuthor.rejected, (state, action) => {
      state.loading = false;
    })
    
    // .addCase(deleteAdminAuthor.pending, (state, action) => {
    //   state.loading = true;
    // }).addCase(deleteAdminAuthor.fulfilled, (state, action) => {
    //   for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    //   state.loading = false;
    // }).addCase(deleteAdminAuthor.rejected, (state, action) => {
    //   state.loading = false;
    // });
  },
});

export default adminAuthorSlice.reducer;