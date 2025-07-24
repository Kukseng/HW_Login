/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";
import { setAccessToken } from "./features/auth/authSlice";

// udpate baseQuery
const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL_CAR_API,
    prepareHeaders: (headers,{getState}) =>{
        const token = (getState() as RootState).auth.token;
        if(token){
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers;
    }
})


// args: for the request details // api: for Redux api object // extraOptions: for additional
const baseQueryWithReAuth = async (args: any, api: any, extraOptions: any) => {
    // check result of each query. if it's a 401, we'll try to re-authenticate
    let result = await baseQuery(args, api, extraOptions);
    if (result.error?.status === 401 || result.error?.status === 403) {
        const res = await fetch("http://localhost:3000/api/refresh", {
            method: "GET",
            credentials: "include",
        });
        if (res.ok) {
            const data = await res.json();
            console.log("The data from refresh: ", data)
            api.dispatch(setAccessToken(data.accessToken));
            // re-run the query with the new token
            result = await baseQuery(args, api, extraOptions);
        } else {
            const res = await fetch("/api/logout", {
                method: "POST",
                credentials: "include",
            });
            const data = await res.json();
            console.log(data);
        } }  return result
    };


export const baseApi = createApi({
    reducerPath:"baseApi",
    baseQuery:baseQueryWithReAuth,
    tagTypes:['Cars'],
    endpoints: ()=>({})
})
