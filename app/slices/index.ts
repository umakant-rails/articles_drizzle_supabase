// import { combineReducers } from "@reduxjs/toolkit";
// import adminTagSlice from "./admin/adminTagSlice";
// import adminAuthorSlice from "./admin/adminAuthorSlice";
// import adminArticleSlice from "./admin/adminArticleSlice";
// import publicArticleSlice from "./public/publicArticleSlice";
// import publicAuthorSlice from "./public/publicAuthorSlice";
// import publicTagSlice from "./public/publicTagSlice";

// export default combineReducers({
//   adminTag: adminTagSlice,
//   adminAuthor: adminAuthorSlice,
//   adminArticle: adminArticleSlice,

//   publicArticle: publicArticleSlice,
//   publicTag: publicTagSlice,
//   publicAuthor: publicAuthorSlice
// });

import { combineReducers } from "@reduxjs/toolkit";
import tagSlice from "./users/tagSlice";
import authorSlice from "./users/authorSlice";
import articleSlice from "./users/articleSlice";
import publicArticleSlice from "./public/publicArticleSlice";
import publicAuthorSlice from "./public/publicAuthorSlice";
import publicTagSlice from "./public/publicTagSlice";

export default combineReducers({
  tag: tagSlice,
  author: authorSlice,
  article: articleSlice,

  publicArticle: publicArticleSlice,
  publicTag: publicTagSlice,
  publicAuthor: publicAuthorSlice
});