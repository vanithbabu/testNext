"use client";
import {
  CustomButton,
  CustomRadioButton,
  InputBox,
  TextArea,
} from "@/components";
import Image from "next/image";
import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider,Controller } from "react-hook-form";
import { OrderDetailsFormValues } from "@/types";
import { getApi } from "@/lib/apiCallMethod";
import { OrderDetailSchema } from "@/validations/order.schema";
import AutoComplete from "../AutoComplete";
import { fetchscheduling } from "@/store/features/scheduling/schedulingSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchPreference } from "@/store/features/preferences/preferenceSlice";
import { Toast } from "@/lib/toast";
import { fetchAddress } from "@/store/features/address/addressSlice";
import Bugsnag from '@/lib/bugsnagConfig'
import FlowerImg from '@/public/assets/icons/flower.svg';

interface OrderDetailsProps {
  currentStep: number;
  nextStep: (values: number) => void;
  ID:string;
  orderDetailReference:any;
  schedulingDetailReference:any;
}
const OrderDetails: React.FC<OrderDetailsProps> = ({
  currentStep,
  nextStep,
  ID,
  orderDetailReference,
  schedulingDetailReference,

}) => {
  const [showUnit, setShowUnit] = useState<boolean>(false);
  const [steps, setSteps] = useState(currentStep);
  const address_id = useAppSelector((state) => state.scheduling.address_id);
  const storeId = useAppSelector((state) => state.scheduling.storeId);
  const delivery_loc = useAppSelector((state) => state.preference.delivery_loc);
  const delivery_notes = useAppSelector((state) => state.preference.delivery_notes);
  const unit_number = useAppSelector((state) => state.address.address2);
  const isUnitNumber = useAppSelector((state) => state.address.unitNumber);
  const [format_Address, SetFormat_Address] = useState("");
  const [loading,setLoading] = useState(true);
  const [showUnitNumber,setShowUnitNumber] = useState(false);
  const [error_format_Address, SetError_Format_Address] = useState("");
  const [UnitNumberError, SetUnitNumberError] = useState("");

  
  const [showPreferenceOptions, setPreferenceOptions] = useState<any>([]);
  const dispatch = useAppDispatch();
  const [btnDisable, setbtnDisable] = useState(false);
  const [formsSubmitbtnDisable, setFormsSubmitbtnDisable] = useState(false);
  const { address, city, state,address2 } = useAppSelector((state) => state.address);

  useEffect(()=>{
    setShowUnitNumber(isUnitNumber);
  },[isUnitNumber]);
  const updateFormatAddress = (address: string) => {
    SetFormat_Address(address);
    SetError_Format_Address("");
  };
  const error_Address = (message: string) => {
    SetError_Format_Address(message);
  };
  const methods = useForm<OrderDetailsFormValues>({
    defaultValues: {
      delivery_loc: delivery_loc|| "Front Door",
      delivery_notes: delivery_notes,
      unit_number: unit_number,
    },
    resolver: yupResolver(OrderDetailSchema),
  });

  const buttonDisabled=(value:boolean)=>{
    setbtnDisable(value);
  }
  const onSubmit = async (values: any) => {
    setbtnDisable(true);
    nextStep(1);
    if(error_format_Address=='')
    {
    if ( address_id ==0 || storeId ==0) {
      SetError_Format_Address("Enter the address");
      setbtnDisable(false);
      return;
    }
    if(isUnitNumber && values.unit_number=='' )
{
  SetUnitNumberError("Enter the unit number");
  setbtnDisable(false);
  return;
}
if(isUnitNumber && values.unit_number!='' )
{
    dispatch(fetchAddress({ address: address, city: city, state: state, address2: values.unit_number, unitNumber:isUnitNumber }));
}
    setFormsSubmitbtnDisable(true);
      const getPickupDatesResponse = await getApi(
        `/v6/address/${address_id}/dates`
      );
      if (
        getPickupDatesResponse.success &&
        getPickupDatesResponse.data.address_id
      ) {
        dispatch(
          fetchscheduling({
            storeId: storeId,
            address_id: address_id,
            pickupDate: getPickupDatesResponse.data.pickup.upcoming,
            deliverydDate: getPickupDatesResponse.data.delivery.upcoming,
          })
        );
        dispatch(
          fetchPreference({
            delivery_loc: values.delivery_loc,
            delivery_notes: values.delivery_notes
          })
        );
        {currentStep > 2 ? Toast({
          type: "success",
          message: "Order details update successfully",
        }): Toast({
          type: "success",
          message: "Order details saved successfully",
        }) }
        nextStep(2);
        if (schedulingDetailReference.current) {
          schedulingDetailReference.current.scrollIntoView({
           behavior: 'smooth', // You can use 'auto' for instant scrolling
           block: 'start', 
           inline: 'end'
          });
        }
      } else {
        SetError_Format_Address(`Delivery Day not found for address`);
      }
    }
    setFormsSubmitbtnDisable(false);
    setbtnDisable(false);
  };

  const showLocationFieldOption = async () => {
    try {
      const response = await getApi(`/v6/bags/locations`);
      if (response.success) {
        setPreferenceOptions(response.data);
        setLoading(false)
      }
    } catch (error: any) {
      Bugsnag.notify(error);
  
    }
  };
  useEffect(() => {
    showLocationFieldOption();
  }, []);

  useEffect(() => {
    setIsOpen(currentStep == 1 || currentStep > 1 ? true : false);
  }, [currentStep]);
  const [isOpen, setIsOpen] = useState(
    currentStep == 1 || currentStep > 1 ? true : false
  );
  return (
    <>
      <div className="flex items-center justify-between md:px-10" 
         id={ID} ref={orderDetailReference}
      >
        <div className="flex gap-1 md:gap-6 justify-start items-center py-4 pt-[18px]">
          <Image
            src={FlowerImg}
            alt={"flower"}
            width={24}
            height={24}
            priority
          />
          <h2 className="font-chicle text-orange  text-3xl md:text-5xl">
            Order Details
          </h2>
        </div>
      </div>
      {isOpen && (
        <div className="mt-4 md:px-10">
          <hr />
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="flex flex-col  lg:w-[450px]"
            >
              <label className=" pl-2 text-2xl text-[#1E1E1E]  font-FuturaPTDemi not-italic mb-2">
                Enter Address{" "}
              </label>

              <AutoComplete
                updateFormatAddress={updateFormatAddress}
                error_Address={error_Address}
                buttonDisabled={buttonDisabled}
                nextStep={nextStep}
              />

              {error_format_Address != "" && (
                <span
                  role="alert"
                  className={`text-red mt-0  mb-4 font-FuturaPTBook text-xl font[450]`}
                >
                  {error_format_Address}
                </span>
              )}
              {/* <InputBox label='Enter Address' labelStyles='pl-2 text-2xl text-[#1E1E1E] mb-2 font-FuturaPTDemi not-italic' register={register('address')} placeHolder='Enter Address' inputStyles="rounded-full border-[#92999E] px-8 py-[10px] shadow-none" /> */}
              <h2 className="font-FuturaPTDemi text-2xl mb-4">Pickup from</h2>
              { loading &&
                (<div className="flex gap-1 items-center text-xl md:text-2xl ">  <svg aria-hidden="true" role="status" className="inline mr-3 w-6 h-6 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
                </svg>
                <span className="text-xl md:text-2xl">Please wait...</span></div>)
              }
              <div className="flex flex-wrap gap-4">
                {showPreferenceOptions.map((option: any) => {
                  return (
                    <CustomRadioButton
                      key={option.id}
                      name="delivery_loc"
                      value={option.location}
                      label={option.location}
                      labelStyles="text-[#1E1E1E] italic text-lg font-FuturaPTBook"
                    />
                  );
                })}
              </div>
              {methods.formState.errors.delivery_loc && (
                <span
                  role="alert"
                  className={`text-red  mt-2 mb-2 font-FuturaPTBook text-xl font[450]`}
                >
                  {methods.formState.errors.delivery_loc?.message}
                </span>
              )}
              <h2 className="font-FuturaPTDemi text-2xl mt-4">
                Pickup Instructions
              </h2>
              <TextArea
                placeHolder="Come to front door & buzz 303"
                name="delivery_notes"
                error={methods.formState.errors.delivery_notes?.message}
                rows={3}
                inputStyles={
                  " w-full sm:w-[350px]  rounded-[15px] border border-[#92999E] mt-4"
                }
              />
              {showUnitNumber && (
                <>
                <p className="text-2xl text-[#1E1E1E] font-FuturaPTDemi">
                Add Unit Number
              </p>
              <div className="flex flex-col relative ">
              <Controller
                name="unit_number"
                control={methods.control}
                defaultValue=""
                render={({ field }) => (
                  <>
                   
                    <input
                      {...field}
                      type="text"
                      className={`py-3 px-4 border-2 bg-[#f9f9f9] shadow-sm shadow-[#c5c1bf] font-FuturaPTBook focus:outline-none  focus:border-orange   w-full sm:w-[350px]  rounded-xl mt-4  border-[#92999E]  mb-2"`}
                      placeholder="Unit Number"
                      value={field.value ?? ''} 
                      onChange={(e) => {
                        const inputValue = e.target.value;

    field.onChange(inputValue);
if(inputValue!='')
{
  SetUnitNumberError("");
}
else
{
  SetUnitNumberError("Enter the unit number");
}
  
                      }}
                     
                    />
                  </>
                )}
              />
              {UnitNumberError=="" && (<div className="h-[44px]"></div>)}
                 {UnitNumberError != "" && (
                <span
                  role="alert"
                  className={`text-red mt-0  mb-4 font-FuturaPTBook text-xl font[450]`}
                >
                  {UnitNumberError}
                </span>
              )}
                </div>
                </>
              )}

              <div className="flex justify-start">
              {currentStep > 1 ? <CustomButton
                 isDisabled={btnDisable}
                 loadingStyle="text-xl md:text-2xl"
                 loading={formsSubmitbtnDisable}
                  title= "Update"
                  btnType="submit"
                  inputStyles="text-2xl text-white  border px-12 py-[4px]"
                /> : <CustomButton
                isDisabled={btnDisable}
                loadingStyle="text-xl md:text-2xl"
                loading={formsSubmitbtnDisable}
                 title="Next"
                 btnType="submit"
                 inputStyles="text-2xl text-white  border px-12 py-[4px]"
               />}
              </div>
            </form>
          </FormProvider>
        </div>
      )}
    </>
  );
};

export default OrderDetails;
