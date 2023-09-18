"use client";
import { AddCard, CustomButton, ModalPopup } from "@/components";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useAppSelector } from "@/store";

interface PaymentDetailsProps {
  currentStep: number;
  nextStep: (values: number) => void;
  errorMsg: string;
  showPaymentErrorMsg: (values: string) => void;
  ID:string;
  paymentDetailReference:any;
}
const PaymentDetails: React.FC<PaymentDetailsProps> = ({
  currentStep,
  nextStep,
  errorMsg,
  showPaymentErrorMsg,
  ID,
  paymentDetailReference,
}) => {
 
  const [modal, setModal] = useState(false);
  const {cards} = useAppSelector((state) => state.creditCards);
 
  const handleModalOpen = () => {
    showPaymentErrorMsg('');
    setModal(true);
  };
  const handleModalSubmit = () => {
    showPaymentErrorMsg('');
    setModal(false);
  };
 
  useEffect(()=>{
if(cards.length==0)
{
  setModal(true);
}
  },[currentStep]);

  return (
    <>
      <div
        className="flex items-center justify-between md:px-10"
        id={ID} ref={paymentDetailReference}
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
            Payment
          </h2>
        </div>
      </div>
   
     { currentStep==4 && <div className="mt-4 md:px-10">
          <hr />

          { cards.length > 0  && cards.map((card:any) => {
            if (card.status == "PRIMARY") {
              return (
                <div key={card.id}>
                  <p className=" text-xl mt-4 font-FuturaPTBook text-[#1E1E1E]">
                    Credit Card
                  </p>

                  <div className="flex flex-wrap mb-4 items-center gap-2 lg:gap-8 font-semibold">
                    <p>xxxx-xxxx-xxxx-{card.last4}</p>
                    <p>
                      {card.exp_month < 10
                        ? `0${card.exp_month}`
                        : card.exp_month.toString().padStart(2, "0")}
                      /{card.exp_year.toString().slice(-2)}
                    </p>
                  </div>
                </div>
              );
            }
          })}
          {cards.length > 0 && (
            <CustomButton
              handleClick={handleModalOpen}
              title="Update Credit Card"
              btnType="button"
              inputStyles="text-2xl text-white  border px-12 py-[4px]  font-FuturaPTBook"
            />)
}

{cards.length == 0 && (
            <CustomButton
              handleClick={handleModalOpen}
              title="Credit Card"
              btnType="button"
              inputStyles="text-2xl text-white  border px-12 py-[4px]  font-FuturaPTBook"
            />)
}
            {errorMsg != "" && (
            <p
              role="alert"
              className={`text-red mt-0  mb-4 font-FuturaPTBook text-xl font[450]`}
            >
              {errorMsg}
            </p>
          )}

{ modal && (
            <ModalPopup
              template={
                <AddCard
                  handleModalClose={()=>setModal(false)}
                  handleModalSubmit={()=>{handleModalSubmit(); setModal(false);}}
                />
              }
            />
          )}

        </div> }
      
    </>
  );
};

export default PaymentDetails;
