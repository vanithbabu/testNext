import PageHeading from "@/components/common/PageHeading";
import Image from "next/image";
import { howitworks } from "@/constants";
import Link from "next/link";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "How It Works — Laundry Pickup and Delivery Service | Margo's Laundry",
  description:
    "Margo's Laundry picks up, clean, and delivers laundry the next day in Champaign Urbana for just $1.50/lb with free delivery and no fees!",
};
export default function HowItWorks() {
  return (
    <main className="max-w-7xl mx-auto  flex min-h-screen flex-col  justify-between px-4">
      <div className="text-orange font-bold pb-4 lg:pb-8">
        <PageHeading textStyles="mt-8 pt-4 pb-8" title="How It Works" />

        <div className="grid grid-cols-1 md:grid-cols-[45%,45%]  lg:grid-cols-[30%,30%,30%]  place-content-between mt-8">
          {howitworks.map((item) => (
            <div key={item.title} className="flex flex-col items-center mb-6">
              <Image
                src={item.icon}
                blurDataURL={item.icon}
                alt={item.title}
                width={150}
                height={150}
                priority
                placeholder="blur"
                
              />
              <h2 className="font-chicle text-2xl xl:text-3xl mt-6 mb-3  font text-blue">
                {item.title}
              </h2>
              {item.contents.map((content, index) => (
                <p
                  className="pb-2 text-center text-yellow text-lg xl:text-xl  font-FuturaPTBook font-semibold"
                  key={index}
                >
                  {content}
                </p>
              ))}
            </div>
          ))}
        </div>
        <div className="flex justify-center mb-8">
        <Link
              href="/laundry"
              className="rounded-full  bg-blue text-white py-2 px-12 text-3xl  font-FuturaPTMedium hover:opacity-80 "
            >
             Get Started {">>>"}
            </Link>
       
        </div>
      </div>
    </main>
  );
}
