'use client';
import { useAppDispatch, useAppSelector } from "@/store";
import { useEffect } from "react";
import { getPbTags } from "@/app/slilces/public/publicTagSlice";

export default function TagList() {
  const dispatch = useAppDispatch();
  const { tags } = useAppSelector(state => state.publicTag)

  useEffect(() => { dispatch(getPbTags()); }, []);

  if(!tags){ return <div>Data is Loading ...</div> }

  return (
    <div className='grid md:grid-cols-12'>
      <div className="col-span-2"></div>
      <div className="col-span-8">
        <div className={`px-2 py-2 text-2xl text-blue-800 border-b-2 border-blue-500 shadow-lg 
          mb-5 font-bold bg-blue-50`}>
          Tag List
        </div>
        <div>
          <table className="w-full text-left text-gray-500 dark:text-gray-400">
            <thead className="text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="border-b dark:border-gray-700 bg-yellow-600">
              <th scope="col" className="px-2 py-3">S No</th>
              <th scope="col" className="px-2 py-3">Tag</th>
              </tr>
            </thead>
            {
              tags&& tags.length > 0 ? tags.map( (tag, index) => 
                <tbody key={index} className='text-xl'>
                  <tr  
                    className="border-b border-gray-400 text-gray-800 cursor-pointer" >
                    <td className='px-2 py-3'>{(index+1)}</td>
                    <td 
                      className="px-2 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {tag.name}
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
