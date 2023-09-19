import Link from "next/link";
import Image from "next/image";
import SchedulePickupImg from '@/public/assets/images/schedule-pickup.webp';
import MobileSchedulePickupImg from '@/public/assets/images/hero_banner.webp';
export default function Laundry() {
    return (
      <main className="max-w-7xl mx-auto px-4 lg:px-8 lg:my-16 lg:min-h-[60vh] ">
        <div className=" mb-4 flex-wrap items-center justify-center hidden lg:flex">
          <div className="w-full lg:w-60">

            <h1 className=" text-8xl font-chicle text-blue font-[500] mb-4 mt-16 ">A Laundry Service </h1>
            <h1 className=" text-8xl font-chicle text-blue font-[500] mb-16"> For Everyone</h1>

            <Link
              href="/laundry/zipcode"
              className="rounded-full bg-blue text-white  hover:opacity-80 py-2 px-8 text-3xl  font-FuturaPTMedium "
            >
              Get Started {'>>>'}
            </Link>
            <div className="flex gap-2 mt-12 mb-4">
              <p className="font-FuturaPTMedium text-xl md:text-2xl font[450]">Already have an account?</p>
              <Link
                href="/login"
                className=" text-green text-xl md:text-2xl font-FuturaPTMedium font[500] pb-8"
              >
                Sign-in
              </Link>
            </div>
          </div>
          <div className="w-full lg:w-40 items-end justify-end ">
            <Image
              src={SchedulePickupImg}
              alt="See Our Pricing"
              width={630}
              height={50}
              priority
              className="lg:absolute right-0 top-28 pt-2 "
            />

          </div>
        </div>

        <div className="lg:hidden">
          <div className="flex justify-center lg:justify-center">
            <Image
              src={MobileSchedulePickupImg}
              alt="See Our Pricing"
              width={500}
              height={50}
              priority
            />
          </div>
          <h1 className=" text-4xl  text-center font-chicle text-blue font-[500] mb-4 mt-8 ">A Laundry Service For Everyone</h1>
          <div className="flex justify-center pt-4">
            <Link
              href="/laundry/zipcode"
              className="rounded-full bg-blue text-white  hover:opacity-80 py-2 px-8 text-3xl  font-FuturaPTMedium  "
            >
              Sign up {'>>>'}
            </Link>
          </div>
          <div className="flex justify-center gap-2 mt-6 pb-8">
            <p className="font-FuturaPTMedium text-xl font[450]">Already have an account?</p>
            <Link
              href="/login"
              className=" text-green text-xl font-FuturaPTMedium font[450]"
            >
              Sign-in
            </Link>
          </div>
        </div>

      </main>
    );
  }
  