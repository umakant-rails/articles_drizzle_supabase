'use client';
import { getArticle } from '@/app/slices/users/articleSlice';
import { useAppDispatch, useAppSelector } from '@/store';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';

const AritcleShow = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const newId = id as string;
  const { article } = useAppSelector(state => state.article);

  useEffect( () => { dispatch(getArticle(newId)); }, []);

  if(!article){return <div>Data is loading ....</div>}
  
  return (
    <div className='grid grid-cols-12'>
      <div></div>
      <div className='col-span-10 px-4'>
        <div className='mb-4'>
          <div className='text-orange-600 text-2xl font-bold border-b border-gray-300 shadow-sm px-2 py-2 mb-4'>
            Article: {article.title}
          </div>
          <div className='p-2 text-justify'>
            {article.content}
          </div>
        </div>
        <div className='px-2'>
          <Link href={`/users/articles`} className='text-blue-600'>Article List</Link>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default AritcleShow;
