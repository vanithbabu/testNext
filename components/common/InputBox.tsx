"use client";
import { CustomInputBoxProps } from "@/types";
import Image from "next/image";
import { useFormContext } from 'react-hook-form';
import {useState} from 'react';
import EyeOpenImg from '@/public/assets/icons/eye-show.svg'
import EyeCloseImg from '@/public/assets/icons/eye-close.svg'
const InputBox = ({
  isDisabled,
  isRequired,
  label,
  type,
  inputStyles,
  labelStyles,
  placeHolder,
  error,
  icon,
  IconStyle,
  name,
  errorStyles,
}: CustomInputBoxProps) => 
{
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { register} = useFormContext();

  return (
  <div className="flex flex-col relative">
    {label ? <label className={`italic ${labelStyles}`} >{label}   {isRequired ? <span className="text-red"> *</span> : ''}</label> : ''}
    <input
      {...register(name)}
      disabled={isDisabled}
      required={isRequired}
      type={isPasswordVisible ? 'text' : type}
      placeholder={placeHolder}
      className={`bg-[#f9f9f9] py-3 px-4 border-2 border-[#b6b6b6] shadow-sm shadow-[#c5c1bf] font-FuturaPTBook focus:outline-none  focus:border-orange ${inputStyles}`}
    />
    {/* {error && <span role="alert" className={`text-red mb-2 font-FuturaPTBook text-xl font[450] ${errorStyles}`}>{error}</span>} */}
    {error ? <span role="alert" className={`text-red mb-1 font-FuturaPTBook text-xl font[450] ${errorStyles}`}>{error}</span>: <div className="my-4"></div>}
    {icon && !isPasswordVisible &&
      <Image
        src={EyeCloseImg}
        alt="eye close"
        width={20}
        height={20}
        placeholder="blur"
        priority
        className={`absolute ${IconStyle}`}
        onClick={() => setIsPasswordVisible(true)}
      />}
    {icon && isPasswordVisible && <Image
      src={EyeOpenImg}
      alt="eye open"
      priority
      width={20}
      placeholder="blur"
      height={20}
      className={`absolute ${IconStyle}`}
      onClick={() => setIsPasswordVisible(false)}
    />}
  </div>
  );
  };

export default InputBox;
