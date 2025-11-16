'use client';
import { userRegister } from "@/app/slices/auth";
import { NewUser, RegisterErrors, RegisterForm } from "@/app/utils/interfaces";
import { useAppDispatch } from "@/store";
// import { userRegister } from "@/slices/authSlice";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";

const userObj: RegisterForm = {email:'', username: '', password: '', roleId: 2, confirm_password: ''};

const Register = () => {
  const dispatch = useAppDispatch();
  const [formValues, setFormValues] = useState<RegisterForm>(userObj);
  const [loading, setLoading] = useState<boolean>(false);
  // const { loading, registered_user } = useSelector( (state) => state.auth);
  const { data: session } = useSession();

  if(session?.user?.roleId){
    const role = session?.user?.roleId;
    if(role === 1){ redirect('/admin/dashboard'); }
    else if(role=== 2){ redirect('/users/dashboard'); }
  }

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {name, value} = event.target;
    setFormValues({...formValues, [name]: value});
  }
  
  const validateForm = (formValues: RegisterForm) => {
    const errors: RegisterErrors = {};
    let emailRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

    if(formValues.username.length === 0 || formValues.username === ''){
      errors.username =  "Username is mandatory field.";
    }
    
    if(formValues.email.length === 0 || formValues.email === ''){
      errors.email = "Email is mandatory field.";
    } else if(!emailRegex.test(formValues.email)){
      errors.email = "Email must be in proper format.";
    }

    if(formValues.password.length === 0 || formValues.password === ''){
      errors.password = "Password is mandatory field.";
    } else if(formValues.password.length < 8){
      errors.password = "Password must be contain at least 8 characters.";
    }

    if(formValues.confirm_password.length === 0 || formValues.confirm_password === ''){
      errors.confirm_password = "Confirm Password is mandatory field.";
    }

    if(errors.password !== '' && errors.confirm_password !== ''
      && formValues.password !== formValues.confirm_password ){
      errors.confirm_password = "Password and Confirm Password must be same.";
    }
    return errors;
  }

  const onFormSubmit = async (event: React.FormEvent) =>{
    event.preventDefault();
    let errors = await validateForm(formValues);
  
    if(Object.keys(errors).length === 0){
      setLoading(true);
      dispatch(userRegister(formValues)).then(res => {
        setLoading(false);
        redirect("/auth/login");
      });
    } else if (Object.keys(errors).length > 0) {
      let errorMsgs = [] 
      for (const [value] of Object.entries(errors)) {
        errorMsgs.push(value);
      }
      // toast.error(errorMsgs.join("\n"));
    }
  }

  return (
    <>
      <div className='grid grid-flow-row md:grid-cols-8 gap-4 mt-16 mb-16'>
        <div className='col-start-4 col-span-2'>
          <div className='md:col-span-4 px-4 py-7 border border-gray-300 rounded-md shadow-2xl shadow-gray-400'>
            <form onSubmit={onFormSubmit} className="max-w-md mx-auto" autoComplete="off">
              <div className="text-xl text-center font-bold border-b-2 border-gray-300 py-3 mb-5">
                Create Your Account
              </div>
              <div className="relative z-0 w-full mb-5 group">
                {/* <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                */}
                <input 
                  type="text" 
                  key="email" 
                  name="email" 
                  id="email" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  placeholder="Email" 
                  onChange={onInputChange}
                  value = {formValues.email} 
                  autoComplete="off"
                />
              </div>
              <div className="relative z-0 w-full mb-5 group">
                {/* <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                */}
                <input 
                  type="text" 
                  key="username" 
                  name="username" 
                  id="username" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  placeholder="Username" 
                  onChange={onInputChange}
                  value = {formValues.username}
                  autoComplete="off"
                />
              </div>
              <div className="relative z-0 w-full mb-5 group">
                {/* <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                */}
                <input 
                  type="password" 
                  key="password" 
                  name="password" 
                  id="password" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  onChange={onInputChange}
                  placeholder="Password" 
                  value = {formValues.password}
                  autoComplete="off"
                />
              </div>
              <div className="relative z-0 w-full mb-5 group">
                {/* <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                */}
                <input 
                  type="password" 
                  key="confirm_password" 
                  name="confirm_password" 
                  id="confirm_password" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  onChange={onInputChange}
                  placeholder="Confirm Password" 
                  value = {formValues.confirm_password}
                  autoComplete="off"
                />
              </div>
              <div className='text-xs mb-4'>
                By singing up, you agree with our <Link href="/auth/terms_and_conditions" 
                  className='text-blue-600'>terms and conditions</Link>.
              </div>
              <div className="grid justify-items-stretch">
                <button 
                  type="submit" 
                  disabled={loading}
                  className={`justify-self-center text-white ${ loading ? 'bg-gray-400' : 'bg-blue-700'} 
                    hover:bg-blue-800 font-medium py-2.5 rounded-md w-full`}>
                  Register
                </button>
              </div>
            </form>
            <div className='py-4 text-sm'>
              If you registered already? Please login <Link href="/users/login" className='text-blue-500'>here</Link>.
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register;