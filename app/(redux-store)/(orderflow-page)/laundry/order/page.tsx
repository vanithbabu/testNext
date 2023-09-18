"use client";
import {
  CustomButton,
  Accordion,
  AccountInfo,
  OrderDetails,
  PaymentDetails,
  Scheduling,
} from "@/components";
import { useState,useRef } from "react";
import { useEffect } from "react";
import { useAppSelector } from "@/store";
import { useRouter } from "next/navigation";
import { postApi } from "@/lib/apiCallMethod";
import { Toast } from "@/lib/toast";
import { errorToast } from "@/constants/utis";
import Bugsnag from '@/lib/bugsnagConfig'

export default function Order() {
  const router = useRouter();
  const { zipcode } = useAppSelector((state) => state.zipcode);
  const { address, city, state,address2 } = useAppSelector((state) => state.address);
  const { storeId } = useAppSelector((state) => state.scheduling);
  const [btnDisable, setbtnDisable] = useState(false);
  const orderDetailDivRef = useRef<HTMLDivElement | null>(null);
  const schedulingDetailDivRef =useRef<HTMLDivElement | null>(null);
  const accountInfoDivRef = useRef<HTMLDivElement | null>(null);
  const paymentDetailDivRef = useRef<HTMLDivElement | null>(null);
  const first_name = useAppSelector((state) => state.createUser.first_name);
  const last_name = useAppSelector((state) => state.createUser.last_name);
  const email = useAppSelector((state) => state.createUser.email);
  const phone = useAppSelector((state) => state.createUser.phone);
  const [createOrderErrorMsg, setCreateOrderErrorMsg]=useState('');
  const { pickupDate, deliveryDate } = useAppSelector(
    (state) => state.selectedDate
  );
  const userID = useAppSelector((state) => state.auth.userID);
  const {cards} = useAppSelector((state) => state.creditCards);
 

  const S_frequencyId = useAppSelector((state) => state.frequency.frequencyId);
  const planDetails = useAppSelector(
    (state) => state.zipcode.available_services
  );
  const plans: any = Object.values(planDetails);
  const delivery_loc = useAppSelector((state) => state.preference.delivery_loc);
  const delivery_notes = useAppSelector(
    (state) => state.preference.delivery_notes
  );
  const [paymentErrorMsg, setPaymentErrorMsg] = useState("");
  const [accountError, setAccountError] = useState("");
  useEffect(() => {
    if (zipcode == 0) {
      router.push("/laundry/zipcode");
    }
  }, []);



let steps = address !== '' && city !== '' && state !== '' && delivery_loc !== '' ? (
  pickupDate != '' || deliveryDate != '' ? (
    (userID !== 0 &&first_name!='' && last_name!='' && email!='' && phone!='' ) ? 4 : 3
  ) : 1
) : 1;



  const [step, SetStep] = useState(1);

  useEffect(() => {
    SetStep(steps);

  
    const scrollToRef = (ref: React.RefObject<HTMLDivElement>, block: ScrollLogicalPosition, inline: ScrollLogicalPosition) => {
      if (ref.current) {
        ref.current.scrollIntoView({
          behavior: 'smooth',
          block,
          inline,
        });
      }
    };
  
    switch (steps) {
      case 1:
        scrollToRef(orderDetailDivRef, 'start', 'end');
        break;
      case 2:
        scrollToRef(schedulingDetailDivRef, 'start', 'end');
        break;
      case 3:
        scrollToRef(accountInfoDivRef, 'start', 'end');
        break;
      case 4:
        scrollToRef(paymentDetailDivRef, 'start', 'end');
        break;
      default:
        // Handle other cases or do nothing if needed
    }
  }, [steps]);
  

  const nextStep = (data: number) => {
    SetStep(data);
  };
  const showAccountErrorMsg = (msq: string) => {
    setAccountError(msq);
  };

  const showPaymentErrorMsg = (msq: string) => {
    setPaymentErrorMsg(msq);
  };

  const getServiceIdByProgramId = (programId: number) => {
    for (const plan of plans) {
      if (plan.programId === programId) {
        return plan.serviceId;
      }
    }
    return null;
  };
  const CreateOrder = async () => {
    setbtnDisable(true);
    if (accountError != "") {

      if (accountInfoDivRef.current) {
        (accountInfoDivRef.current  as HTMLDivElement).scrollIntoView({
          behavior: 'smooth', // You can use 'auto' for instant scrolling
         block: 'start',    // Scroll to the top of the element
        });
      }
      nextStep(3);
      return;
    }
    if (cards.length == 0) {
      setPaymentErrorMsg("Please add the credit Card");
      setbtnDisable(false);
      return;
    }
    try {
   
        const addressBody = {
          address: address,
          city: city,
          state: state,
          zip: zipcode,
          address2:address2,
          cleaner_id: storeId,
        };
        const addressResponse = await postApi(
          `/v6/users/${userID}/addresses`,
          addressBody
        );
        if (addressResponse.success) {

     
              const createOrderBody = {
                userId: userID,
                storeId: storeId,
                bagLocationId: 1,
                planId: getServiceIdByProgramId(S_frequencyId),
                planTotes: 1,
                description: "",
                pickupDate: pickupDate,
                deliveryDate: deliveryDate,
                pickupDeliveryDetails:delivery_notes,
              };
              const orderResponse = await postApi(
                `/v6/users/${userID}/orders`,
                createOrderBody
              );
              if (orderResponse.success) {
                let preferenceData={
                  delivery_loc: delivery_loc, 
                  delivery_notes: delivery_notes,
                 }
              await postApi(`/v6/users/${userID}/preferences`, preferenceData);
                   
                router.push("/laundry/thankyou");
                Toast({ type: "success", message: "Order created successfully" });
              }
              else
              {
                  setCreateOrderErrorMsg(orderResponse.data);
              }
           
            
          

        } else {
         
        
            setCreateOrderErrorMsg('Address invalid or incorrect format');
          
        }
     
    } catch (error: any) {
      Bugsnag.notify(error);
      errorToast();
    }
    setbtnDisable(false);
  };
  return (
    <>
      <Accordion
        template={<OrderDetails currentStep={step} nextStep={nextStep} ID="orderDetail" 
        orderDetailReference={orderDetailDivRef}
        schedulingDetailReference={schedulingDetailDivRef}

        />}
      />
      <Accordion
        template={<Scheduling currentStep={step} nextStep={nextStep} ID="schedulingDetail" 
      
        schedulingDetailReference={schedulingDetailDivRef}
        accountInfoReference={accountInfoDivRef}  />}
      />
      <Accordion
        template={
          <AccountInfo
            currentStep={step}
            nextStep={nextStep}
            errorMsg={accountError}
            showAccountErrorMsg={showAccountErrorMsg}
            ID="accountInfo"
            accountInfoReference={accountInfoDivRef}
            paymentDetailReference={paymentDetailDivRef}
          />
        }
      />
      <Accordion
        template={
          <PaymentDetails
            currentStep={step}
            nextStep={nextStep}
            errorMsg={paymentErrorMsg}
            showPaymentErrorMsg={showPaymentErrorMsg}
            ID="paymentDetails"
            paymentDetailReference={paymentDetailDivRef}
          />
        }
      />
      <div className="max-w-7xl mx-auto flex py-3 px-4">
        <CustomButton  
          loadingStyle="text-xl md:text-2xl"
          loading={btnDisable}
          handleClick={CreateOrder}
          isDisabled={(step == 4 && !btnDisable)  ? false : true}
          title="Continue"
          btnType="submit"
          inputStyles="bg-[#4F4F4F] text-2xl text-white  border px-12 py-[4px]"
        />
      </div>
      <div className="max-w-7xl mx-auto flex py-3 px-4">
      {createOrderErrorMsg != "" && (
            <p
              role="alert"
              className={`text-red mt-0  mb-4 font-FuturaPTBook text-xl font[450]`}
            >
              {createOrderErrorMsg}
            </p>)}
      </div>
    </>
  );
}
