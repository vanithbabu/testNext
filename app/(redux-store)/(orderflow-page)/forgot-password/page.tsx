"use client";
import Link from "next/link";
import Image from "next/image";
import { InputBox, CustomButton } from "@/components";
import { forgotSchema } from '@/validations/auth.schema';
import { useForm,FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { postApi } from '@/lib/apiCallMethod';
import { errorToast } from '@/constants/utis';
import { Toast,capitalizeFirstWord } from '@/lib/toast';
import { useState } from 'react';
import  {ForgotPasswordFormValues }from '@/types';
import {useEffect } from "react";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import Bugsnag from '@/lib/bugsnagConfig'
import MobileHeroImg from '@/public/assets/images/mobile-login.svg'
import HeroImg from '@/public/assets/images/login.webp';

export default function ForgotPassword() {

  const router = useRouter();
  const isAuth =  Cookies.get('cdone_token');
  useEffect(() => {
    if (isAuth) {
      router.push("/dashboard");
    } 
  });

  const [btnDisable, setbtnDisable] = useState(false)
  const methods = useForm<ForgotPasswordFormValues>({
    defaultValues: { email: '' },
    resolver: yupResolver(forgotSchema),
  });

  const onSubmit = async (values: any) => {
    setbtnDisable(true)
    try {
      const response = await postApi('/v6/auth/password/email', values);
      if (response.success && response.data.message) {
        Toast({ type: 'success', message: capitalizeFirstWord(response.data.message) });
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
  }

  return (
    <main className="max-w-7xl mx-auto px-4 lg:px-8 lg:min-h-[60vh] lg:mt-6">
      <div className="flex mb-4 flex-wrap items-center justify-center">
        <div className="w-full lg:w-60 order-2 lg:order-1">
          <div className="lg:bg-white rounded-xl py-8 lg:shadow-md lg:mt-24 ">
            <h1 className="text-orange font-chicle pb-5 lg:pb-0 text-4xl text-center">Forgot Password</h1>
            <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="max-w-md mx-auto  lg:mt-6 px-4">
              <InputBox
                inputStyles="rounded-full mb-4 border border-[#4F4F4F] outline-none italic"
                label="Email"
                placeHolder="Enter Email"
                name="email"
                type="email"
                error={methods.formState.errors.email?.message}
                labelStyles="text-orange font-chicle  text-2xl not-italic"
              />

              <div className="flex justify-center pt-4">
                <CustomButton       
                  loadingStyle="text-xl md:text-2xl"
                  loading={btnDisable}
                  isDisabled={btnDisable}
                  title="Send Reset Link"
                  btnType="submit"
                  inputStyles="text-2xl  text-white  px-6 py-[8px]  hover:opacity-80"
                />
              </div>
            </form>
            </FormProvider>
          </div>

          <div className="flex gap-2 lg:mt-6  justify-center lg:mb-24">
            <p className="font-FuturaPTMedium text-xl md:text-2xl font[450]">Already have an account?</p>
            <Link
              href="/login"
              className=" text-green text-xl md:text-2xl font-FuturaPTMedium font[500]"
            >
              Sign-in
            </Link>
          </div>
        
        </div>
        <div className="w-full lg:w-40 flex justify-center lg:items-end lg:justify-end order-1 lg:order-2">

          <Image
            src={MobileHeroImg}
            alt="Forgot password"
            width={500}
            height={50}
            priority
            className="lg:hidden  pt-4"
          />
          <Image
            src={HeroImg}
            alt="Forgot password"
            width={630}
            height={50}
            priority
            className="hidden lg:block lg:absolute right-0 top-28" 
          />
        </div>
      </div>
    </main>
  );
}
