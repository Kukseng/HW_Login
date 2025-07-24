
"use client"
import { useGetCarsQuery } from "@/redux/services/car/car"
import CardDisplayComponent from "./CartComponents/CardDisplayComponent"

export default function ProductList() {

    const {data}  = useGetCarsQuery({
        page:1,
        limit: 100
    })

  return (
    <div className="grid lg:grid-cols-4 border p-4 gap-5">
       {
        data?.map((pro)=>(
            <CardDisplayComponent  key={pro.id}
            image={pro.image?.startsWith('http') ? pro.image : `https://car-nextjs-api.cheatdev.online/${pro.image}`} id={pro.id} make={pro.make} price={pro.price}/>
        ))
       }
    </div>
  )
}
