"use client";
import { Controller, useForm,FormProvider } from "react-hook-form";
import {AddCardProps} from "@/types";
import { useState } from "react";
import Image from "next/image";
import CustomButton from "./common/CustomButton";
import { ExpiryInput } from "./common/ExpiryInput";
import { CreditCardInput } from "./common/CreditCardInput";
import { isAfter, parse } from 'date-fns';
import { useAppSelector,useAppDispatch } from "@/store";
import {getStripeToken} from '@/lib/apiCall';
import { postApi,getApi } from "@/lib/apiCallMethod";
import { Toast,capitalizeFirstWord } from '@/lib/toast';
import { fetchCreditCard } from "@/store/features/creditCard/creditCardSlice";
import Bugsnag from '@/lib/bugsnagConfig'
import StripeSafeImg from '@/public/assets/images/stripe-safe.webp';
import StripeButtonImg from '@/public/assets/images/stripe-button.webp';
import PaymentImg from '@/public/assets/images/payment-icons.webp';

const AddCard = ({ handleModalClose, handleModalSubmit }: AddCardProps) => {
  const dispatch = useAppDispatch();
  const {userID} = useAppSelector(state => state.auth);
  const [btnDisable, setbtnDisable] = useState(false);
  const methods = useForm();

  const onSubmit = async (values: any) => {
    setbtnDisable(true);
    try {
      const expire = values.expiry.split("/");
      const month = expire[0];
      const year = expire[1];
      const cardNumber = values.cardNumber.replace(/-/g, '')
      const body = {
        "card[number]": cardNumber,
        "card[exp_month]": month,
        "card[exp_year]": year,
      };
  
      const stripeToken = await getStripeToken(body);
  
      if (stripeToken && stripeToken.success) {
      const response =  await postApi(`/v4/users/${userID}/credit-cards`,{"stripe_token":stripeToken.data.id});
       if(response.success)
       {
        const getAllCreditCard=await getApi(`/v6/users/${userID}/creditcard`);
        if(getAllCreditCard.success)
        {
        Toast({ type: 'success', message:'Credit card added successfully' });
        dispatch(fetchCreditCard(getAllCreditCard.data||[]));
        }
        handleModalSubmit();
       }
       else
       {
        Toast({ type: 'error', message:'Failed ! when saving credit card, please contact support team @ 844 854-8868' });
       }

      } else {
        Toast({ type: 'error', message: capitalizeFirstWord(stripeToken?.error) });
      }
    }catch (error: any) {
      Bugsnag.notify(error);
      Toast({ type: 'error', message: "An error occurred while processing your request." });
    }
    setbtnDisable(false);
  };
  
  return (
    <FormProvider {...methods}>
    <form>
      <div className="py-6">
        <h2 className="text-center text-xl lg:text-2xl font-FuturaPTDemi ">
          Add Card
        </h2>
      </div>
      <div className="bg-white px-2  md:px-24  pb-8">
        <h2 className="pb-4 text-lg font-semibold text-gray-700">Card Information</h2>
        <div className="flex ">
          <div className="w-[70%]">
            <Controller
              name="cardNumber"
              control={methods.control}
              defaultValue=""
              rules={{
                required: 'Card number is required',
              }}
              render={({ field }) => (
                <>
                  <CreditCardInput field={field} onChange={field.onChange}/>
                  {methods.formState.errors?.cardNumber && typeof methods.formState.errors.cardNumber.message === 'string' && (
                    <p className="text-red ml-4 font-FuturaPTBook text-lg font-450">
                      {methods.formState.errors.cardNumber.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>
          <div className="w-[30%]">
            <Controller
              name="expiry"
              control={methods.control}
              defaultValue=""
              rules={{
                required: 'Expiration date is required',
                pattern: {
                  value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                  message: 'Invalid expiration date (MM/YY)',
                },
                validate: {
                  afterCurrentDate: (value) => {
                    const currentDate = new Date();
                    const enteredDate = parse(value, 'MM/yy', new Date());
      
                    if (!isAfter(enteredDate, currentDate)) {
                      return 'Card has already expired';
                    }
                    return true;
                  },
                },
              }}
              render={({ field }) => (
                <>
                  <ExpiryInput field={field} onChange={field.onChange} />
                  {methods.formState.errors?.expiry && typeof methods.formState.errors.expiry.message === 'string' && (
                    <h2 className="text-red font-FuturaPTBook text-lg font-450">
                      {methods.formState.errors.expiry.message}
                    </h2>
                  )}
                </>
              )}
            />
          </div>
        </div>

        <div className="card mt-6 md:mb-4">
          <div className="card-body border-2 p-4 rounded-lg border-[#92999E]">
            <div className="flex  gap-1 justify-between">
              <Image
                className="my-2"
                src={StripeSafeImg}
                alt="Margo Logo"
                width={230}
                height={30}
                placeholder="blur"
                priority
                
              />
              <Image
                className="my-2"
                src={StripeButtonImg}
                alt="Margo Logo"
                width={100}
                height={40}
                priority
                placeholder="blur"
              />
            </div>
            <hr />
            <Image
              src={PaymentImg}
              alt="Margo Logo"
              width={480}
              height={48}
              layout="responsive"
              priority
              placeholder="blur"
            />
          </div>
        </div>
      </div>
      <div className="bg-light-blue px-4 py-4 md:py-6 text-center flex justify-center items-center">
        <div className="flex gap-2 md:gap-4">
          <CustomButton
            handleClick={handleModalClose}
            title="Cancel"
            inputStyles="bg-white border-2 border-dark-blue text-dark-blue text-md px-8 sm:px-12 md:text-lg"
          />
          <CustomButton         
            loadingStyle="text-xl md:text-2xl"
            loading={btnDisable}
            isDisabled={btnDisable}
            handleClick={methods.handleSubmit(onSubmit)}
            btnType="submit"
            title="Save Card"
            inputStyles=" border border-dark-blue text-white bg-dark-blue text-md  px-8 sm:px-12  md:text-lg"
          />
        </div>
      </div>
    </form>
    </FormProvider>
  );
  }; 

  export default AddCard;
  