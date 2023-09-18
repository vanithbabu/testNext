"use client";
import {useForm,FormProvider,Controller } from 'react-hook-form';
import { InputBox, TextArea,CustomButton } from "@/components";
import { yupResolver } from "@hookform/resolvers/yup";
import { ContactUsSchema } from '@/validations/contact.schema';
import  {ContactFormValues }from '@/types';
import { postApi } from '@/lib/apiCallMethod';
import { Toast,capitalizeFirstWord } from '@/lib/toast';
import { useState } from 'react';
import { errorToast } from '@/constants/utis';
import Bugsnag from '@/lib/bugsnagConfig'

const ContactForm = () => {
  const [btnDisable, setbtnDisable] = useState(false)
  const methods = useForm<ContactFormValues>({
    defaultValues: { email: '', name: '' , phone : '', message: ''},
    resolver: yupResolver(ContactUsSchema),
  });
  const HandleFormatPhone = (value : any) => {
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
    
  }
  const onSubmit = async (data: any) => {
    setbtnDisable(true);
    try {
      data.phone = data.phone.replace(/-/g, '');
      const response = await postApi('/v7/contact-us', data);
      if (response.success) {
        methods.reset();
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

  };
  
    return(
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-8 mt-4">
        <InputBox
          name="name"
          type="text"          

          error={methods.formState.errors.name?.message}
          placeHolder="Name (required)"
          inputStyles="text-lg"
        />
        <InputBox
          name="email"
          type="email"     

          error={methods.formState.errors.email?.message}
          placeHolder="Email Address (required)"
          inputStyles="text-lg"
        />
        <div className="flex flex-col relative ">
              <Controller
                name="phone"
                control={methods.control}
                defaultValue=""
                render={({ field }) => (
                  <>
                    <input
                      {...field}
                      type="text"
                      className={`py-3 px-4 border-2 border-[#b6b6b6] shadow-sm bg-[#f9f9f9] shadow-[#c5c1bf] font-FuturaPTBook  focus:outline-none  focus:border-orange text-lg `}
                      placeholder="___-___-____"
                      value={field.value}
                      onChange={(e) => {
                        const inputValue = e.target.value;
    
    // Use a regular expression to keep only numeric characters
    const numericValue = inputValue.replace(/[^0-9]/g, '');

    // Update the form's state with the numeric value
    field.onChange(numericValue);

    // You can also call your formatting function here if needed
    HandleFormatPhone(numericValue);
                      }}
                    />
                  </>
                )}
              />
              {methods.formState.errors && (
                <span
                  role="alert"
                  className={`text-red mb-2 font-FuturaPTBook text-xl font[450]`}
                >
                  {methods.formState.errors.phone?.message}
                </span>
              )}
              </div>
       
        <TextArea
          name='message'
          rows={5}
          placeHolder="Message (Required)"
          error={methods.formState.errors.message?.message}
          inputStyles="text-lg"
        ></TextArea>
        <div className="flex justify-center mb-4">
          <CustomButton       
            loadingStyle="text-xl md:text-2xl"
            isDisabled={btnDisable}
            loading={btnDisable}
            title="Submit >>>"
            btnType="submit"
            inputStyles="text-3xl  text-white hover:opacity-80"
          />
        </div>
      </form>
      </FormProvider>
    );

}



export default ContactForm;
