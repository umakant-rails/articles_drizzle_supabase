import { Article, Author, NewArticle, Tag, UpdateArticle } from "@/app/utils/interfaces";
import axiosObj from "@/services/AxiosService";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

export const getPbArticles = createAsyncThunk(
  "publicArticle/getPbArticles",
  async (params: Record<string, any> | undefined, { dispatch, rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axiosObj.get(`/api/public/articles`);
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

export const getPbArticle = createAsyncThunk(
  "publicArticle/getPbArticle",
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axiosObj.get(`/api/public/articles/${id}`);

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

const publicArticleSlice = createSlice({
  name: "publicArticle",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(getPbArticles.fulfilled, (state, action: PayloadAction<{ articles: ArticleWithRelations[]}>) => {
      state.articles = action.payload.articles;
      // for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    })
    .addCase(getPbArticle.fulfilled, (state, action: PayloadAction<{ article: Article}>) => {
      state.article = action.payload.article;
      // for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    })
  }
});

export default publicArticleSlice.reducer;