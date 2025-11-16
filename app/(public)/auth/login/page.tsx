'use client';
import { getSession, signIn, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { redirect, useRouter } from "next/navigation";
// import { toast } from 'react-toastify';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("");
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session?.user) {
      if (session.user.roleId === 1) {
        router.push('/admin/articles');
      } else if (session.user.roleId === 2) {
        router.push("/users/articles");
      }
    }
  }, [status, session, router]);

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await signIn("credentials", {
      redirect: false,
      callbackUrl: "/admin/articles",
      email,
      password
    });

    if (response && response.status === 200) {
      const session = await getSession();
      const role = session?.user?.roleId;
      localStorage.setItem('loginSuccess', 'You have logged in successfully.');
      if(role === 1){ router.push('/admin/articles'); }
      else if(role === 2){ router.push('/users/articles'); }
    } else {
      // toast.error('Invalid Credentials.')
      alert('Invalid Credentials.')
    }
  }

  return (
    <div className='grid grid-flow-row md:grid-cols-8 gap-4 mt-16 mb-16'>
      <div className='col-start-4 col-span-2'>
        <div className='md:col-span-4 px-4 py-7 border border-gray-300 rounded-md shadow-2xl shadow-gray-400'>
          <form onSubmit={onFormSubmit} className="max-w-md mx-auto">
            <div className="text-xl text-center font-bold border-b-2 border-gray-400 py-3 mb-5">
              Login To Your Account
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  onChange={e => setEmail(e.target.value)}
                  value = {email}
                  className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input 
                type="password" 
                name="password" 
                id="password" 
                autoComplete='off'
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="" 
                onChange={e => setPassword(e.target.value)}
                value = {password}
                required
              />
            </div>
            <div className="grid justify-items-stretch mb-2">
              <button type="submit" className={`justify-self-center text-white bg-blue-700 
                hover:bg-blue-800 border border-blue-800 font-medium py-2 rounded-md w-full`}>
                Login
              </button>
            </div>
          </form>
          <div className='border-b py-3 border-gray-300 text-blue-500'>
            <Link href="/auth/password/forget">Forgotten Password</Link>
          </div>
          <div className='py-2 text-sm'>
            If you are not registered? Please Registered <Link key={'login'} href="/auth/register" className='text-blue-500'>here</Link>.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 
