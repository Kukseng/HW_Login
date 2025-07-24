
"use client"
import {  useAppDispatch} from "@/redux/hooks";
import { Button } from "./ui/button";
import { decrement, increment } from "@/redux/features/counter/counterSlice";


export default function TestComponent(){
    
 
    const dispatch = useAppDispatch();

    return (
        <div>

            {/* button for increase */}
            <Button onClick={()=> dispatch(increment())}
            >Increase</Button>
           
            {/* button for decrease */}
            <Button onClick={()=> dispatch(decrement())}>Decrease</Button>

        </div>
    )
}