
"use client"

import { CartProductType } from "@/lib/CartProductType";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Button } from "../ui/button";
import { Card,CardBody, CardFooter, Image} from "@heroui/react";


export default function CardDisplayComponent({
    image, 
    id,
    make,
    price
}:CartProductType) {

    const dispatch = useAppDispatch();

  return (
    <div>
    <Card key={id} isPressable shadow="sm" onPress={() => console.log("item pressed")}> 
          <CardBody className="overflow-visible p-0">
            <Image
              alt={make}
              className="w-full object-cover h-[140px]"
              radius="lg"
              shadow="sm"
              src={image}
              width="100%"
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{make}</b>
            <p className="text-default-500">{price}</p>
          </CardFooter> 
          <Button className="p-2 bg-blue-500 text-white"
          onClick={()=> dispatch(addToCart({id,image,make,price}))}
          >Add to Cart</Button>
          </Card>
       
    </div>
  )
}
