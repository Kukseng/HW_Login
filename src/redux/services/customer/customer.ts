/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";

type CustomerResponse = {
    fullname:string,
    email:string, 
    gender: string
};

export const customerApi = baseApi.injectEndpoints({
    endpoints: (builder) =>({
        getCustomers: builder.query<CustomerResponse[],void>({
            query: ()=> `/customers`
        })
    })
})

export const {
    useGetCustomersQuery
} = customerApi;