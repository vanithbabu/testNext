"use client";
import { useForm,FormProvider } from "react-hook-form";
import { useState,useEffect } from "react";
import { CustomButton, CustomRadioButton } from "@/components";
import { yupResolver } from "@hookform/resolvers/yup";
import  {DashboardPreferenceDetailsFormValues }from '@/types';
import { DashboardPreferenceDetailSchema } from '@/validations/dashboard.schema';
import { postApi } from '@/lib/apiCallMethod';
import { useAppSelector,useAppDispatch} from '@/store';
import { Toast,capitalizeFirstWord } from '@/lib/toast';
import { errorToast } from '@/constants/utis';
import { fetchFrequency } from "@/store/features/frequency/frequencySlice";
import { useRouter } from 'next/navigation';
import Bugsnag from '@/lib/bugsnagConfig'


import { fetchselectedDate } from "@/store/features/selectedDate/selectedDateSlice";
export default function Plans() {
    const router = useRouter();
    const [btnDisable, setbtnDisable] = useState(false)
    const S_frequencyId = useAppSelector(state => state.frequency.frequencyId);
    const [frequencyId, setfrequencyId] = useState(S_frequencyId);
    useEffect(() => {
      setfrequencyId(S_frequencyId);
      dispatch(fetchselectedDate({ pickupDate: "", deliveryDate: "" }));
    },[S_frequencyId]);
    const methods = useForm<DashboardPreferenceDetailsFormValues>(
      {
      defaultValues: {frequencyId:frequencyId},
      resolver: yupResolver(DashboardPreferenceDetailSchema),
      });
    const userID = useAppSelector(state => state.auth.userID);
    const dispatch = useAppDispatch();
    const onSubmit = async(data: any) => {
        setbtnDisable(true)
      const body={
        "customer_id": userID,
        "frequencyId": data.frequencyId,
        "plan_totes": 1, 
      }
  
      try {
        const response = await postApi(`/v6/users/${userID}/plan/`, body);
        if (response.success) {
          dispatch(fetchFrequency({frequencyId:data.frequencyId}));
          router.push("/laundry/order");
         Toast({ type: 'success', message: "User plan is updated successfully" });
        } else {
          if (response.error == 'Bad Request') {
          
            Toast({ type: 'error', message: capitalizeFirstWord(response.data) });
  
          } else {
            if (response.data && response.data.error) {
            
            } else {
             Toast({ type: 'error', message: capitalizeFirstWord(response.error) });
            }
          }
        }
      } catch (error: any) {
        Bugsnag.notify(error);
        errorToast();
      }
      setbtnDisable(false)
    }; 
    return (
        <div className="bg-primary max-w-7xl mx-auto gap-4 flex  justify-between items-center py-3 px-4 ">
            <div
                className="bg-white w-full md:p-4 rounded-lg shadow-md"
            >
                <div className="mt-3">
                    <h1 className="font-FuturaPTBook  font-[400] text-center text-xl md:text-3xl">Ready for a little more commitment? Try our subscription!</h1>
                </div>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <div className=" grid grid-rows-1 max-w-6xl mx-auto py-4 px-4 justify-center">
                            <div className="flex gap-4 items-start mt-8">
                                <div className="pt-3">
                                    <CustomRadioButton name="frequencyId" value="3" isChecked={3 == frequencyId ? true : false} />

                                </div>
                                <div>
                                    <div className="flex flex-wrap gap-2 md:gap-8 items-center">
                                        <h2 className="font-chicle text-orange  text-4xl">
                                            Repeat Previous Order
                                        </h2>
                                    </div>
                                    <div className="max-w-sm">
                                        <div className="px-4 py-4 bg-orange text-white    border rounded-2xl mt-4 text-lg">
                                            <p className=" text-white font-FuturaPTBold  text-4xl md:text-5xl lg:text-[40px] text-center lg:text-left ">
                                                $ <span className="text-4xl  md:text-5xl lg:text-6xl">1.50</span> /lb
                                            </p>

                                            <p className="font-FuturaPTMedium  font-[450] text-lg">No Minimums | No Fees | No Tipping</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start mt-8">
                                <div className="pt-3">
                                    <CustomRadioButton name="frequencyId" value="1" isChecked={1 == frequencyId ? true : false} />
                                </div>
                                <div>
                                    <h2 className="font-chicle text-deep-blue   text-4xl">
                                        Subscription & Save
                                    </h2>
                                    <div className="max-w-md">
                                        <div className="px-4 py-4 bg-deep-blue text-white   border rounded-2xl mt-4 text-lg">
                                            <p className=" text-white font-FuturaPTBold text-3xl md:text-5xl lg:text-[40px] text-center lg:text-left ">
                                                $ <span className="text-4xl md:text-5xl lg:text-6xl">70</span> /month
                                            </p>
                                            <p className="mt-4 text-sm md:text-lg font-FuturaPTBook italic ">
                                                50lbs of laundry (over 20% discount!)
                                            </p>
                                            <p className="font-FuturaPTBook text-sm md:text-lg italic ">
                                                Recurring weekly pickups
                                            </p>
                                            <p className="font-FuturaPTBook text-sm md:text-lg italic ">
                                                10% discount on any laundry over the monthly 50lbs
                                            </p>
                                            <p className="font-FuturaPTMedium mt-2 font-[450] text-lg">No Fees | No Tipping | Cancel Anytime</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center mb-4 mt-10 ml-8">
                            <CustomButton  
                             loadingStyle="text-xl md:text-2xl"
                             isDisabled={btnDisable}
                             loading={btnDisable}
                                title="Continue"
                                btnType="submit"
                                inputStyles="text-3xl  px-20 py-[6px]  text-white"
                            />
                        </div>
                    </form>
                </FormProvider>
            </div>

        </div>
    )
}