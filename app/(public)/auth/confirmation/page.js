'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmUserAccount } from '@/slices/authSlice';
import { useSearchParams } from 'next/navigation';


const UserAccountConfirmed = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  const {account_confirmed} = useSelector(state => state.auth)

  useEffect( () => {
    const confirmation_token = searchParams.get('confirmation_token');
    if(confirmation_token){
      dispatch(confirmUserAccount(confirmation_token));
    }
  }, [dispatch, searchParams]);

  return (
    <div>
      { account_confirmed ? (
        <div className="flex min-h-[800px] flex-1 flex-col px-6 py-12 lg:px-8">
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className='text-xl border px-2 py-3 rounded bg-green-100 text-green-500'>
              Your Account is confirmed.
            </div>
          </div>
        </div>
        ) : null 
      }
    </div>
  );
};

export default UserAccountConfirmed;
