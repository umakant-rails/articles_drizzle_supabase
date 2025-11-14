'use client';
import { useAppDispatch, useAppSelector } from "@/store";
import { useEffect } from "react";
import { getPbArticles } from "@/app/slilces/public/publicArticleSlice";
import Link from "next/link";

export default function ArticleList() {
  const dispatch = useAppDispatch();
  const { articles } = useAppSelector(state => state.publicArticle)

  useEffect(() => { dispatch(getPbArticles()); }, []);

  if(!articles){ return <div>Data is Loading ...</div> }

  return (
    <div className='grid md:grid-cols-12'>
      <div className="col-span-2"></div>
      <div className="col-span-8">
        <div className={`px-2 py-2 text-2xl text-blue-800 border-b-2 border-blue-500 shadow-lg 
          mb-5 font-bold bg-blue-50`}>
          Article List
        </div>
        <div>
          {
            articles && articles.map( (article, index) => 
              <div key={index} className="mb-4">
                <div className="text-xl font-bold mb-2 shadoew-xl border-b border-gray-300 text-orange-600">
                  <Link href={`/articles/${article.article.id}`}>{article.article.title}</Link>
                </div>
                <div>{article.article.content}</div>
              </div>
            )
          }
        </div>
      </div>
      <div className="col-span-2"></div>
    </div>
  );
}
