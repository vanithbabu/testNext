"use client";
import { useForm,FormProvider,Controller } from 'react-hook-form';
import Image from "next/image";
import { InputBox, CustomButton } from "@/components";
import { ZipCodePage } from '@/constants';
import { postApi } from '@/lib/apiCallMethod';
import { yupResolver } from "@hookform/resolvers/yup";
import { zipcodeSchema } from '@/validations/contact.schema';
import { errorToast } from '@/constants/utis';
import { Toast,capitalizeFirstWord } from '@/lib/toast';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import  {ZipcodeFormValues,ActiveCampaignFormValues }from '@/types';
import { ActiveCampaignSchema } from '@/validations/contact.schema';
import { useAppDispatch} from '@/store';
import { fetchscheduling } from "@/store/features/scheduling/schedulingSlice";
import { fetchselectedDate } from "@/store/features/selectedDate/selectedDateSlice";
import { fetchPreference } from "@/store/features/preferences/preferenceSlice";
import { fetchFrequency } from "@/store/features/frequency/frequencySlice";
import { fetchUser } from "@/store/features/createUser/createUserSlice";
import { fetchAddress } from "@/store/features/address/addressSlice";
import { fetchzipcode } from "@/store/features/zipcode/zipcodeSlice";
import { setLogin } from "@/store/features/auth/authSlice";
import { fetchCreditCard } from "@/store/features/creditCard/creditCardSlice";
import { fetchOrder } from "@/store/features/orders/orderSlice";
import { fetchProfile } from "@/store/features/profile/profileSlice";
import FlowerImg from '@/public/assets/icons/flower.svg';
import Bugsnag from '@/lib/bugsnagConfig'

import Cookies from "js-cookie";
export default function ZipCode() {
  const [btnDisable, setbtnDisable] = useState(false)
  const [activeCampaignbtnDisable, setActiveCampaignbtnDisable] = useState(false)
  const [showEmail, setShowEmail] = useState(false)
  const router = useRouter();
  const dispatch = useAppDispatch();
  const methods = useForm<ZipcodeFormValues>({
    defaultValues: { zipcode: '' },
    resolver: yupResolver(zipcodeSchema),
  });

  useEffect(() => {
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
    dispatch(fetchOrder([]));
    dispatch(fetchFrequency({ frequencyId: 3 }));
    dispatch(
      fetchPreference({
        delivery_loc: "",
        delivery_notes: "",
      })
    );
    dispatch(
      fetchAddress({
        address: "",
        city: "",
        state: "",
        address2: "",
        unitNumber: false,
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
    Cookies.remove("cdone_oauth_token");
    Cookies.remove("cdone_token");
  }, []);

  const ActiveCampaignMethods = useForm<ActiveCampaignFormValues>({
    defaultValues: { email: '' },
    resolver: yupResolver(ActiveCampaignSchema),
  });
  const onSubmit = async (values: any) => {
    setbtnDisable(true)
    try {
      const response = await postApi('/v6/zipcode/validate', values);
      if (response.success && response.data.is_available) {
        dispatch(fetchzipcode({ zipcode: response.data.zipcode, available_services: response.data.available_services }));
        Toast({ type: 'success', message: capitalizeFirstWord(response.data.message) });
        setbtnDisable(false)
        router.push("/laundry/order");
      } else {
        if (response.error == 'Bad Request') {
          setShowEmail(true);

        } else {
          if (response.data && response.data.error) {
            Toast({ type: 'error', message: capitalizeFirstWord(response.data.error) });
          } else {
            Toast({ type: 'error', message: capitalizeFirstWord(response.error) });
          }
        }
      }
    }catch (error: any) {
      Bugsnag.notify(error);
      errorToast();

    }
    setbtnDisable(false)
  }


  const onSubmitActiveCampaign = async (values: any) => {
    setActiveCampaignbtnDisable(true);
    if (values.email) {
      const formData = new FormData();
      formData.append("u", "5");
      formData.append("f", "5");
      formData.append("s", "s");
      formData.append("c", "0");
      formData.append("m", "0");
      formData.append("act", "sub");
      formData.append("v", "2");
      formData.append("or", "d0008f1e20174a0ecb55ec9914413708");
      formData.append("field[5]", methods.getValues('zipcode'));
      formData.append("email", values.email);

      fetch('https://cleanersdepot.activehosted.com/proc.php', {
        method: 'POST',
        body: formData,
        mode: 'no-cors',
      }).then(response => {
        Toast({ type: 'success', message: "We will get back to you" });
      router.push("/");
      }).catch ((error: any) =>{
        Bugsnag.notify(error);
        Toast({ type: 'error', message: "Something went wrong!" });
      })
    }
    setActiveCampaignbtnDisable(false);
  }
  return (
    <main className="max-w-7xl mx-auto px-4 lg:px-8">
      <div className="bg-white rounded-lg py-8 mb-4 shadow-md">
        <h2 className="text-2xl md:text-4xl font-FuturaPTMedium font-[500] text-center px-4">
          Laundry professionally washed, dried, and folded
        </h2>
        <div className="flex flex-col flex-wrap max-w-2xl lg:max-w-4xl mx-auto pt-12 justify-center items-center  mb-4 px-4">
          <div className="min-[320px]  mx-auto">

            {ZipCodePage.map(data => {
              return (

                <div key={data} className="flex gap-4 justify-start items-start mb-4 lg:mb-6  ">
                  <Image
                    src={FlowerImg}
                    alt={"flower"}
                    width={40}
                    height={40}
                    priority
                  />
                  <div className="flex flex-col mb-2">
                    <h2 className="font-chicle text-3xl sm:text-3xl md:text-5xl  font text-orange">
                      {data}
                    </h2>
                  </div>
                </div>
              );
            })}

          </div>
          <div className="min-[320px]  mx-auto">
            <p className="py-3 lg:px-4  text-blue font-chicle text-6xl lg:text-8xl text-center lg:text-left">
              $ <span className=" text-6xl md:text-9xl">1.50</span> /lb
            </p>
          </div>
        </div>


        {!showEmail &&
          <>
            <p className="font-FuturaPTBook text-center mb-4 text-xl md:text-2xl px-4">
              Enter your zip code to schedule your pickup
            </p>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)} className="max-w-sm px-4 mx-auto">
                {/* <InputBox
            name="zipcode"
            type="text"
            error={methods.formState.errors.zipcode?.message}
            errorStyles="text-center"
            inputStyles="rounded-lg mb-4 border border-[#4F4F4F] text-lg outline-none text-center italic"
            placeHolder="Zip Code"
          />  */}

                <div>
                  <Controller
                    name="zipcode"
                    control={methods.control}
                    defaultValue=""
                    render={({ field }) => (
                      <>
                        <input
                          {...field}
                          type="text"
                          className={`bg-[#f9f9f9] py-3 px-4  w-full shadow-sm shadow-[#c5c1bf] font-FuturaPTBook focus:outline-none  focus:border-orange  rounded-lg mb-4 border border-[#4F4F4F] text-lg outline-none text-center italic`}
                          placeholder="Zip Code"
                          value={field.value}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            const numericValue = inputValue.replace(/[^0-9]/g, '');
                            field.onChange(numericValue);
                          }}

                        />
                      </>
                    )}
                  />
                  {methods.formState.errors && <p className={`text-red mb-2 text-center font-FuturaPTBook text-xl font[450]`}>{methods.formState.errors.zipcode?.message}</p>}


                </div>
                <div className="flex justify-center  ">
                  <CustomButton
                    loadingStyle="text-xl md:text-2xl"
                    isDisabled={btnDisable}
                    loading={btnDisable}
                    title="Continue"
                    btnType="submit"
                    inputStyles="text-xl md:text-3xl text-white  px-20 py-[6px]  hover:opacity-80"
                  />
                </div>
              </form>
            </FormProvider></>}
        {showEmail &&
          <>
            <FormProvider {...ActiveCampaignMethods}>
              <p className='text-red text-xl text-center font-FuturaPTBook'>We don’t service your area yet. Please enter your email so that we can notify you when we do.</p>
              <form onSubmit={ActiveCampaignMethods.handleSubmit(onSubmitActiveCampaign)} className="max-w-sm px-4 mx-auto">

                <InputBox
                  name="email"
                  type="email"
                  label="Enter Your Email"
                  error={ActiveCampaignMethods.formState.errors.email?.message}
                  errorStyles="text-center"
                  labelStyles='font-FuturaPTBook text-center mb-4 mt-4 text-xl md:text-2xl'
                  placeHolder="Enter Your Email"
                  inputStyles="rounded-lg mb-4 border text-lg outline-none  border-[#92999E] focus:border-orange "
                />

                <div className="flex justify-center  ">
                  <CustomButton
                    loadingStyle="text-xl md:text-2xl"
                    isDisabled={activeCampaignbtnDisable}
                    loading={activeCampaignbtnDisable}
                    title="Submit"
                    btnType="submit"
                    inputStyles="text-xl md:text-3xl text-white  px-20 py-[6px]  hover:opacity-80"
                  />
                </div>
                <p
                  onClick={() => setShowEmail(false)}
                  className=" text-green text-xl font-FuturaPTMedium font[450] mt-4 text-center cursor-pointer"
                >
                  Try Another Zipcode ?
                </p>
              </form>

            </FormProvider>

          </>
        }
      </div>
    </main>
  );
}
