"use client";
import {  useForm,FormProvider } from "react-hook-form";
import { InputBox } from "@/components";
import {ChangePasswordProps,ChangePasswordFormValues} from "@/types";
import CustomButton from "./common/CustomButton";
import { changePasswordSchema } from '@/validations/auth.schema';
import { yupResolver } from "@hookform/resolvers/yup";
import {postApi} from '@/lib/apiCallMethod';
import { errorToast } from '@/constants/utis';
import { Toast,capitalizeFirstWord } from '@/lib/toast';
import { useState } from 'react';
import { useAppDispatch } from "@/store";
import { setLogin } from "@/store/features/auth/authSlice";
import Cookies from 'js-cookie';
import {useRouter } from "next/navigation";
import Bugsnag from '@/lib/bugsnagConfig'

 const ChangePassword = ({handleModalClose,handleModalSubmit}: ChangePasswordProps) => {
  const methods= useForm<ChangePasswordFormValues>({
    defaultValues: { old_password: '',confirm_password: '', new_password: '' },
    resolver: yupResolver(changePasswordSchema),
  });
  const [btnDisable, setbtnDisable] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const onSubmit = async (values: any) => {
    setbtnDisable(true)
    try {
      const response = await postApi('/v6/users/change-password', values);
      if (response.success) {
        if(response.data.is_success)
        {
        Toast({ type: 'success', message: capitalizeFirstWord(response.data.message) });
        handleModalClose();
        dispatch(setLogin({
          isAuth:false,
          token:'',
          userID:0,
          userType:1}));
          Cookies.remove('cdone_oauth_token');
          Cookies.remove('cdone_token');
        router.push("/login");
        }
        else
        {
          Toast({ type: 'error', message: capitalizeFirstWord(response.data.message) });
        }
        setbtnDisable(false);
       
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



    return  (
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="px-8 sm:px-0">
        <div className="py-6">
          <h2 className="text-center text-xl lg:text-2xl font-FuturaPTDemi ">
            Change Password
          </h2>
        </div>
        <div className="bg-white sm:px-20 md:px-24  pb-8">
        <div className="w-full">
               <InputBox
                     
                     label="Old Password"
                     name="old_password"
                     type="password"
                     icon={true}
                     IconStyle="top-[53px] right-[20px]"
                     isRequired={true}
                     inputStyles="rounded-full border-[#92999E] px-8 py-[10px] shadow-none mb-4 pr-12"
                     labelStyles="pb-4 font-semibold text-gray-700"
                     error={methods.formState.errors.old_password?.message}
                
                 />
                 <InputBox
                     name="new_password"
                     label="New Password"
                     type="password"
                     icon={true}
                     IconStyle="top-[53px] right-[20px]"
                     isRequired={true}
                     inputStyles="rounded-full border-[#92999E] px-8 py-[10px] shadow-none mb-4 pr-12"
                     labelStyles="pb-4 font-semibold text-gray-700"
                     error={methods.formState.errors.new_password?.message}
                     
                 />
                 <InputBox
                     name="confirm_password"
                     label="Confirm Password"
                     type="password"
                     icon={true}
                     IconStyle="top-[53px] right-[20px]"
                     isRequired={true}  
                     inputStyles="rounded-full border-[#92999E] px-8 py-[10px] shadow-none mb-4 pr-12"
                     labelStyles="pb-4 font-semibold text-gray-700"
                     error={methods.formState.errors.confirm_password?.message}
                 />
                 </div>
        
        </div>
        </div>
        <div className="bg-light-blue px-4 py-4 md:py-6 text-center flex justify-center items-center">
          <div className="flex gap-2 md:gap-4">
            <CustomButton   
               handleClick={handleModalClose}
              title="Cancel"
              inputStyles="bg-white border-2 border-dark-blue text-dark-blue text-md px-8 sm:px-12 md:text-lg "
            />
            <CustomButton       
             loadingStyle="text-xl md:text-2xl"
             isDisabled={btnDisable}
             loading={btnDisable}
               btnType="submit"
              title="Save Password"
              inputStyles=" border border-dark-blue text-white bg-dark-blue text-md  px-8 sm:px-12  md:text-lg"
            />
          </div>
        </div>

        
      </form>
      </FormProvider>
        
    );
  }; 

  export default ChangePassword;
  