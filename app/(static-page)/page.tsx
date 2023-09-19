import Link from "next/link";
import Image from "next/image";
import {SubscribeForm} from '@/components';
import HeroBanner from '@/public/assets/images/hero_banner.webp';
import SeeOurPricingImg  from '@/public/assets/images/see_our_pricing.webp';
import HowitsWorkImg from '@/public/assets/images/howitswork.webp';
export default function Home() {
  return (
    <main className=" font-FuturaPTMedium  min-h-screen ">
      <section className="grid grid-cols-1  lg:grid-cols-[55%,45%]  xl:grid-cols-[65%,35%] max-w-7xl mx-auto py-6 lg:py-8  px-4">
        <div className="px-4 lg:px-0">
          <h2 className="font-chicle  text-7xl lg:text-9xl text-center mb-4 text-blue">
            Laundry the
          </h2>
          <h2 className="font-chicle text-7xl lg:text-9xl text-center mb-4 text-blue">
            2020s Way
          </h2>
          <p className="text-orange lg:leading-[4rem] font-chicle text-3xl lg:text-5xl text-center ">
            Professionally washing, drying, & folding laundry for just $1.50 per pound </p>

          <p className="text-yellow font-FuturaPTMedium  text-3xl pt-4 text-center">
            Free Delivery | No Fees
          </p>
          <p className="text-yellow font-FuturaPTMedium  text-3xl pt-2 text-center">
            No Minimums | No Tipping
          </p>
          <div className="text-center  pt-8 mb-8 ">
            <Link
              href="/laundry"
              className="custom-btn rounded-full bg-blue text-white py-2 px-12 text-3xl  hover:opacity-80  font-FuturaPTMedium "
            >
              Get Started {">>>"}
            </Link>
          </div>
        </div>

        <div className="flex justify-center lg:justify-center">
          <Image
            src={HeroBanner}
            sizes="100vw"
            style={{
              width: '100%',
              height: 'auto',
            }}
            alt="See Our Pricing"
         
            priority
          />
        </div>
      </section>

      <section className="bg-yellow text-white mb-4">
        <div className="grid grid-cols-1   lg:grid-cols-[40%,60%] max-w-6xl mx-auto py-12  place-content-center px-4 ">
          <div className="px-4">
            <div className="flex justify-center mb-8 lg:mb-0 lg:mt-0  lg:justify-start">
              <Image
                src={SeeOurPricingImg}
                placeholder="blur"
                alt="See Our Pricing"
                width={400}
                height={400}
              />
            </div>
          </div>
          <div className="">
            <p className="text-center mb-8 font-FuturaPTMedium  text-xl lg:pt-4">
              Complicated pricing and hidden fees are a drag. That’s why we’re
              all about transparency when it comes to our laundry pickup and
              delivery service. And that goes for our team too. We’ll make sure
              they are compensated fairly. No tipping necessary.
            </p>
            <h2 className="font-chicle text-5xl lg:leading-[3.8rem] text-center mb-8">
              Delivering the highest quality clean for the best price.
            </h2>
            <div className="text-center">
              <Link
                href="/pricing"
                className="custom-btn rounded-full bg-white text-yellow hover:opacity-80 py-2 px-12 text-3xl  font-FuturaPTMedium "
              >
                See Our Pricing {">>>"}
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-blue  text-white ">
        <div className=" grid grid-cols-1   lg:grid-cols-[65%,35%] max-w-6xl mx-auto py-12  px-4 ">
          <div className="px-4">
            <h2 className="font-chicle text-5xl  lg:leading-[3.8rem] text-center mb-8">
              Make shared laundry & laundromats a thing of the past!
            </h2>
            <p className="text-center mb-8  font-FuturaPTMedium text-xl">
              With our super-convenient pickup & next day delivery there’s no
              excuse not to leave the laundry to us. The Margo’s Laundry team is
              trained to deliver top quality cleaning. And our drivers go
              through a background screening so you shouldn’t worry about
              trusting us with your stuff. Spend your time doing something more
              important- or just take an extra nap. No judgement. We’ve got you
              covered.
            </p>
            <div className="text-center">
              <Link
                href="/howitworks"
                className="custom-btn  rounded-full bg-white text-blue hover:opacity-80  py-2 px-12  text-3xl font-FuturaPTMedium "
              >
                How It Works {">>>"}
              </Link>
            </div>
          </div>
          <div className="flex justify-center mt-8 lg:mt-0  lg:justify-end">
            <Image
              src={HowitsWorkImg}
              alt=" How It Works"
              width={250}
              height={361}
              placeholder="blur"
            />
          </div>
        </div>
      </section>

      <section className=" text-white mb-4">
        <div className=" max-w-5xl mx-auto py-12 flex flex-col justify-center items-center px-4 ">
          <h2 className="text-yellow mb-4 text-5xl font-chicle">Subscribe</h2>
          <p className="text-yellow mb-8 font-FuturaPTMedium text-xl text-center">
            Sign up with your email address to receive news and updates from
            Margo.
          </p>

          <SubscribeForm />
           
        </div>
      </section>
    </main>
  );
}
