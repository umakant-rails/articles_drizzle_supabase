'use client';
import { useAppDispatch, useAppSelector } from "@/store";
import { useEffect } from "react";
import { getPbAuthors } from "@/app/slices/public/publicAuthorSlice";
import Link from "next/link";

export default function AuthorList() {
  const dispatch = useAppDispatch();
  const { authors } = useAppSelector(state => state.publicAuthor)

  useEffect(() => { dispatch(getPbAuthors()); }, []);
  if(!authors){ return <div>Data is Loading ...</div> }

  return (
    <div className='grid md:grid-cols-12'>
      <div className="col-span-2"></div>
      <div className="col-span-8">
        <div className={`px-2 py-2 text-2xl text-blue-800 border-b-2 border-blue-500 shadow-lg 
          mb-5 font-bold bg-blue-50`}>
          Author List
        </div>
        <div>
          <table className="w-full text-left text-gray-500 dark:text-gray-400">
            <thead className="text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="border-b dark:border-gray-700 bg-yellow-600">
              <th scope="col" className="px-2 py-3">S No</th>
              <th scope="col" className="px-2 py-3">Author</th>
              </tr>
            </thead>
            {
              authors && authors.length > 0 ? authors.map( (author, index) => 
                <tbody key={index} className='text-xl'>
                  <tr  
                    className="border-b border-gray-400 text-gray-800 cursor-pointer" >
                    <td className='px-2 py-3'>{(index+1)}</td>
                    <td 
                      className="px-2 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {author.name}
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan={2} className='text-center py-5'>
                      There is no Tags available.
                    </td>
                  </tr>
                </tbody>
              )
            }
          </table>
        </div>
      </div>
      <div className="col-span-2"></div>
    </div>
  );
}
