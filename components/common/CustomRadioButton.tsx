"use client";
import { CustomRadioButtonProps } from "@/types";
import {CustomRadioButtonStyle} from '@/styles';
import { useFormContext } from 'react-hook-form';
const CustomRadioButton = ({
  isDisabled,
  isRequired,
  label,
  inputStyles,
  labelStyles,
  isChecked,
  name,  

value,

}: CustomRadioButtonProps) => 
{

  const { register} = useFormContext();
return  (<div className="flex items-center gap-2">

  <input
    {...register(name)}
    disabled={isDisabled}
    defaultChecked={isChecked}
    type="radio"
    value={value}
    className={`${CustomRadioButtonStyle} w-5 h-5 appearance-none rounded-[50%] checked:bg-blue shadow-xl  checked:shadow-xl focus:shadow-xl checked:rounded-[50%] checked:border-[3px] focus:border-[3px] checked:border-white    focus:rounded-[50%] focus:border-white   ${inputStyles}`}
   
  />
    {label?<label className={`italic text-lg ${labelStyles}`} >{label}   {isRequired ? <span className="text-danger"> *</span> : ''}</label> :''}
  </div>);
  };

export default CustomRadioButton;



