import PageHeading from "@/components/common/PageHeading";
import type { Metadata } from "next";
import { pricing } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import PriceAccordion from "@/components/common/PriceAccordion";
import ClothBasketImg from '@/public/assets/images/cloth_basket.webp';
export const metadata: Metadata = {
  title: "Pricing — Laundry Pickup and Delivery Service | Margo's Laundry",
  description:
    "Margo's Laundry picks up, clean, and delivers laundry the next day in Champaign Urbana for just $1.50/lb with free delivery and no fees!",
};

export default function Pricing() {
  return (
    <main className="max-w-7xl mx-auto  flex min-h-screen flex-col  justify-between px-4">
      <div className="text-orange font-bold pb-4 lg:pb-8">
        <PageHeading textStyles="mt-8 pb-8" title="Pricing" />

        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-4 place-content-between mt-4 lg:mt-8">
          <div className="flex justify-center items-start   pt-2 lg:pt-8 pb-8">
            <Image
              src={ClothBasketImg}
              priority
              alt={"flower"}
              width={600}
              height={350}   
              className="object-contain"
            />
          </div>

          <div className="flex flex-col justify-center items-center lg:block">
            <h2 className="font-chicle text-3xl md:text-4xl inline-block  mb-2  bg-blue text-white px-8 py-2 rounded-[15px]">
              {pricing.heading}
            </h2>
            <div className="lg:px-8 ">
              <p className="py-3 lg:px-4 pb-6 text-orange font-chicle text-6xl text-center lg:text-left ">
                <span className="text-9xl">$ {pricing.price}</span> /lb.
              </p>
              {pricing.description.map((item) => (
                <PriceAccordion key={item.title} title={item.title} content={item.content} />
              ))}
              <div className="px-8 flex justify-center lg:block mb-8 lg:ml-4 lg:mt-8">
              <Link
              href="/laundry"
              className="rounded-full  bg-blue text-white py-2 px-12 text-3xl font-FuturaPTMedium  hover:opacity-80"
            >
             Get Started {">>>"}
            </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
