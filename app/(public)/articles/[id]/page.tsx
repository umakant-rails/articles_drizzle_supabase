'use client';

import { useAppDispatch, useAppSelector } from "@/store";
import { useEffect } from "react";
import Link from "next/link";
import { getPbArticle } from "@/app/slices/public/publicArticleSlice";
import { useParams } from "next/navigation";

export default function ArticleShow() {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { article } = useAppSelector(state => state.publicArticle)

  useEffect(() => { dispatch(getPbArticle(id)); }, []);
  if(!article){ return <div>Data is Loading ...</div> }

  return (
    <div className='grid md:grid-cols-12'>
      <div className="col-span-2"></div>
      <div className="col-span-8">
        <div className={`px-2 py-2 text-2xl text-blue-800 border-b-2 border-blue-500 shadow-lg 
          mb-5 font-bold bg-blue-50`}>
          Article : {article?.title}
        </div>
        <div className="mb-4">
          {article.content}
        </div>
        <div className="my-4">
          <Link href="/articles" className="text-blue-600">Article List</Link>
        </div>
      </div>
      <div className="col-span-2"></div>
    </div>
  );
}
