import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosObj from "@/services/AxiosService";
import { getParamsStringFromHash } from "../../utils/utilityFunctions";
import { AxiosResponse } from "axios";
import { NewTag, Tag, UpdateTag } from "@/app/utils/interfaces";

// import { showError, showMessage } from "../messageSlice";

// export const getAdminTags1 = createAsyncThunk(
//   "adminTag/getAdminTags",
//   async ( params: Record<string, any> | undefined, {dispatch, rejectWithValue }) => {
//     try {
//       // const paramsStr = getParamsStringFromHash(params)
//       const paramsStr = params ? getParamsStringFromHash(params) : "";
//       const response = await fetch(`/admin/tags`);
//       // dispatch(showMessage(response.data));
//       return response.data;
//     } catch (error) {
//       dispatch(showError(error.message));
//       return rejectWithValue(error.message);
//     }
//   }
// );
export const getAdminTags = createAsyncThunk(
  "adminTag/getAdminTags",
  async (params: Record<string, any> | undefined, { dispatch, rejectWithValue }) => {
    try {
      // Optional: build query string if params exist
      const paramsStr = params ? getParamsStringFromHash(params) : "";
      const response: AxiosResponse = await axiosObj.get(`/api/admin/tags`);
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

// export const approveToTag = createAsyncThunk(
//   "adminTag/approveToTag",
//   async ({id, params}, {dispatch, rejectWithValue }) => {
//     try {
//       const response = await axiosObj.post(`/admin/tags/${id}/tag_approved`, params);
//       dispatch(showMessage(response.data));
//       return response.data;
//     } catch (error) {
//       dispatch(showError(error.message));
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const updateAdminTag = createAsyncThunk(
//   "adminTag/updateAdminTag",
//   async ({id, form}, {dispatch, rejectWithValue }) => {
//     try {
//       const response = await axiosObj.put(`/admin/tags/${id}`, {tag: form});
//       dispatch(showMessage(response.data));
//       return response.data;
//     } catch (error) {
//       dispatch(showError(error.message));
//       return rejectWithValue(error.message);
//     }
//   }
// );
// async ({ id, form }: { id: string | number; form: FormData })
// interface UpdateAdminTagArgs { id: string | number; form: FormData; }
export const createAdminTag = createAsyncThunk(
  "adminTag/createAdminTag",
  async ( form: NewTag,  { dispatch, rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axiosObj.post(`/api/admin/tags/`, form);

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

export const updateAdminTag = createAsyncThunk(
  "adminTag/updateAdminTag",
  async ({ id, form }: UpdateTag,  { dispatch, rejectWithValue }) => {
    try {
      // Optional: build query string if params exist
      const response: AxiosResponse = await axiosObj.put(`/api/admin/tags/${id}`, form);
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

// export const deleteAdminTag = createAsyncThunk(
//   "adminTag/deleteAdminTag",
//   async (id, {dispatch, rejectWithValue }) => {
//     try {
//       const response = await axiosObj.delete(`/admin/tags/${id}`);
//       dispatch(showMessage(response.data));
//       return response.data;
//     } catch (error) {
//       dispatch(showError(error.message));
//       return rejectWithValue(error.message);
//     }
//   }
// );

export const deleteAdminTag = createAsyncThunk(
  "adminTag/deleteAdminTag",
  async (id: Number,  { dispatch, rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axiosObj.delete(`/api/admin/tags/${id}`);
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
interface AdminTagsState {loading: Boolean; tags: Tag[]; updatedTag: Tag | null}
const initialState : AdminTagsState = {loading: false, tags: [], updatedTag: null};

const adminTagSlice = createSlice({
  name: "adminTag",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(getAdminTags.fulfilled, (state, action: PayloadAction<{ tags: Tag[] }>) => {
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

    .addCase(createAdminTag.pending, (state, action) => {
      state.loading = true;
    }).addCase(createAdminTag.fulfilled, (state, action) => {
      // state.updatedTag = action.payload.tag;
      state.loading = false;
    }).addCase(createAdminTag.rejected, (state, action) => {
      state.loading = false;
    })

    .addCase(updateAdminTag.pending, (state, action) => {
      state.loading = true;
    }).addCase(updateAdminTag.fulfilled, (state, action) => {
      state.updatedTag = action.payload.tag;
      // for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(updateAdminTag.rejected, (state, action) => {
      state.loading = false;
    })
    
    // .addCase(deleteAdminTag.pending, (state, action) => {
    //   state.loading = true;
    // }).addCase(deleteAdminTag.fulfilled, (state, action) => {
    //   for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    //   state.loading = false;
    // }).addCase(deleteAdminTag.rejected, (state, action) => {
    //   state.loading = false;
    // });
  },
});

export default adminTagSlice.reducer;