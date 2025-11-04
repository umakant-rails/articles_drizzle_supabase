import axios, { AxiosResponse } from "axios";
// import { getSession, signOut } from 'next-auth/react';
import { redirect } from "next/navigation";

export interface AxiosResponseWithOk<T = any> extends AxiosResponse<T> {
  ok: boolean;
}


const axiosObj =  axios.create({
  // baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});

axiosObj.interceptors.response.use(
  (response) => {
    return {
      ...response,
      ok: response.status >= 200 && response.status < 300,
    };
  },
  async (error) => {
    // Optional: handle unauthorized (401) globally
    if (error.response?.status === 401) {
      redirect("/login");
    }
    // Ensure rejected response still has an `.ok` property
    return Promise.reject({
      ...error.response,
      ok: false,
      error: error.message,
    });
  }
);

// axiosObj.interceptors.request.use(
//   async (config) => {
//     const session = await getSession();
//     if (session?.jwt) {
//       config.headers.Authorization = `Bearer ${session.jwt}`; //`${session.jwt}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// axiosObj.interceptors.response.use(
//   response => response,
//   async error => {
//     if (error.response.status === 401) { 
//       await signOut({ redirect: false });
//       setTimeout( () => {
//         redirect("/auth/login");
//         // window.location = "/auth/login";
//       }, 700);
//     } 
//     return Promise.reject(error);
//   },
// );


export default axiosObj;