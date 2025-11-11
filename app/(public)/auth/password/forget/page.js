'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendPasswordToken } from '@/slices/authSlice'
import Image from 'next/image';

const formObj = {email: ''}
const ForgetPassword = () => {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState(formObj);
  const {loading, password_token_sent} = useSelector(state => state.auth) 

  useEffect( () => {
    if(password_token_sent){
      setFormValues(formObj);
    }
  }, [password_token_sent]);

  const onInputChange = event => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  }

  const onFormSubmit = (event) => {
    event.preventDefault();
    dispatch(sendPasswordToken({form: formValues}));
  }

  return (
    <div className='mt-5'>
      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
        <center>
          <Image src="/images/shrihit-mini.png" alt="Revenue Forms" 
            width={160} height={48} className="flex justify-center h-20 w-auto" priority/>
        </center>
      </div>
      <form className="py-4 px-5" onSubmit={onFormSubmit}>
        <div className="my-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Recover Your Password
        </div>
        <div className='mt-2 sm:mx-auto sm:w-full sm:max-w-sm'>
          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              Email <span title="required" className="text-red-600 font-bold">*</span>
            </label> 
            <input type="text" id="email" name="email"
              value={formValues.email}
              onChange={onInputChange} 
              className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
              rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
              dark:shadow-sm-light`} required />
          </div>
          <div>
            <button type="submit" 
              className={`flex w-full justify-center rounded-md ${loading ? 'bg-gray-400': 'bg-blue-700'} 
              px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>
              Recover Your Password
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgetPassword;