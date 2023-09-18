"use client";
import { CustomTextAreaProps } from "@/types";
import { useFormContext } from 'react-hook-form';
const TextArea = ({
isDisabled,
  isRequired,
  inputStyles,
  placeHolder,
  rows,
  label,
  labelStyles,
  error,
  name,
  value,

}: CustomTextAreaProps) => {
  const { register} = useFormContext();
 
 return(<div className="flex flex-col">
  {label?<label className={`italic ${labelStyles}`} >{label}   {isRequired ? <span className="text-danger"> *</span> : ''}</label> :''}

  <textarea
   {...register(name)}
    disabled={isDisabled}
    required={isRequired}
    placeholder={placeHolder}
    rows={rows}
    defaultValue={value}
    className={`py-3 px-4 border-2 border-[#b6b6b6] bg-[#f9f9f9] shadow-[#c5c1bf] resize-none  font-FuturaPTBook shadow-sm focus:outline-none  focus:border-orange ${inputStyles}`}

  ></textarea>
  {error ? <span role="alert" className="text-red mb-1 font-FuturaPTBook text-xl font[450]">{error}</span> : <div className="my-4"></div>}
  </div>);
  
};

export default TextArea;
