
"use client"

import { useGetCustomersQuery } from "@/redux/services/customer/customer"


export default function CustomerComponent() {

    const {data, isLoading} = useGetCustomersQuery();
    console.log(data);
    console.log(isLoading);
  return (
    <div>
      
    </div>
  )
}
