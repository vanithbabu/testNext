"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { headerLinks } from "@/constants";

const Header = () => {
  const [navbar, setNavbar] = useState<boolean>(false);
  return (
    <header className="sticky top-0 z-10 bg-[#fcf5f2] shadow-sm">
      <nav className="max-w-7xl mx-auto  flex  justify-between items-center py-6 px-4 ">
        <Link href="/" className="flex justify-center items-center">
          <Image
            src="/assets/images/margo_logo.svg"
            alt="Margo Logo"
            width="400"
            height={45}
            blurDataURL={"/assets/images/margo_logo.svg"}
            priority
            placeholder="blur"
          />
        </Link>
        <ul className="hidden  gap-8 xl:gap-12 text-blue text-xl xl:text-2xl font-FuturaPTBook font-semibold  lg:flex">
        {headerLinks.map((item) => (
          <li key={item.title} className="hover:text-deep-blue">
            <Link  href={item.url} >{item.title}</Link>
          </li>
          ))}
         
        </ul>

        <Link
              href="/laundry"
              className="hidden rounded-full  lg:block bg-blue text-white py-2 px-12 text-3xl hover:opacity-80 font-FuturaPTMedium"
            >
             Schedule Pickup
            </Link>
        {/* mobile menu */}
        <div className="ml-4 lg:hidden">
          <button
            className="p-2 text-blue rounded-md outline-none border border-blue focus:border-blue focus:border"
            onClick={() => setNavbar(!navbar)}
          >
            {navbar ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>
      <div
        className={` flex-1 justify-self-center pb-3 mt-8 lg:pb-0 lg:mt-0 lg:hidden ${
          navbar ? "block" : "hidden"
        }`}
      >
        <ul className="items-center justify-center text-2xl px-4 space-y-4 lg:flex lg:space-x-6 lg:space-y-0 text-center text-blue font-FuturaPTBook font-semibold ">
        {headerLinks.map((item) => (
          <li key={item.title}>
            <Link  onClick={() => setNavbar(false)} href={item.url}>{item.title}</Link>
          </li>
          ))}
          <li className="pb-4">
            {" "}
             <Link
              href="/laundry"
              className="rounded-full lg:hidden bg-blue text-white py-2 px-12 text-3xl hover:opacity-80 font-FuturaPTMedium "
            >
             Schedule Pickup
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};
export default Header;
