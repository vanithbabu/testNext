"use client";

import {LogoutConfirmationProps} from "@/types";

import CustomButton from "./common/CustomButton";


 const LogoutConfirmation = ({handleModalClose,handleModalSubmit}: LogoutConfirmationProps) => {
 
   

    return  (
        <div>
        <div className="py-6">
          <h2 className="text-center text-2xl lg:text-3xl font-FuturaPTDemi ">
           Logout
          </h2>
        </div>
        <div className="bg-white px-8 sm:px-16 md:px-24  pb-6">
        
        <p className="text-xl text-center text-gray-500">Are you sure do you want to logout ?</p>
              
        
        </div>
        <div className="bg-light-blue px-4 py-4 md:py-6 text-center flex justify-center items-center">
          <div className="flex gap-2 md:gap-4">
            <CustomButton
               handleClick={handleModalClose}
              title="No"
              inputStyles="bg-white border-2 border-dark-blue text-dark-blue text-md px-8 sm:px-12 md:text-lg"
            />
            <CustomButton
              handleClick={handleModalSubmit}
               btnType="submit"
              title="Yes"
              inputStyles=" border border-dark-blue text-white bg-dark-blue text-md  px-8 sm:px-12  md:text-lg"
            />
          </div>
        </div>
      </div>
        
    );
  }; 

  export default LogoutConfirmation;
  