"use client";
import {CustomButton} from "@/components";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppSelector } from '@/store';
import {dayOfWeekFormat} from '@/lib/dateConversion';
import { useEffect, useState } from "react";
import AllOrderThankYouImg from '@/public/assets/images/Thankyou_page_2.webp';
export const AllOrder = () => {
    const router = useRouter();
    const [loading,setLoading]=useState(true);
    const pickupDates:any = useAppSelector(state => state.selectedDate.pickupDate);
    useEffect(()=>{
     
        setLoading(false);
    },[pickupDates]);
    return (
        <>
            <section>
                <div className=" grid grid-cols-1 lg:grid-cols-[60%,40%] max-w-6xl mx-auto py-4 px-4 text-center md:text-left">
                    <div className="pl-2 self-center">
                        <div className="hidden md:block">
                            <div className="pt-4">
                                <h1 className="font-FuturaPTBook text-xl md:text-3xl text-black ">We’ll see you on <span className="text-green font-FuturaPTMedium  font-[600]">MONDAY</span></h1>
                            </div>
                            <div className="pb-4">
                                <h3 className="font-FuturaPTDemi text-blue text-xl md:text-2xl">Please have your laundry out by 8am</h3>
                            </div>
                        </div>
                        <div className="py-4">
                            <h3 className="font-FuturaPTBook text-black text-xl md:text-2xl">Please put order in our reusable Margo’s Laundry Bag </h3>
                        </div>
                        <div className="py-4">
                            <h1 className="font-FuturaPTDemi text-xl md:text-2xl">We’ll text you when the driver is on their way.</h1>
                        </div>

                        <div className="py-4">
                            <CustomButton
                                handleClick={ () => router.push('/dashboard')}
                                title="Go to Profile"
                                btnType="button"
                                inputStyles="text-3xl  text-white"
                            />
                        </div>

                    </div>
                    <div className="flex flex-col justify-center order-first md:order-last">
                        <div className="block md:hidden">
                            <div className="py-2">
                                <h1 className="font-FuturaPTBook text-xl md:text-3xl text-black ">We’ll see you on <span className="text-green font-FuturaPTMedium  font-[600]">{dayOfWeekFormat(pickupDates)}</span></h1>
                            </div>
                            <div className="pb-6">
                                <h3 className="font-FuturaPTDemi text-blue text-xl md:text-2xl italic">Please have your laundry out by 8am</h3>
                            </div>
                        </div>
                        <Image
                            src={AllOrderThankYouImg}
                            priority
                            alt="Thankyou page"
                            width={320}
                            height={40}
                        
                           
                        />
                    </div>
                </div>
            </section>
        </>
    );
}
  