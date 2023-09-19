"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from 'next/navigation'
import FlowerImg from '@/public/assets/images/flower.svg';
import MargoLogo from '@/public/assets/images/margo_logo.svg';
const OrderFlowHeader = () => {
  const pathname = usePathname()
  return (
    <header className="relative">
      <div className="absolute right-0">
        <Image
          className="hidden lg:block"
          src={FlowerImg}
          alt="Margo Logo"
          width="120"
          height={45}
          priority
          placeholder="blur"
        />
      </div>
      <nav className="max-w-7xl mx-auto  flex  justify-between items-center py-8 gap-4 px-4 lg:px-8">
        <Link href="/" className="flex justify-center items-center">
          <Image
            className="block"
            src={MargoLogo}
            alt="Margo Logo"
            width="500"
            height={45}
            priority
            placeholder="blur"
          />
        </Link>
        { pathname !== '/laundry/help' ? <Link href="/laundry/help" className="flex cursor-pointer z-30 text-sm hover:opacity-80 justify-center items-center md:text-md lg:text-lg bg-green text-white px-4 py-[4px] md:px-8 md:py-[8px] font-[600]  rounded-full font-FuturaPTBook">
          Help
        </Link> : ''
        }
      </nav>

    </header>
  );
};
export default OrderFlowHeader;
