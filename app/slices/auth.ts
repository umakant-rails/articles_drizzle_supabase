import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosObj from "@/services/AxiosService";
import { LoginForm, RegisterForm } from "../utils/interfaces";
import { AxiosResponse } from "axios";
// import { showError, showMessage } from "./messageSlice";

export const userRegister = createAsyncThunk(
  "auth/userRegister",
  async (form: RegisterForm, {dispatch, rejectWithValue }) => {
    try {
      form['roleId'] = 2;
      const response: AxiosResponse = await axiosObj.post(`/api/users/register`, form);
      // dispatch(showMessage(response.data));
      return response.data;
    } catch (error: any) {
      // dispatch(showError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

// export const userLogout = () => async dispatch => {
//   try {
//     const response = await axiosObj.delete(`/users/logout`);
//     return response;
//   } catch (error) {
//     dispatch(showError(error.message));
//   }
// }

// export const updatePassword = createAsyncThunk(
//   "auth/updatePassword",
//   async (formValues, {dispatch, rejectWithValue }) => {
//     try {
//       const response = await axiosObj.put('/users/password', {user: formValues});
//       dispatch(showMessage(response.data));
//       return response.data;
//     } catch (error) {
//       dispatch(showError(error.message));
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const updatePasswordByToken = createAsyncThunk(
//   "auth/updatePasswordByToken",
//   async (formValues, {dispatch, rejectWithValue }) => {
//     try {
//       const response = await axiosObj.put('/users/password', {user: formValues});
//       dispatch(showMessage(response.data));
//       return response.data;
//     } catch (error) {
//       dispatch(showError(error.message));
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const sendPasswordToken = createAsyncThunk(
//   "auth/sendPasswordToken",
//   async ({form}, {dispatch, rejectWithValue }) => {
//     try {
//       const response = await axiosObj.post('/users/password', {user: form});
//       dispatch(showMessage(response.data));
//       return response.data;
//     } catch (error) {
//       dispatch(showError(error.message));
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const confirmUserAccount = createAsyncThunk(
//   "auth/confirmUserAccount",
//   async (token, {dispatch, rejectWithValue }) => {
//     try {
//       const response = await axiosObj.get(`/users/confirmation?confirmation_token=${token}`);
//       dispatch(showMessage(response.data));
//       return response.data;
//     } catch (error) {
//       dispatch(showError(error.message));
//       return rejectWithValue(error.message);
//     }
//   }
// );

// /* send response back to caller component */
// export const getUserRole = () => async dispatch => {
//   try {
//     const response = await axiosObj.post(`/users/get_role`);
//     return response;
//   } catch (error) {
//     dispatch(showError(error.message));
//   }
// }


// /* send response back to caller component */
// export const getCurrentUser = () => async dispatch => {
//   return await axiosObj.get('/current_user');
// }

const initialState = {
  error: "", loading: false, password_token_sent: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(userRegister.pending, (state, action) => { 
      state.loading = true;
    }).addCase(userRegister.fulfilled, (state, action) => {
      // state.loading = false; 
      // state.registered_user=action.payload.user;
    }).addCase(userRegister.rejected, (state, action) => {
      state.loading = false; 
    })

    // .addCase(updatePassword.pending, (state, action) => { 
    //   state.loading = true;
    // }).addCase(updatePassword.fulfilled, (state, action) => {
    //   state.loading = false; state.password_changed = true;
    // }).addCase(updatePassword.rejected, (state, action) => {
    //   state.loading = false; state.password_changed = false;
    // })

    // .addCase(updatePasswordByToken.pending, (state, action) => { 
    //   state.loading = true;
    // }).addCase(updatePasswordByToken.fulfilled, (state, action) => {
    //   state.loading = false; state.password_updated_by_token = true;
    // }).addCase(updatePasswordByToken.rejected, (state, action) => {
    //   state.loading = false; state.password_updated_by_token = false;
    // })

    // .addCase(sendPasswordToken.pending, (state, action) => { 
    //   state.loading = true;
    // }).addCase(sendPasswordToken.fulfilled, (state, action) => {
    //   state.loading = false; state.password_token_sent = true;
    // }).addCase(sendPasswordToken.rejected, (state, action) => {
    //   state.loading = false;
    // })

    // .addCase(confirmUserAccount.pending, (state, action) => { 
    //   state.loading = true;
    // }).addCase(confirmUserAccount.fulfilled, (state, action) => {
    //   state.loading = false; state.account_confirmed = true;
    // }).addCase(confirmUserAccount.rejected, (state, action) => {
    //   state.loading = false;
    // });
  },
});

export default authSlice.reducer;
