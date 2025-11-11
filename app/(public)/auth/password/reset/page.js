'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePasswordByToken } from '@/slices/authSlice';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

const formObj = {reset_password_token: '', password: '', password_confirmation: ''};

const ResetPassword = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const [formValues, setFormValues] = useState(formObj);
  const {password_updated_by_token} = useSelector(state => state.auth) 

  useEffect( () => {
    const reset_password_token = searchParams.get('reset_password_token');
    if(reset_password_token){
      setFormValues(formValues => ({...formValues, reset_password_token: reset_password_token}));
    }
    if(password_updated_by_token){ setFormValues(formObj); }
  }, [searchParams, password_updated_by_token]);

  const onInputChange = event => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  }

  const onFormSubmit = (event) => {
    event.preventDefault();
    dispatch(updatePasswordByToken(formValues));
  }

  return (
    <>
      <div className="flex min-h-[800px] flex-1 flex-col px-6 py-4 lg:px-8">
        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
          <center>
            <Image src="/images/shrihit-mini.png" alt="Revenue Forms" 
              width={160} height={48} className="flex justify-center h-20 w-auto" priority/>
          </center>
        </div>
        <div className="my-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Reset Your Password
        </div>
        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
          <form method="POST"  onSubmit={onFormSubmit} className="space-y-6" autoComplete="on">
            <div>
              <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                Password <span title="required" className="text-red-600 font-bold">*</span>
              </label> 
              <input type="password" id="password" name="password"
                value={formValues.password}
                onChange={onInputChange} 
                className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                dark:shadow-sm-light`} required />
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                Confirm Password <span title="required" className="text-red-600 font-bold">*</span>
              </label> 
              <input type="password" id="password_confirmation" name="password_confirmation"
                value={formValues.password_confirmation}
                onChange={onInputChange} 
                className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                dark:shadow-sm-light`} required />
            </div>
            <div>
              <button type="submit" 
                className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 
                py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 
                focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>
                Reset Your Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
