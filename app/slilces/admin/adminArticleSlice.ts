import { Article, Author, NewArticle, Tag, UpdateArticle } from "@/app/utils/interfaces";
import axiosObj from "@/services/AxiosService";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

export const getArticles = createAsyncThunk(
  "adminAuthor/getArticles",
  async (params: Record<string, any> | undefined, { dispatch, rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axiosObj.get(`/api/admin/articles`);
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

export const getArticle = createAsyncThunk(
  "adminAuthor/getArticle",
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axiosObj.get(`/api/admin/articles/${id}`);

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

export const getArticleBasicData = createAsyncThunk(
  "adminAuthor/getArticleBasicData",
  async (id: Record<string, any> | null, { dispatch, rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axiosObj.get(`/api/admin/articles/new`);
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

export const createArticle = createAsyncThunk(
  "adminAuthor/createArticle",
  async (form: NewArticle,  { dispatch, rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axiosObj.post(`/api/admin/articles`, form);
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

export const updateAdminArticle = createAsyncThunk(
  "adminAuthor/updateAdminArticle",
  async ({ id, form }: UpdateArticle,  { dispatch, rejectWithValue }) => {
    try {
      // Optional: build query string if params exist
      const response: AxiosResponse = await axiosObj.put(`/api/admin/articles/${id}`, form);
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

export const deleteAdminArticle = createAsyncThunk(
  "adminAuthor/deleteAdminArticle",
  async (id: Number,  { dispatch, rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axiosObj.delete(`/api/admin/articles/${id}`);
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
export interface ArticleWithRelations {
  article: Article;
  author: Author | null;
  tag: Tag | null;
}

interface ArticleDataState {
  loading: Boolean; 
  authors: Author[]; 
  tags: Tag[]; 
  articles: ArticleWithRelations[],
  article: Article | null
}
const initialState: ArticleDataState = {
  loading: false, 
  authors: [], 
  tags: [], 
  articles: [], 
  article: null
};

const adminArticleSlice = createSlice({
  name: "adminArticle",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(getArticles.fulfilled, (state, action: PayloadAction<{ articles: ArticleWithRelations[]}>) => {
      state.articles = action.payload.articles;
      // for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    })
    .addCase(getArticle.fulfilled, (state, action: PayloadAction<{ article: Article}>) => {
      state.article = action.payload.article;
      // for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    })
    .addCase(getArticleBasicData.fulfilled, (state, action: PayloadAction<{ authors: Author[], tags: Tag[] }>) => {
      state.authors = action.payload.authors;
      state.tags = action.payload.tags;
      // for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    })
    .addCase(createArticle.fulfilled, (state, action: PayloadAction<{ article: Article}>) => {
      // state.article = action.payload.article;
      // for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    })
     .addCase(updateAdminArticle.fulfilled, (state, action: PayloadAction<{ article: Article}>) => {
      state.article = action.payload.article;
      // for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    })
  }
});

export default adminArticleSlice.reducer;