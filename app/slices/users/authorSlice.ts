import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosObj from "@/services/AxiosService";
import { getParamsStringFromHash } from "../../utils/utilityFunctions";
import { AxiosResponse } from "axios";
import { NewAuthor, Author, UpdateAuthor } from "@/app/utils/interfaces";

export const getAuthors = createAsyncThunk(
  "author/getAuthors",
  async (params: Record<string, any> | undefined, { dispatch, rejectWithValue }) => {
    try {
      // Optional: build query string if params exist
      const paramsStr = params ? getParamsStringFromHash(params) : "";
      const response: AxiosResponse = await axiosObj.get(`/api/users/authors`);
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

export const createAuthor = createAsyncThunk(
  "author/createAuthor",
  async ( form: NewAuthor,  { dispatch, rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axiosObj.post(`/api/users/authors/`, form);
      
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

export const updateAuthor = createAsyncThunk(
  "author/updateAuthor",
  async ({ id, form }: UpdateAuthor,  { dispatch, rejectWithValue }) => {
    try {
      // Optional: build query string if params exist
      const response: AxiosResponse = await axiosObj.put(`/api/users/authors/${id}`, form);
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

export const deleteAuthor = createAsyncThunk(
  "author/deleteAuthor",
  async (id: Number,  { dispatch, rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axiosObj.delete(`/api/users/authors/${id}`);
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
interface AuthorsState {loading: Boolean; authors: Author[]; updatedAuthor: Author | null}
const initialState : AuthorsState = {loading: false, authors: [], updatedAuthor: null};

const authorSlice = createSlice({
  name: "author",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(getAuthors.fulfilled, (state, action: PayloadAction<{ authors: Author[] }>) => {
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

    .addCase(createAuthor.pending, (state, action) => {
      state.loading = true;
    }).addCase(createAuthor.fulfilled, (state, action) => {
      // state.updatedAuthor = action.payload.author;
      state.loading = false;
    }).addCase(createAuthor.rejected, (state, action) => {
      state.loading = false;
    })

    .addCase(updateAuthor.pending, (state, action) => {
      state.loading = true;
    }).addCase(updateAuthor.fulfilled, (state, action) => {
      state.updatedAuthor = action.payload.author;
      // for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(updateAuthor.rejected, (state, action) => {
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

export default authorSlice.reducer;