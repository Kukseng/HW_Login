"use client"

import { useDeleteCarMutation, useGetCarByIdQuery } from "@/redux/services/car/car"
import Image from "next/image";

type carId = {
    carId:string;
}

export default function CarDetailComponent({carId}:carId) {

    const {data,isLoading,error} = useGetCarByIdQuery(carId);
    const [deleteCar] = useDeleteCarMutation();
    console.log(isLoading);
    console.log(error);

    const handleDeleteCar = () =>{
       deleteCar({
        id: carId
       })
    }
  return (
    <div>
        {
           <div>
             <p>{data?.make}</p>
            <p>{data?.description}</p>
            <Image
            src={data?.image || ""}
            width={250}
            height={250}
            alt={data?.model || ''}
            />
            <button onClick={handleDeleteCar}>Delete</button>
{/* 
            {
              isLoading? `<p> Delete successfully</p>` : `
                 <div>
             <p>{data?.make}</p>
            <p>{data?.description}</p>
            <Image
            src={data?.image || ''}
            width={250}
            height={250}
            alt={data?.model || ''}
            />
              `
                    
                 } */}
           </div>
        }
      
    </div>
  )
}
