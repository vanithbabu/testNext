"use client";
import {
  CustomButton,
  InputBox,
} from "@/components";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useForm, FormProvider,Controller  } from "react-hook-form";
import { dashboardStyle, labelStyleCreateAcount } from "@/styles";
import { createAccountSchema,updateUserAccountSchema } from "@/validations/auth.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { postApi } from "@/lib/apiCallMethod";
import { errorToast } from "@/constants/utis";
import { Toast } from "@/lib/toast";
import { CreateAccountFormValues,updateAccountFormValues } from "@/types";
import { useAppSelector, useAppDispatch } from "@/store";
import { fetchUser } from "@/store/features/createUser/createUserSlice";
import { LoginApi } from "@/lib/apiCallMethod";
import { setLogin } from "@/store/features/auth/authSlice";
import Bugsnag from '@/lib/bugsnagConfig'

import dynamic from 'next/dynamic';
const DynamicLoginSocialGoogle = dynamic(
  () => import('reactjs-social-login').then((module) => module.LoginSocialGoogle),
  { ssr: false }
);

const DynamicLoginSocialFacebook = dynamic(
  () => import('reactjs-social-login').then((module) => module.LoginSocialFacebook),
  { ssr: false }
);
interface AccountInfoDetailsProps {
  currentStep: number;
  nextStep: (values: number) => void;
  errorMsg: string;
  showAccountErrorMsg: (values: string) => void;
  ID:string;
  accountInfoReference:any;
  paymentDetailReference:any;
}
export const AccountInfo: React.FC<AccountInfoDetailsProps> = ({
  currentStep,
  nextStep,
  showAccountErrorMsg,
  errorMsg,
  ID,
  accountInfoReference,
  paymentDetailReference,
}) => {
  const first_name = useAppSelector((state) => state.createUser.first_name);
  const last_name = useAppSelector((state) => state.createUser.last_name);
  const email = useAppSelector((state) => state.createUser.email);
  const phone = useAppSelector((state) => state.createUser.phone);
  const [btnDisable, setbtnDisable] = useState(false);
  const [alreadyAccount, setAlreadyAccount] = useState(false);
  const methods = useForm<CreateAccountFormValues>({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(createAccountSchema),
  });

  const HandleFormatPhone = (value : any, methods:any) => {
    const phone = value;
    const cleanedInput = phone.replace(/-/g, '');
    if (cleanedInput.length >= 10) {
    const cleanedAndTrimmed = cleanedInput.slice(0, 10);
    if (cleanedAndTrimmed) {
      const formattedPhoneNumber =
        cleanedAndTrimmed.slice(0, -4).match(/.{1,3}/g).join('-') +
        '-' +
      cleanedAndTrimmed.slice(-4);
      methods.setValue('phone', formattedPhoneNumber);
  }
}
};

  const loadformatPhoneNumber = (value:any) => {
    const phone = value;
    const cleanedInput = phone.replace(/-/g, '');
    const cleanedAndTrimmed = cleanedInput.slice(0, 10);
    if (cleanedAndTrimmed) {
      const formattedPhoneNumber =
        cleanedAndTrimmed.slice(0, -4).match(/.{1,3}/g).join('-') +
        '-' +
      cleanedAndTrimmed.slice(-4);
      return formattedPhoneNumber;
     
  }
  return phone;
  };
 

  const updateUsermethods = useForm<updateAccountFormValues>({
    defaultValues: {
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone: phone,
    },
    resolver: yupResolver(updateUserAccountSchema),
  });

  const dispatch = useAppDispatch();
  const userID = useAppSelector((state) => state.auth.userID);

 
 
  const onSubmit = async (values: any) => {
    let errorMsg = "";
    setbtnDisable(true);
    setAlreadyAccount(false);
    try {
      values.phone = values.phone.replace(/-/g, '');
      const response = await postApi("/v6/users", values);
       

      if (!response.success) {
        if (response.error === "Bad Request") {
          if (response.data == "The phone field contains an invalid number.") {
            methods.formState.errors.phone = {
              type: "server",
              message: "The phone field contains an invalid number.",
            };
          }
          if(response.data=="This email already has an account.")
          {
            setAlreadyAccount(true);
          }
          if (response.data == "The email has already been taken.") {
            methods.formState.errors.email = {
              type: "server",
              message: "The email has already been taken",
            };
          }
        } else {
          if (userID == 0) {
            errorMsg =
              "Failed ! When resgistring user information, Please contact support team @ 844 854-8868";
          } else {
            errorMsg =
              "Failed ! When Updating User Details, Please contact support team @ 844 854-8868";
          }
          showAccountErrorMsg(errorMsg);
        }
      } else {
        dispatch(
          fetchUser({
            first_name: response.data.first_name,
            last_name: response.data.last_name,
            email: response.data.email,
            phone: loadformatPhoneNumber(response.data.phone),
            id: response.data.id,
          })
        );
        methods.setValue('phone', loadformatPhoneNumber(response.data.phone));
        updateUsermethods.setValue('first_name', response.data.first_name);
        updateUsermethods.setValue('last_name', response.data.last_name);
        updateUsermethods.setValue('email', response.data.email);
        updateUsermethods.setValue('phone', loadformatPhoneNumber(response.data.phone));
     
       
          showAccountErrorMsg("");
          Toast({
            type: "success",
            message: "User account created successfully",
          });
        

        if (userID == 0) {
          const loginresponse = await LoginApi("/v6/auth/login", values);
          if (loginresponse.success) {
            showAccountErrorMsg("");
            dispatch(
              setLogin({
                isAuth: true,
                token: loginresponse.data.token,
                userID: loginresponse.data.user_id,
                userType: loginresponse.data.user_type,
              })
            );
         
            nextStep(4);
            if (paymentDetailReference.current) {
              paymentDetailReference.current.scrollIntoView({
                behavior: 'smooth', // You can use 'auto' for instant scrolling
               block: 'start', 
                  inline: 'end'
              });
            }
          } else {
            errorMsg =
              "Failed ! when resgistring user information, Please contact support team @ 844 854-8868";
            showAccountErrorMsg(errorMsg);
          }
        }
       
      }
    } catch (error: any) {
      Bugsnag.notify(error);
      console.error("Error fetching data:", error);
      errorToast();
    }
    setbtnDisable(false);
  };

  const updateUseronSubmit = async (values: any) => {
    let errorMsg = "";
    setbtnDisable(true);
    setAlreadyAccount(false);
    try {
      values.phone = values.phone.replace(/-/g, '');
      const response = await postApi(`/v6/users/${userID}`, values);

      if (!response.success) {
        if (response.error === "Bad Request") {
          if (response.data == "The phone field contains an invalid number.") {
            updateUsermethods.formState.errors.phone = {
              type: "server",
              message: "The phone field contains an invalid number.",
            };
          }
          if(response.data=="This email already has an account.")
          {
            setAlreadyAccount(true);
          }
          if (response.data == "The email has already been taken.") {
            updateUsermethods.formState.errors.email = {
              type: "server",
              message: "The email has already been taken",
            };
          }
        } else {

            errorMsg =
              "Failed ! when updating user details, please contact support team @ 844 854-8868";
          
          showAccountErrorMsg(errorMsg);
        }
      } else {
        dispatch(
          fetchUser({
            first_name: response.data.first_name,
            last_name: response.data.last_name,
            email: response.data.email,
            phone: loadformatPhoneNumber(response.data.phone),
            id: response.data.id,
          })
        );
        updateUsermethods.setValue('phone', loadformatPhoneNumber(response.data.phone));
          showAccountErrorMsg("");
          Toast({
            type: "success",
            message: "User account updated successfully",
          });

          if (paymentDetailReference.current) {
            paymentDetailReference.current.scrollIntoView({
              behavior: 'smooth', // You can use 'auto' for instant scrolling
             block: 'start', 
                inline: 'end'
            });
          }
          nextStep(4);
        
      }
    }catch (error: any) {
      Bugsnag.notify(error);
      console.error("Error fetching data:", error);
      errorToast();
    }
    setbtnDisable(false);
  };


  useEffect(() => {
    setIsOpen(currentStep == 3 || currentStep > 3 ? true : false);
  }, [currentStep]);
  const [isOpen, setIsOpen] = useState(
    currentStep == 2 || currentStep > 2 ? true : false
  );
  return (
    <>
      <div className="flex items-center justify-between md:px-10"
       id={ID} ref={accountInfoReference}
      >
        <div className="flex gap-6 justify-start items-center py-4 pt-[18px]">
          <Image
            src={"/assets/icons/flower.svg"}
            blurDataURL={"/assets/icons/flower.svg"}
            alt={"flower"}
            width={24}
            height={24}
            priority
            placeholder="blur"
          />
          <h2 className="font-chicle text-orange  text-3xl md:text-5xl">
            Account Information
          </h2>
        </div>
      </div>
      {isOpen && (
        <div className="mt-4 md:px-10">
          <hr />
          {userID == 0 && (
            <>
          <div className="flex  gap-8 md:flex-row justify-center">
         
          <Link href={`${process.env.NEXT_PUBLIC_API_END_POINT}/v4/login/google`}>
                <CustomButton
                  // handleClick={()=> login()}
                  rightIcon="/assets/icons/google.svg"
                  title="Google"
                  btnType="submit"
                  inputStyles="bg-white md:w-[200px] flex justify-center text-xl lg:text-2xl text-[#828282] border font-FuturaPTMedium hover:bg-blue hover:text-white hover:border-blue hover:border inline-flex gap-2 lg:gap-2  px-8 items-center"
                />
              </Link>
              <Link href={`${process.env.NEXT_PUBLIC_API_END_POINT}/v4/login/facebook`}>
                <CustomButton
                  rightIcon={'/assets/icons/facebook.svg'}
                  title="Facebook"
                  btnType="submit"
                  inputStyles="bg-white md:w-[200px] flex justify-center  text-xl lg:text-2xl text-[#828282] border  hover:bg-blue hover:text-white hover:border-blue hover:border inline-flex gap-2 lg:gap-2  px-8 items-center"
                />
             </Link>
           
          </div>
          <p className="my-3 text-center font-FuturaPTDemi text-2xl">OR</p> </>)}
          <h2 className="pl-3 font-FuturaPTDemi text-2xl">
            {userID != 0 ? "Update" : "Create"} Your Account
          </h2>
          {userID == 0  &&  <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="flex flex-col gap-5 lg:w-full"
            >
              <div className="grid  grid-cols-1 md:grid-cols-[45%,45%] md:gap-x-8 lg:grid-cols-[45%,45%] lg:gap-x-16 xl:grid-cols-[40%,40%] xl:gap-x-36 mt-4">
                <InputBox
                  label="First Name"
                  labelStyles={` ${labelStyleCreateAcount}`}
                  name="first_name"
                  placeHolder="Enter Your First Name"
                  inputStyles={`${dashboardStyle} w-full`}
                  error={methods.formState.errors.first_name?.message}
                  errorStyles="pl-3"
                />
                <InputBox
                  label="Last Name"
                  labelStyles={` ${labelStyleCreateAcount}`}
                  name="last_name"
                  placeHolder="Enter Your Last Name"
                  inputStyles={`${dashboardStyle}`}
                  error={methods.formState.errors.last_name?.message}
                  errorStyles="pl-3"
                />
                <div> 
                <Controller
            name="email"
            control={methods.control}
            defaultValue=""
            render={({ field }) => (
              <>
             <label className={`italic ${labelStyleCreateAcount}`} >Email</label> 
              <input
                {...field}
                type="email"
                className={`py-3 px-4 border-2 bg-[#f9f9f9] border-[#b6b6b6] shadow-sm shadow-[#c5c1bf] font-FuturaPTBook focus:outline-none  focus:border-orange w-full ${dashboardStyle}`}
                placeholder="Enter Your Email"
                onChange={(e) => {
                  field.onChange(e); // This updates the form's state
                  setAlreadyAccount(false);
                }}
                
              />
              </>
            )}
          />
          
        {methods.formState.errors && <span role="alert" className={`text-red mb-2 font-FuturaPTBook text-xl font[450]`}>{methods.formState.errors.email?.message}</span>}
           
             {alreadyAccount &&  <p className="text-red mb-2 font-FuturaPTBook text-xl font[450] pb-4"> This email already has an account. click here to <Link href="/login"
              className=" text-green text-xl font-FuturaPTMedium font[450]">Login</Link></p>}
              </div>

              <div>
                <Controller
            name="phone"
            control={methods.control}
            defaultValue=""
            render={({ field }) => (
              <>
             <label className={`italic ${labelStyleCreateAcount}`} >Phone</label> 
              <input
                {...field}
                type="text"
                className={`py-3 px-4 border-2 bg-[#f9f9f9] border-[#b6b6b6] shadow-sm shadow-[#c5c1bf] font-FuturaPTBook focus:outline-none  focus:border-orange w-full ${dashboardStyle}`}
                placeholder="___-___-____"
                value={field.value}
                onChange={(e) => {
                  const inputValue = e.target.value;

// Use a regular expression to keep only numeric characters
const numericValue = inputValue.replace(/[^0-9]/g, '');

// Update the form's state with the numeric value
field.onChange(numericValue);

// You can also call your formatting function here if needed
HandleFormatPhone(numericValue,methods);
                }}
                
              />
              </>
            )}
          />
        {methods.formState.errors && <span role="alert" className={`text-red mb-2 font-FuturaPTBook text-xl font[450]`}>{methods.formState.errors.phone?.message}</span>}
           
             
              </div>
             <div className="mt-4">
                <InputBox
                  label="Password"
                  icon={true}
                  IconStyle={`top-[67px] right-[20px] ${
                    userID != 0 ? "hidden" : ""
                  }`}
                  labelStyles={` ${labelStyleCreateAcount} ${
                    userID != 0 ? "hidden" : ""
                  }`}
                  type="password"
                  name="password"
                  placeHolder="Enter Password"
                  inputStyles={`${dashboardStyle}  pr-12 ${
                    userID != 0 ? "hidden" : ""
                  }`}
                  error={methods.formState.errors.password?.message}
                  errorStyles="pl-3"
                />
                </div>
                <div className="mt-4">
                <InputBox
                  label="Confirm Password"
                  icon={true}
                  IconStyle={`top-[67px] right-[20px] ${
                    userID != 0 ? "hidden" : ""
                  }`}
                  labelStyles={` ${labelStyleCreateAcount} ${
                    userID != 0 ? "hidden" : ""
                  }`}
                  type="password"
                  name="confirmPassword"
                  placeHolder="Enter Confirm Password"
                  inputStyles={`${dashboardStyle} pr-12 ${
                    userID != 0 ? "hidden" : ""
                  }`}
                  error={methods.formState.errors.confirmPassword?.message}
                  errorStyles="pl-3"
                />
                 </div>
              </div>

              {errorMsg != "" && (
                <p
                  role="alert"
                  className={`text-red mt-0  mb-4 font-FuturaPTBook text-xl font[450]`}
                >
                  {errorMsg}
                </p>
              )}

              <div className="flex justify-start">
                <CustomButton
                 loadingStyle="text-xl md:text-2xl"
                 isDisabled={btnDisable}
                 loading={btnDisable}
                  title={userID == 0 ? "Next" : "Update"}
                  btnType="submit"
                  inputStyles="text-2xl text-white  border px-12 py-[4px]"
                />
              </div>
            </form>
          </FormProvider>
}


{/* update users */}
{userID != 0  &&
          <FormProvider {...updateUsermethods}>
            <form
              onSubmit={updateUsermethods.handleSubmit(updateUseronSubmit)}
              className="flex flex-col gap-5 lg:w-full"
            >
              <div className="grid  grid-cols-1 md:grid-cols-[45%,45%] md:gap-x-8 lg:grid-cols-[45%,45%] lg:gap-x-16 xl:grid-cols-[40%,40%] xl:gap-x-36 mt-4">
                <InputBox
                  label="First Name"
                  labelStyles={` ${labelStyleCreateAcount}`}
                  name="first_name"
                  placeHolder="Enter Your First Name"
                  inputStyles={`${dashboardStyle} w-full`}
                  error={updateUsermethods.formState.errors.first_name?.message}
                  errorStyles="pl-3"
                />
                <InputBox
                  label="Last Name"
                  labelStyles={` ${labelStyleCreateAcount}`}
                  name="last_name"
                  placeHolder="Enter Your Last Name"
                  inputStyles={`${dashboardStyle}`}
                  error={updateUsermethods.formState.errors.last_name?.message}
                  errorStyles="pl-3"
                />
                <div>
                <Controller
            name="email"
            control={updateUsermethods.control}
            defaultValue=""
            render={({ field }) => (
              <>
             <label className={`italic ${labelStyleCreateAcount}`} >Email</label> 
              <input
                {...field}
                type="email"
                className={`py-3 px-4 border-2 bg-[#f9f9f9] border-[#b6b6b6] shadow-sm shadow-[#c5c1bf] font-FuturaPTBook focus:outline-none  focus:border-orange w-full ${dashboardStyle}`}
                placeholder="Enter Your Email"
                onChange={(e) => {
                  field.onChange(e); // This updates the form's state
                  setAlreadyAccount(false);
                }}
                
              />
              </>
            )}
          />
        {updateUsermethods.formState.errors && <span role="alert" className={`text-red mb-2 font-FuturaPTBook text-xl font[450]`}>{updateUsermethods.formState.errors.email?.message}</span>}
           
             {alreadyAccount &&  <p className="text-red mb-2 font-FuturaPTBook text-xl font[450] pb-4"> This email already has an account.</p>}
              </div>

              <div>
                <Controller
            name="phone"
            control={updateUsermethods.control}
            defaultValue=""
            render={({ field }) => (
              <>
             <label className={`italic ${labelStyleCreateAcount}`} >Phone</label> 
              <input
                {...field}
                type="text"
                className={`py-3 px-4 border-2 bg-[#f9f9f9] border-[#b6b6b6] shadow-sm shadow-[#c5c1bf] font-FuturaPTBook focus:outline-none  focus:border-orange w-full ${dashboardStyle}`}
                placeholder="___-___-____"
                value={field.value}
                onChange={(e) => {
                  const inputValue = e.target.value;

// Use a regular expression to keep only numeric characters
const numericValue = inputValue.replace(/[^0-9]/g, '');

// Update the form's state with the numeric value
field.onChange(numericValue);

// You can also call your formatting function here if needed
HandleFormatPhone(numericValue,updateUsermethods);
                }}
               
                
              />
              </>
            )}
          />
        {updateUsermethods.formState.errors && <span role="alert" className={`text-red mb-2 font-FuturaPTBook text-xl font[450]`}>{updateUsermethods.formState.errors.phone?.message}</span>}
           
             
              </div>
             
               
             
              </div>

              {errorMsg != "" && (
                <p
                  role="alert"
                  className={`text-red mt-0  mb-4 font-FuturaPTBook text-xl font[450]`}
                >
                  {errorMsg}
                </p>
              )}

              <div className="flex justify-start">
                <CustomButton
                 loadingStyle="text-xl md:text-2xl"
                 isDisabled={btnDisable}
                 loading={btnDisable}
                  title={"Update"}
                  btnType="submit"
                  inputStyles="text-2xl text-white  border px-12 py-[4px]"
                />
              </div>
            </form>
          </FormProvider>
}
        </div>
      )}
    </>
  );
};

export default AccountInfo;
