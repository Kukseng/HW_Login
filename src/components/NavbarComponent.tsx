"use client"

import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@heroui/react";
import { usePathname } from "next/navigation";
import CartActionComponent from "./CartComponents/CartActionComponent";

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function NavbarComponent() {

    const pathName = usePathname();

  return (
    <Navbar className="flex justify-between p-4" >
        {/* brand */}
      <NavbarBrand>
        <AcmeLogo />
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand>
       {/* items */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/product" className={
            pathName === '/product' ? `text-red-500 font-semibold`: `text-black font-semibold`
          }>
            Products
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link aria-current="page" href="/about" className={
            pathName === '/about' ? `text-red-500 font-semibold`: `text-black font-semibold`
          }>
             About
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/contact" 
          className={
            pathName === '/contact' ? `text-red-500 font-semibold`: `text-black font-semibold`
          }
          >
            Contact
          </Link>
        </NavbarItem>
      </NavbarContent>
      {/* auth */}
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
            <Link href="/cart">
                 <CartActionComponent/>
            </Link>
       
            
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
