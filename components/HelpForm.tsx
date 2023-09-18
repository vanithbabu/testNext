"use client";
import {useForm,FormProvider } from 'react-hook-form';
import { InputBox, TextArea,CustomButton } from "@/components";
import { userContactSchema } from '@/validations/contact.schema';
import { yupResolver } from "@hookform/resolvers/yup";
import  {HelpFormValues }from '@/types';
import { postApi } from '@/lib/apiCallMethod';
import { Toast,capitalizeFirstWord } from '@/lib/toast';
import { useState } from 'react';
import { errorToast } from '@/constants/utis';
import Bugsnag from '@/lib/bugsnagConfig'


const HelpForm = () => {
  const [btnDisable, setbtnDisable] = useState(false)
  const methods = useForm<HelpFormValues>({
    defaultValues: { email: '', subject: '' ,message: ''},
    resolver: yupResolver(userContactSchema),
  });
 
  const onSubmit = async (values: any) => {
    setbtnDisable(true)
    try {
      const response = await postApi('/v7/help', values);
      if (response.success) {
        Toast({ type: 'success', message: capitalizeFirstWord(response.data.message) });
        methods.reset()
        setbtnDisable(false)
      } else {
        if (response.error == 'Unprocessable Content') {
          Toast({ type: 'error', message: capitalizeFirstWord(response.data) });
        } else {
            Toast({ type: 'error', message: 'The given data was invalid' });
        }
        setbtnDisable(false)
      }
    } catch (error: any) {
      Bugsnag.notify(error);
      errorToast();
      setbtnDisable(false)
    }
  };

    return(
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-3 max-w-sm">
        <InputBox
          name="subject"
          type="text"         
          error={methods.formState.errors.subject?.message}
          label="How Can We Help ?"  
          labelStyles='text-orange  font-FuturaPTMedium not-italic  font-semibold text-2xl'
          placeHolder="Enter Your Subject"
          inputStyles="text-lg rounded-[15px] border-[#92999E] focus:border-orange py-[8px] "
        />
        <InputBox
          name="email"
          type="email"         
          label="Enter Your Email"  
          error={methods.formState.errors.email?.message}
          labelStyles='text-orange  font-FuturaPTMedium not-italic  font-semibold text-2xl'
          placeHolder="Enter Your Email"
          inputStyles="text-lg rounded-[15px] border-[#92999E] focus:border-orange py-[8px] "
        />
         
        <TextArea
          name="message"
          label="Description"  
          labelStyles='text-orange   font-FuturaPTMedium not-italic  font-semibold text-2xl'
          rows={5}
          placeHolder="Enter Here"
          error={methods.formState.errors.message?.message}
          inputStyles="text-lg  rounded-[15px] border-[#92999E] focus:border-orange "
        ></TextArea>
        <div className="flex justify-center mb-4">
          <CustomButton        
           loadingStyle="text-xl md:text-2xl"
           isDisabled={btnDisable}
           loading={btnDisable}
            title="Submit"
            btnType="submit"
            inputStyles="text-xl text-white  px-12 py-[8px] font-FuturaPTMedium"
          />
        </div>
      </form>
      </FormProvider>
    );

}



export default HelpForm;
