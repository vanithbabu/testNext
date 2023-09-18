"use client";
import {useForm,FormProvider } from 'react-hook-form';
import { InputBox,CustomButton } from "@/components";
import { yupResolver } from "@hookform/resolvers/yup";
import { subscribeSchema } from '@/validations/auth.schema';
import  {SubscribeFormValues }from '@/types';
import { Toast } from '@/lib/toast';
import { useState } from 'react';
import Bugsnag from '@/lib/bugsnagConfig'

import { errorToast } from '@/constants/utis';

const SubscribeForm = () => {
  const [btnDisable, setbtnDisable] = useState(false)
  const methods = useForm<SubscribeFormValues>({
    defaultValues: { email: ''},
    resolver: yupResolver(subscribeSchema),
  });
  const onSubmit = async (data: any) => {
    setbtnDisable(true);
    try {
      if (data.email) {
        const formData = new FormData();
        // Hidden field key/values.
        formData.append("u", "3");
        formData.append("f", "3");
        formData.append("s", "s");
        formData.append("c", "0");
        formData.append("m", "0");
        formData.append("act", "sub");
        formData.append("v", "2");
        formData.append("or", "8cc8bbc4d203e903527fcc360596a05a");
  
        formData.append("email", data.email);
  
        fetch('https://cleanersdepot.activehosted.com/proc.php', {
          method: 'POST',
          body: formData,
          mode: 'no-cors',
        }).then(response => {
          Toast({ type: 'success', message: "We will get back to you" });
          methods.reset()
        }).catch ((error: any)=> {
          Bugsnag.notify(error);
          Toast({ type: 'error', message: "Something went wrong!" });
        })
      }
      else
      {
        Toast({ type: 'error', message: "Enter the email ID" });
      }
    } catch (error: any) {
      Bugsnag.notify(error);
      errorToast();
    
    }
    setbtnDisable(false);
  };
    return(
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-8 mt-4">
            <div className="block text-center lg:flex gap-8 items-start ">
              <InputBox
              type="email"
              name='email'
              placeHolder="Email Address"
              error={methods.formState.errors.email?.message}
              inputStyles="py-2 min-w-[300px] mb-4 text-yellow text-lg"
            />
            <CustomButton
             isDisabled={btnDisable}
             loading={btnDisable}
              title="Sign Up >>>"
              btnType="submit"
              inputStyles="text-3xl  text-white  py-2 px-16 mb-4  hover:opacity-80"
            />
       </div>
    
      </form>
      </FormProvider>
    );

}



export default SubscribeForm;
