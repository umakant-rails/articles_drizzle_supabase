'use client';
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { NewTag, Tag, UpdateTag } from '@/app/utils/interfaces';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { createAdminTag, deleteAdminTag, getAdminTags, updateAdminTag } from '@/app/slilces/admin/adminTagSlice';
import { useAppDispatch, useAppSelector } from '@/store';
// import { ITEM_PER_PAGE } from '@/utils/types';
// import Pagination from '@/app/shared/Pagination';
// import { ReactTransliterate } from "react-transliterate";
// import { confirmBeforeDeletion } from '@/utils/utilityFunctions';
// import { 
//   deleteTag, 
//   getTags, 
//   createTag, 
//   updateTag 
// } from '@/slices/user/userTagSlice';

const tagObj = {name: ''};

const TagList = () => {
  const dispatch = useAppDispatch();
  const aphabetList = "अ इ उ ऋ ए क ख ग घ च छ ज झ ट ठ ड ढ त थ द ध न प फ ब भ म य र ल व श ष स ह क्ष त्र ज्ञ श्र".split(' ');
  const [currentPage, setCurrentPage] = useState(1);
  const tagObj: NewTag = {name: ''};
  const [open, setOpen] = useState(false)
  const [tagList, setTagList] = useState<Tag []>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [totalTagQnty, setTotalTagQnty] = useState(0);

  const [formValues, setFormValues] = useState<NewTag>(tagObj);
  const [editableTag, setEditableTag] = useState<Tag>();
  const drawerCloseBtn = useRef(null);
  const { tags } = useAppSelector( state => state.adminTags);

  useEffect( () => { getAllTags(); }, []);

  const getAllTags = () => {
    dispatch(getAdminTags({})).then( res => { setTagList(res?.payload.tags); });
  }
  const setTagForEditing = (id: number) => {
    const tagForEditing = tagList.find( tag => tag.id === id)
    setEditableTag(tagForEditing);
    setFormValues( {...formValues, name: tagForEditing?.name || ''});
  }
  const deleteToTag = (id: number) => {
    dispatch(deleteAdminTag(id)).then(res => {
      const data = res.payload;
      const udpateList = tagList.filter(tag => tag.id !== id );
      setTagList(udpateList);
    })
  }

  const updateToTag = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsLoading(true);
    if(!editableTag?.id) {return}

    dispatch(updateAdminTag({ id: editableTag.id, form: formValues })).then(res => {
      const data = res.payload;
      const udpateList = tagList.map(tag =>
        tag.id === data.tag.id ? data.tag : tag
      );
      setTagList(udpateList);setOpen(false);
    })
  }

  const createNewTag =  async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    dispatch(createAdminTag(formValues)).then(res => {
      const tag = res.payload.tag;
      getAllTags();
      setOpen(false); setFormValues(tagObj);
    })
  }

  const popFunc= () => {
    return (
      <Dialog open={open} onClose={setOpen} className="relative z-[1000]">
        <div className="fixed inset-0" />
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <DialogPanel
                transition
                className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
              >
                <div className={`relative flex h-full flex-col overflow-y-auto bg-white shadow-xl 
                dark:bg-gray-800 dark:after:absolute dark:after:inset-y-0 dark:after:left-0 
                dark:after:w-px dark:after:bg-white/10`}>
                  <div className="px-2 py-4 sm:px-6 bg-blue-800 text-white z-100">
                    <div className="flex items-start justify-between">
                      <h2 id="drawer-title" className={`text-base font-semibold bg-blue-800 text-white`}>
                        { editableTag ? 'Tag Updation Form' : 'Tag Form'}
                      </h2>
                      <div className="ml-3 flex h-7 items-center">
                        <button type="button" onClick={e => setOpen(false)}
                          className={`relative rounded-md text-gray-200 hover:text-gray-200 
                            focus-visible:outline-2 focus-visible:outline-offset-2 
                            focus-visible:outline-indigo-600 `} ref={drawerCloseBtn}>
                          <span className="absolute -inset-2.5"></span>
                          <span className="sr-only">Close panel</span>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6">
                            <path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="relative mt-6 flex-1 px-2 sm:px-6">
                    <div className="relative bg-white dark:bg-gray-700">
                      <div className="space-y-4">
                        <form className="py-5 px-2">
                          <div className='grid md:grid-cols-12 mb-3'>
                            <div className='col-span-12'>
                              <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                                Name <span title="required" className="text-red-600 font-bold">*</span>
                              </label>
                            </div>
                            <div className='col-span-12'>
                              <input
                                value={formValues.name || ''}
                                onChange={e => { setFormValues(formValues => ({...formValues, name: e.target.value})) }}
                                type="text"
                                className={`block w-full p-2.5 text-gray-900 border border-gray-300 
                                  rounded bg-gray-50 focus:ring-blue-500 focus:border-blue-500 
                                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                              />
                            </div>
                          </div>
                        </form>
                      </div>
                      <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                        { 
                          editableTag ? ( <button type="button"
                            onClick={updateToTag} 
                            className="mr-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Update Tag
                          </button>) : ( <button type="button"
                            onClick={createNewTag} 
                            className="mr-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Add Tag
                          </button> ) 
                        }
                        <button onClick={e => setOpen(false)}
                          className={`py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none 
                            bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 
                            focus:z-10 focus:ring-4 focus:ring-gray-100 d`}>Cancel</button>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    )
  }

  return (
    <div className='grid md:grid-cols-12'>
      <div className='md:col-start-2 md:col-span-10 shadow-2xl bg-white border border-gray-200 p-6'>
        <div className={`px-2 py-2 text-2xl text-blue-800 border-b-2 border-blue-500 shadow-lg 
          mb-5 font-bold bg-blue-50`}>
          टैग्स सूची 
        </div>
        <section className="bg-gray-50">
          <div className="bg-white dark:bg-gray-800 relative sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-1/2">
                <form className="flex items-center">
                  <label htmlFor="simple-search" className="sr-only">Search</label>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search"/>
                  </div>
                </form>
              </div>
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <div className="flex items-center space-x-3 w-full md:w-auto">
                  <button onClick={ e => { setTagForEditing(-1); setOpen(true)}} 
                    className={`flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
                    focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 
                    py-2 text-center dark:bg-blue-600`} type="button">
                    Add New Tag &nbsp;&nbsp;
                    <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 7.8v8.4M7.8 12h8.4m4.8 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto min-h-72 px-3">
              <table className="w-full text-left text-gray-500 dark:text-gray-400">
                <thead className="text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr className="border-b dark:border-gray-700 bg-yellow-600">
                  <th scope="col" className="px-2 py-3">S no</th>
                    <th scope="col" className="px-2 py-3">Author</th>
                    <th scope="col" className="px-2 py-3">Action</th>
                  </tr>
                </thead>
                <tbody className='text-xl'>
                  {
                    tagList.length > 0 ? tagList.map( (tag, index) => 
                     <tr key={index} 
                        className="border-b border-gray-400 text-gray-800 cursor-pointer" >
                        <td className='px-2 py-3'>{(currentPage-1)*10 + (index+1)}</td>
                        <td
                          className="px-2 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {tag.name}
                        </td>
                        <td className="px-2 py-3 flex items-center justify-end">
                          <button type="button" onClick={e => {setTagForEditing(tag.id); setOpen(true)}} >
                            <svg className="w-[30px] h-[30px] text-blue-500 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.3 4.8 2.9 2.9M7 7H4a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h11c.6 0 1-.4 1-1v-4.5m2.4-10a2 2 0 0 1 0 3l-6.8 6.8L8 14l.7-3.6 6.9-6.8a2 2 0 0 1 2.8 0Z"/>
                            </svg>
                          </button>
                          <Link href="#" onClick={e => deleteToTag(tag.id)}>
                            <svg className="w-[30px] h-[30px] text-red-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                            </svg>
                          </Link>
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan={3} className='text-center py-5'>
                          There is no Authors available.
                        </td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </div>
            <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
              {/* {
                totalTagQnty ? (
                  <Pagination 
                    showWidget={5} 
                    totalItems={totalTagQnty}
                    itemsPerPage={ITEM_PER_PAGE}
                    pageChangeHandler= {handlePageClick}
                  />) : ''
              } */}
            </nav>
          </div>
        </section>
        {popFunc()}
      </div>
    </div>
    
  );
};

export default TagList;