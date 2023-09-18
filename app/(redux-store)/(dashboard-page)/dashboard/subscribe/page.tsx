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
import Loading from '../loading';
import Bugsnag from '@/lib/bugsnagConfig'


export default function Subscribe() {
  const frequencyId = useAppSelector(state => state.frequency.frequencyId);
  const planDetails = useAppSelector(state => state.zipcode.available_services);
  const plans:any = Object.values(planDetails);
  const [btnDisable, setbtnDisable] = useState(false)
  const[loading,setLoading]= useState(true);
  const methods = useForm<DashboardPreferenceDetailsFormValues>(
    {
    defaultValues: {frequencyId:frequencyId},
    resolver: yupResolver(DashboardPreferenceDetailSchema),
    resetOptions: {
      keepDirtyValues: true,
    },
    });
    useEffect(()=>{
      if(frequencyId)
      {
      setLoading(false);
      }
    },[frequencyId]);
  const userID = useAppSelector(state => state.auth.userID);
  const dispatch = useAppDispatch();
  function getServiceIdByProgramId(programId: number) {
    for (const plan of plans) {
      if (plan.programId === programId) {
        return plan.serviceId;
      }
    }
    return null;
  }
  const onSubmit = async(data: any) => {
    setbtnDisable(true);
    const body={
      "customer_id": userID,
      "planId": getServiceIdByProgramId(data.frequencyId),
      "plan_totes": 1, 
    }

    try {
      const response = await postApi(`/v6/users/${userID}/plan/`, body);
      if (response.success) {
        dispatch(fetchFrequency({frequencyId:data.frequencyId}));
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
    setbtnDisable(false);
  }; 
  if(loading)
  {
   return <Loading></Loading>;
  }
  return (
    <div className="p-4 lg:ml-[300px]">
      <div className="px-4 lg:px-12 py-4  mx-auto">
        <h1 className="font-FuturaPTDemi text-4xl">Subscribe & Save</h1>
        <hr />
        <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex gap-4 items-start mt-8">
          <div className="pt-3">
            <CustomRadioButton name="frequencyId"   value="3"  isChecked={3 == frequencyId?true:false} />
            </div>
            <div>
              <div className="flex flex-wrap gap-2 md:gap-8 items-center">
              <h2 className="font-chicle text-orange  text-4xl">
              One Time Laundry Service
              </h2>

             {3 == frequencyId && <div className="bg-green text-white px-4 py-[3px] font-[600] text-sm rounded-full font-FuturaPTBook flex justify-center items-center  ">Current</div>}
              </div>
              <div className="max-w-sm">
              <div className="px-4 py-4 bg-yellow text-white    border rounded-2xl mt-4 text-lg">
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
            <CustomRadioButton  name="frequencyId" value="1"  isChecked={1 == frequencyId?true:false} />
            </div>
            <div>
            <div className="flex flex-wrap gap-2 md:gap-8 items-center">
              <h2 className="font-chicle text-deep-blue   text-4xl">
                Weekly Subscription
              </h2>
              {1 == frequencyId && <div className="bg-green text-white px-4 py-[2px] font-[600] text-sm rounded-full font-FuturaPTBook  ">Current</div>}
              </div>
              <div className="max-w-sm">
              <div className="px-4 py-4 bg-deep-blue text-white   border rounded-2xl mt-4 text-lg">
                <p className=" text-white font-FuturaPTBold text-3xl md:text-5xl lg:text-[40px] text-center lg:text-left ">
                  $ <span className="text-4xl md:text-5xl lg:text-6xl">70</span> /month
                </p>
                <p className="mt-4 font-FuturaPTBook italic ">
                  Fill our reusable laundry bag with your laundry. No need to
                  schedule orders, we’ll pickup every week.
                </p>
                <p className="font-FuturaPTMedium mt-1 font-[450] text-lg">No Fees | No Tipping | Cancel Anytime</p>
              </div>
              </div>
              </div>
          </div>
          {methods.formState.errors.frequencyId && <span role="alert" className={`text-red mb-2 font-FuturaPTBook text-xl font[450]`}>{methods.formState.errors.frequencyId?.message}</span>}
          <div className="flex justify-start mb-4 mt-8 ml-8">
            <CustomButton 
              isDisabled={btnDisable}
              loading={btnDisable}
              title="Update"
              btnType="submit"
              inputStyles="text-md font-[450]  text-white  border px-12 py-[4px] font-FuturaPTMedium"
              loadingStyle="md:text-md text-md"
              loadingSize="w-4 h-4 mr-1"
            />
          </div>
        </form>
        </FormProvider>
      </div>
    </div>
  );
}
