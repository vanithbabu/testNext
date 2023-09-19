"use client";
import Link from "next/link";
import Image from "next/image";
import { InputBox, CustomButton } from "@/components";
import { loginSchema } from '@/validations/auth.schema';
import { useForm,FormProvider } from "react-hook-form";
import { LoginApi } from '@/lib/apiCallMethod';
import { yupResolver } from "@hookform/resolvers/yup";
import { errorToast } from '@/constants/utis';
import { Toast,capitalizeFirstWord } from '@/lib/toast';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from "@/store";
import { setLogin } from "@/store/features/auth/authSlice";
import { useState,useEffect } from 'react';
import { fetchProfile } from "@/store/features/profile/profileSlice";
import { fetchCreditCard } from "@/store/features/creditCard/creditCardSlice";
import { fetchOrder } from "@/store/features/orders/orderSlice";
import {fetchOrderData,fetchDashboard} from '@/lib/apiCall';
import {fetchPreferenceData} from "@/lib/apiCall";
import { fetchPreference } from "@/store/features/preferences/preferenceSlice";
import { fetchFrequency } from "@/store/features/frequency/frequencySlice";
import { fetchzipcode } from "@/store/features/zipcode/zipcodeSlice";
import {fetchAddress} from '@/store/features/address/addressSlice';
import { fetchselectedDate } from "@/store/features/selectedDate/selectedDateSlice";
import { fetchscheduling } from "@/store/features/scheduling/schedulingSlice";
import dynamic from 'next/dynamic';
import  {LoginFormValues }from '@/types';
import Cookies from 'js-cookie';
import Bugsnag from '@/lib/bugsnagConfig'
import GoogleImg from '@/public/assets/icons/google.svg';
import FaceBookImg from '@/public/assets/icons/facebook.svg';
import MobileHeroImg from '@/public/assets/images/mobile-login.svg'
import HeroImg from '@/public/assets/images/login.webp';

import { fetchUser } from "@/store/features/createUser/createUserSlice";
const DynamicLoginSocialGoogle = dynamic(
  () => import('reactjs-social-login').then((module) => module.LoginSocialGoogle),
  { ssr: false }
);

const DynamicLoginSocialFacebook = dynamic(
  () => import('reactjs-social-login').then((module) => module.LoginSocialFacebook),
  { ssr: false }
);
export default function Login() {
  const [btnDisable, setbtnDisable] = useState(false)
  const router = useRouter()
  const isAuth =  Cookies.get('cdone_token');
  useEffect(() => {
    if (isAuth) {
      router.push("/dashboard");
    } 
  });
  const dispatch = useAppDispatch();

  const methods = useForm<LoginFormValues>({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(loginSchema),
  });

  const fetchData = async (userID:number) => {
    await Promise.all([
      fetchDashboard(dispatch, fetchProfile, fetchCreditCard,fetchFrequency,fetchzipcode,fetchUser,fetchAddress),
      fetchOrderData(dispatch, fetchOrder, userID),
      fetchPreferenceData(dispatch, fetchPreference, userID),  
    ]);
  };
  const onSubmit = async (values: any) => {

    dispatch(
      setLogin({
        isAuth: false,
        token: "",
        userID: 0,
        userType: 1,
      })
    );
    dispatch(fetchCreditCard([]));
    dispatch(
      fetchProfile({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address_services: {},
        user_orders: {},
        address_time_slot: {},
      })
    );
    dispatch(fetchOrder([]));
    dispatch(fetchFrequency({ frequencyId: 3 }));
    dispatch(fetchselectedDate({ pickupDate: "", deliveryDate: "" }));
    dispatch(fetchzipcode({ zipcode: 0, available_services: [] }));
    dispatch(
      fetchscheduling({
        storeId: 0,
        address_id: 0,
        pickupDate: [],
        deliverydDate: [],
      })
    );
    dispatch(
      fetchPreference({
        delivery_loc: "",
        delivery_notes: ""
      })
    );
    dispatch(
      fetchUser({
        id: 0,
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
      })
    );
    dispatch(
      fetchAddress({
        address: "",
        city: "",
        state: "",
        address2:"",
        unitNumber:false
      })
    );
    Cookies.remove("cdone_oauth_token");
    Cookies.remove("cdone_token");
    setbtnDisable(true)
    try {
      const response = await LoginApi('/v6/auth/login', values);
      if (response.success && response.data.token) {
        Toast({ type: 'success', message:'Login successfully' });
        dispatch(setLogin({
          isAuth: true,
          token: response.data.token,
          userID: response.data.user_id,
          userType: response.data.user_type
        }));
        const userID =response.data.user_id;
        fetchData(userID);
      
        setbtnDisable(false)
        router.push("/dashboard");
      } else {
        if (response.error == 'Unauthorized') {
          Toast({ type: 'error', message: capitalizeFirstWord(response.data) });
          setbtnDisable(false)
        } else {
          if (response.data) {
            Toast({ type: 'error', message: capitalizeFirstWord(response.data) });
          } else {
            Toast({ type: 'error', message: capitalizeFirstWord(response.error) });
          }
          setbtnDisable(false)
        }
      }
    } catch (error: any) {
      Bugsnag.notify(error);
      setbtnDisable(false)
      errorToast();
    }
  }


  return (
    <main className="max-w-7xl mx-auto px-4 lg:px-8">
      <div className="flex mb-4 flex-wrap items-center justify-center">
        <div className="w-full lg:w-60 order-2 lg:order-1">
          <div className="lg:bg-white rounded-xl py-8 lg:shadow-md mt-8">
            <div className="flex  md:flex-row justify-center mb-4   max-w-md mx-auto">
              <div className="justify-center flex gap-2 w-full">
            
              <div className="w-full">
                <Link href={`${process.env.NEXT_PUBLIC_API_END_POINT}/v4/login/google`}>
                <CustomButton
                  rightIcon={GoogleImg}
                  title="Google"
                  btnType="submit"
                  inputStyles="bg-white md:w-[200px] flex justify-center text-xl lg:text-2xl text-[#828282] border font-FuturaPTMedium hover:bg-blue hover:text-white hover:border-blue hover:border inline-flex gap-2 lg:gap-2  px-8 items-center"
                /></Link>
                </div>
               
                <div className="w-full">
                <Link href={`${process.env.NEXT_PUBLIC_API_END_POINT}/v4/login/facebook`}>
                <CustomButton
                  rightIcon={FaceBookImg}
                  title="Facebook"
                  btnType="submit"
                  inputStyles="bg-white md:w-[200px] flex justify-center  text-xl lg:text-2xl text-[#828282] border font-FuturaPTMedium hover:bg-blue hover:text-white hover:border-blue hover:border inline-flex gap-2 lg:gap-2  px-8 items-center"
                />
                </Link>
              </div>
              </div>
            </div>

            <div className="flex gap-1 items-center font-FuturaPTBold font[600]">
              <span className="w-1/2 bg-[#DBDBDB] h-[2px]"></span>
              OR
              <span className="w-1/2 bg-[#DBDBDB] h-[2px]"></span>
            </div>
            <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="max-w-md mx-auto mt-8 ">
              <InputBox
                inputStyles="rounded-full mb-2 border border-[#4F4F4F] outline-none"
                label="Email"
                name="email"
                type="email"
                error={methods.formState.errors.email?.message}
                placeHolder="Enter Email"
                labelStyles="text-orange font-chicle text-2xl not-italic"
              />
              <InputBox
                inputStyles="rounded-full mb-2 border border-[#4F4F4F] outline-none pr-12"
                label="Password"
                type="password"
                icon={true}
                IconStyle="top-[48px] right-[20px]"
                name="password"
                placeHolder="Enter Password"
                error={methods.formState.errors.password?.message}
                labelStyles="text-orange font-chicle  text-2xl not-italic"
              />

              <div className="flex justify-center pt-4">
                <CustomButton              
                  loadingStyle="text-xl md:text-2xl"
                  isDisabled={btnDisable}
                  loading={btnDisable}
                  title="Continue"
                  btnType="submit"
                  inputStyles="text-3xl  text-white  px-16 py-[8px]  hover:opacity-80"
                />
              </div>

              <div className="text-center py-3">
                <Link
                  href="/forgot-password"
                  className=" text-green text-xl font-FuturaPTMedium font[450]"
                >
                  Forgot Password ?
                </Link>
              </div>
            </form>
            </FormProvider>
          </div>

          <div className="flex gap-2 lg:mt-4 flex-wrap justify-center">
            <p className="font-FuturaPTBook text-xl font[450] ">
              By signing in, you agree to our
            </p>
            <Link
              href="/terms-conditions"
              className=" text-green text-xl font-FuturaPTMedium font[450]"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
        <div className="w-full lg:w-40 flex justify-center lg:items-end lg:justify-end order-1 lg:order-2">

          <Image
            src={MobileHeroImg}
            alt="login"
            width={500}
            height={50}
            priority
            className="lg:hidden pb-4 pt-4"
          /> 
          <Image
            src={HeroImg}
            alt="login"
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
