import React from "react";
import { ModalPopupProps } from "@/types";
import CustomButton from "./CustomButton";
import InputBox from "./InputBox";
import Image from "next/image";

const ModalPopup = ({ template }: ModalPopupProps) => {
  return (
    <div className="fixed z-50 overflow-y-auto top-0 w-full left-0" id="modal">
      <div className="flex items-center justify-center min-height-100vh pt-4 md:px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
          &#8203;
        </span>
        <div className="inline-block align-center bg-white  text-left overflow-hidden shadow-xl transform transition-all my-16 md:my-8 sm:align-middle sm:max-w-[650px] sm:w-full">
         {template}
        </div>
      </div>
    </div>
  );
};

export default ModalPopup;
