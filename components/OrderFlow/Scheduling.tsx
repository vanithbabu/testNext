"use client";
import { CustomButton, PickupDateChange } from "@/components";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { fetchselectedDate } from "@/store/features/selectedDate/selectedDateSlice";
import { useAppDispatch } from "@/store";
import FlowerImg from '@/public/assets/icons/flower.svg';
import { Toast } from "@/lib/toast";
interface SchedulingDetailsProps {
  currentStep: number;
  nextStep: (values: number) => void;
  ID:string;
  schedulingDetailReference:any;
  accountInfoReference:any;

}
const Scheduling: React.FC<SchedulingDetailsProps> = ({
  currentStep,
  nextStep,
  ID,
  schedulingDetailReference,
  accountInfoReference,

}) => {
  const methods = useForm();
  const dispatch = useAppDispatch();
  const [pickupDate, setPickupDate] = useState<string>('');
  const [deliveryDate, setDeliveryDate] = useState<string>('');
  const [changeDate, setChangeDate] = useState<boolean>(false);
  const [btnDisable, setbtnDisable] = useState(false);

  const firstChangeDate=(value:boolean)=>{
    setChangeDate(value);
  }
  const [steps, setSteps] = useState(currentStep);
  const setPickup = (date: string) => {
    setPickupDate(date);
  };
  const setDelivery = (date: string) => {
    setDeliveryDate(date);
  };
  const onSubmit = (values: any) => {
    setbtnDisable(true);
    if (pickupDate != "" && deliveryDate != "") {
      dispatch(
        fetchselectedDate({
          pickupDate: pickupDate,
          deliveryDate: deliveryDate,
        })
      );
      {currentStep > 2 ? Toast({
        type: "success",
        message: "Pickup day update successfully",
      }): Toast({
        type: "success",
        message: "Pickup day saved successfully",
      }) }
        nextStep(3);

      if (accountInfoReference.current) {
        accountInfoReference.current.scrollIntoView({
          behavior: 'smooth', // You can use 'auto' for instant scrolling
         block: 'start', 
            inline: 'end'
        });
      }
    }
    setbtnDisable(false);
  };
  useEffect(() => {
    setIsOpen(currentStep == 2 || currentStep > 2 ? true : false);
  }, [currentStep]);
  const [isOpen, setIsOpen] = useState(
    currentStep == 2 || currentStep > 2 ? true : false
  );
  return (
    <>
      <div className="flex flex-wrap items-center justify-between md:px-10" id={ID} ref={schedulingDetailReference}>
        <div className="flex gap-1 md:gap-6 justify-start items-center py-4 pt-[18px]">
          <Image
            src={FlowerImg}           
            alt={"flower"}
            width={24}
            height={24}
            priority
          />
          <h2 className="font-chicle text-orange  text-3xl md:text-5xl">
            Scheduling
          </h2>
        </div>
        {currentStep >= 2 &&
        <CustomButton
          handleClick={() => setChangeDate(true)}
          title="Need a diff day?"
          btnType="button"
          inputStyles="bg-green text-white text-xl font-FuturaPTMedium my-2 md:my-0"
        />
}
      </div>
      {isOpen && (
        <div className="mt-4 md:px-10">
          <hr />
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="flex flex-col gap-5 lg:w-[450px]"
            >
              <h2 className="font-FuturaPTDemi text-orange text-2xl">
                Pickup Details
              </h2>

              <PickupDateChange
                changeDate={changeDate}
                setDelivery={setDelivery}
                setPickup={setPickup}
                firstChangeDate={firstChangeDate}
               
              />

              <p className="italic text-lg font-FuturaPTBook  text-orange">
                {" "}
                Have your laundry out by 8am
              </p>

              <div className="flex justify-start">
              {currentStep > 2 ? <CustomButton
                 isDisabled={btnDisable}
                 loadingStyle="text-xl md:text-2xl"
                 loading={btnDisable}
                  title= "Update"
                  btnType="submit"
                  inputStyles="text-2xl text-white  border px-12 py-[4px]"
                /> : <CustomButton
                isDisabled={btnDisable}
                loadingStyle="text-xl md:text-2xl"
                loading={btnDisable}
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

export default Scheduling;
