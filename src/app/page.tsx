import CartDisplay from "@/components/CartComponents/DisplayAddToCart";
import ProductList from "@/components/ProductList";


export default function Home() {
  return (
   <div>
  <ProductList/>
  <CartDisplay/>
   </div>
  );
}
