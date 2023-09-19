"use client";
import Image from "next/image";
import { InputBox, CustomButton } from "@/components";
import { resetSchema } from '@/validations/auth.schema';
import { useForm,FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect,useState } from "react";
import { useSearchParams, useRouter  } from 'next/navigation';
import {postApi} from '@/lib/apiCallMethod';
import { errorToast } from '@/constants/utis';
import { Toast,capitalizeFirstWord } from '@/lib/toast';
import  {DecryptedData,ResetPassworFormValues }from '@/types';
import Bugsnag from '@/lib/bugsnagConfig'
import MobileHeroImg from '@/public/assets/images/mobile-login.svg'
import HeroImg from '@/public/assets/images/login.webp';

export default function ResetPassword() {
  const [btnDisable, setbtnDisable] = useState(false)
  const params = useSearchParams();
  const router = useRouter();
  const [email, setEmail] = useState<string | undefined>();
  const emailToken = params.get('email_token') ?? '';
 
  const decryptToken = async (): Promise<DecryptedData | null> => {
    try {
      const response = await postApi('/v6/email/token/decrypt', { email_token: emailToken.trim().replace(" ", "+") });
      if (response.success) {
        return response.data as DecryptedData;
      } else {
        return null;
      }
    }catch (error: any) {
      Bugsnag.notify(error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const decryptedData = await decryptToken();
      if (decryptedData && decryptedData.status) {
        setEmail(decryptedData.email);
      } else {
        router.push('/forgot-password');
      }
    };
    fetchData();
  }, [router, emailToken]);

  const methods = useForm<ResetPassworFormValues>({
    defaultValues: {  password: '', confirmPassword: '' },
    resolver: yupResolver(resetSchema),
  });
  const onSubmit =async (data: any) => {
    setbtnDisable(true)
    try {
      data.email=email;
      const response = await postApi('/v6/password/webreset', data);
      if (response.success &&  response.data.success) {
        Toast({ type: 'success', message: capitalizeFirstWord(response.data.success) });
        router.push("/login");
      } else {
        Toast({ type: 'error', message: 'No user exit' });
        router.push("/login");
      }
      setbtnDisable(false)
    } catch (error: any) {
      Bugsnag.notify(error);
      errorToast();
      setbtnDisable(false)
      router.push("/login");
    }
  };
  return (
    <main className="max-w-7xl mx-auto px-4 lg:px-8 lg:min-h-[60vh] lg:mt-16">
      <div className="flex mb-4 flex-wrap items-center justify-center">
        <div className="w-full lg:w-60 order-2 lg:order-1">
          <div className="lg:bg-white rounded-xl py-8 lg:shadow-md">
            <h1 className="text-orange font-chicle pb-4 lg:pb-0 text-4xl text-center">Reset Password</h1>
            <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="max-w-md mx-auto  lg:mt-6 px-4">
              <InputBox
                inputStyles="rounded-full mb-4 border border-[#4F4F4F] outline-none italic pr-12"
                label="New Password "
                type="password"
                icon={true}
                IconStyle="top-[48px] right-[20px]"
                name='password'
                error={methods.formState.errors.password?.message}
                placeHolder="Enter New Password"
                labelStyles="text-orange font-chicle text-2xl not-italic"
              />
              <InputBox
                inputStyles="rounded-full mb-4 border border-[#4F4F4F] outline-none italic pr-12"
                label="Confirm Password"
                type="password"
                icon={true}
                IconStyle="top-[48px] right-[20px]"
                name="confirmPassword"
                placeHolder="Enter Confirm Password"
                error={methods.formState.errors.confirmPassword?.message}
                labelStyles="text-orange font-chicle  text-2xl not-italic"
              />

              <div className="flex justify-center pt-4">
                <CustomButton                 
                  loadingStyle="text-xl md:text-2xl"
                  loading={btnDisable}
                  isDisabled={btnDisable}
                  title="Reset Password"
                  btnType="submit"
                  inputStyles="text-2xl  text-white  px-16 py-[8px] hover:opacity-80"
                />
              </div>
            </form>
            </FormProvider>
          </div>
          <div className="lg:mb-20"></div>
        </div>
        <div className="w-full lg:w-40 flex justify-center lg:items-end lg:justify-end order-1 lg:order-2">

          <Image
            src={MobileHeroImg}
            alt="Reset password"
            width={500}
            height={50}
            priority
            placeholder="blur"
            className="lg:hidden  pt-4"
          />
          <Image
            src={HeroImg}
            alt="Reset password"
            width={630}
            height={50}
            priority
            placeholder="blur"
            className="hidden lg:block lg:absolute right-0 top-28" 
          />
        </div>
      </div>
    </main>
  );
}
