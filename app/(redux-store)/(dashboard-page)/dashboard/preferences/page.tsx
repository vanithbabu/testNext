"use client";
import { useForm, FormProvider } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { CustomButton, CustomRadioButton, InputBox, TextArea } from '@/components';
import { yupResolver } from "@hookform/resolvers/yup";
import { DashboardOrderDetailsFormValues } from '@/types';
import { Toast,capitalizeFirstWord } from '@/lib/toast';
import { errorToast } from '@/constants/utis';
import { postApi,getApi } from '@/lib/apiCallMethod';
import { useAppSelector, useAppDispatch } from '@/store';
import { DashboardOrderDetailSchema } from '@/validations/dashboard.schema';
import { fetchPreference } from "@/store/features/preferences/preferenceSlice";
import { fetchPreferenceData } from "@/lib/apiCall";
import { profileInputLabelStyle } from '@/styles';
import Bugsnag from '@/lib/bugsnagConfig'

import Loading from '../loading';

export default function Preferences() {
  const dispatch = useAppDispatch();
  const [showUnit, setShowUnit] = useState<boolean>(false);
  const [showPreferenceOptions, setPreferenceOptions] = useState<any>([]);
  const userID = useAppSelector(state => state.auth.userID);
  const delivery_loc = useAppSelector(state => state.preference.delivery_loc);
  const delivery_notes = useAppSelector(state => state.preference.delivery_notes);
  const unit_number = useAppSelector(state => state.address.address2);
  const unitNumber = useAppSelector(state => state.address.unitNumber);
  const [btnDisable, setbtnDisable] = useState(false)
  
  const [loading,setLoading] = useState(true)
  const methods = useForm<DashboardOrderDetailsFormValues>({
    defaultValues: { delivery_loc: delivery_loc, delivery_notes: delivery_notes,unit_number:unit_number },
    resolver: yupResolver(DashboardOrderDetailSchema),
    resetOptions: {
      keepDirtyValues: true,
    },
  });
  const showLocationFieldOption=async()=>{
    try {
      const response = await getApi(`/v6/bags/locations`);
      if (response.success) {
        setPreferenceOptions(response.data);
        setLoading(false)
      } 
    } catch (error: any) {
      Bugsnag.notify(error);
    }
  }
  useEffect(()=>{
    showLocationFieldOption();
  },[])

  useEffect(() => {

    if (unitNumber) {
      setShowUnit(true)
    }
    methods.setValue('unit_number', unit_number);
    if (delivery_loc != '') {
      methods.setValue('delivery_loc', delivery_loc);
    }
  }, [ delivery_loc,unitNumber])

  const onSubmit = async (data: any) => {
    setbtnDisable(true)
    try {
      const response = await postApi(`/v6/users/${userID}/preferences`, data);
      if (response.success) {
        fetchPreferenceData(dispatch, fetchPreference, userID);
        Toast({ type: 'success', message: "User preferences updated successfully" });
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
  }
  if(loading)
  {
   return <Loading></Loading>;
  }



  return (
    <div className="p-4 lg:ml-[300px]">
      <div className="px-4 lg:px-12 py-4  mx-auto">
        <h1 className="font-FuturaPTDemi text-3xl">Update Your Preferences</h1>
        <hr />
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} >
            <h2 className="font-FuturaPTDemi text-2xl mt-8">Pickup from</h2>
            <div className='flex flex-wrap gap-4 mt-4'>
              {showPreferenceOptions.map((option:any)=>{
                return(
                  <CustomRadioButton key={option.id} name="delivery_loc" isChecked={delivery_loc == option.location ? true : false} label={option.location} value={option.location} labelStyles='text-[#1E1E1E] italic text-lg font-FuturaPTBook' />
                )
              })}
            </div>
            {methods.formState.errors.delivery_loc && <span role="alert" className={`text-red mb-2 font-FuturaPTBook text-xl font[450]`}>{methods.formState.errors.delivery_loc?.message}</span>}
            <h2 className="font-FuturaPTDemi text-2xl mt-8 mb-4">Pickup Instructions</h2>
            <TextArea value={delivery_notes} placeHolder='Come to front door & buzz 303' name="delivery_notes" rows={3} inputStyles={' w-full sm:w-[350px]  rounded-[15px] border border-[#92999E]'} />
           
             {showUnit && <InputBox  label="Enter Unit Number"  labelStyles={`${profileInputLabelStyle} not-italic mt-2`}  name="unit_number" inputStyles=' w-full sm:w-[350px]  rounded-xl mt-4 border border-[#92999E]' placeHolder='Unit Number' />}

            <div className="flex justify-start mb-4 mt-0">
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
  