import { combineReducers } from "@reduxjs/toolkit";
import adminTagSlice from "./admin/adminTagSlice";
import adminAuthorSlice from "./admin/adminAuthorSlice";
import adminArticleSlice from "./admin/adminArticleSlice";
import publicArticleSlice from "./public/publicArticleSlice";
import publicAuthorSlice from "./public/publicAuthorSlice";
import publicTagSlice from "./public/publicTagSlice";

export default combineReducers({
  adminTag: adminTagSlice,
  adminAuthor: adminAuthorSlice,
  adminArticle: adminArticleSlice,

  publicArticle: publicArticleSlice,
  publicTag: publicTagSlice,
  publicAuthor: publicAuthorSlice
});