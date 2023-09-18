import { ChangeEvent, MouseEventHandler } from "react";


export interface CustomButtonProps {
  isDisabled?: boolean;
  btnType?: "button" | "submit";
  inputStyles?: string;
  title: string;
  rightIcon?:string;
  loading?:boolean;
  loadingStyle?:string;
  loadingSize?:string
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface CustomInputBoxProps {
  isDisabled?: boolean;
  isRequired?: boolean;
  type?: "number" | "text" |"hidden" |"email" | "password";
  inputStyles?: string;
  labelStyles?: string;
  placeHolder?: string;
  label?:string;
  icon?:boolean;
  IconStyle?:string;
  name:string;
  error?:any;
  errorStyles?:string;

}


export interface CustomRadioButtonProps {
  isDisabled?: boolean;
  isRequired?: boolean;
  inputStyles?: string;
  labelStyles?: string;
  isChecked?: boolean;
  label?:string;
  register?:any;
  name:string;
  value:any;
  errorStyles?:string;
}


export interface CustomTextAreaProps {
  isDisabled?: boolean;
  isRequired?: boolean;
  inputStyles?: string;
  labelStyles?: string;
  placeHolder?: string;
  label?:string;
  rows:number;
  name?:any;
  error?:any;
  value?:string;

}

export interface CustomPageHeadingProps {

  textStyles?: string;
  title: string;

}

export interface ModalPopupProps {
  template:any;
}


export interface ChangePasswordProps {
  handleModalClose?:  any;
  handleModalSubmit?: any;
}


export interface AddCardProps {
  handleModalClose?:  any
  handleModalSubmit?: any;
}

export interface LogoutConfirmationProps {
  handleModalClose?:  any
  handleModalSubmit?: any;
}

export interface SupportTeamCardProps {
  text: string;
  textStyle?:string;

}

export interface UserTypes {
  first_name: string;
  last_name: string;
  email:string;
  phone:string;
}

export interface SubscribeFormValues {
  email: string;
}

export interface ContactFormValues {
  email: string;
  name: string;
  phone: string;
  message:string;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface ForgotPasswordFormValues{
  email: string;
}

export interface  DecryptedData {
  status: boolean;
  email: string;
}

export interface ResetPassworFormValues {
  confirmPassword: string;
  password: string;
}

export interface HelpFormValues{
  email: string, 
  subject: string,
  message: string
}

export interface ZipcodeFormValues
{
  zipcode:string,
}

export interface ActiveCampaignFormValues
{
  email:string
}
export interface CreateAccountFormValues
{
  first_name: string,
  last_name: string, 
  email: string, 
  phone: string, 
  password: string, 
  confirmPassword:string
}

export interface updateAccountFormValues
{
  first_name: string,
  last_name: string, 
  email: string, 
  phone: string, 
}

export interface OrderDetailsFormValues
{
  delivery_notes?: string,
  delivery_loc: string,
  unit_number?: string |null
}
export interface DashboardOrderDetailsFormValues
{
  delivery_notes?: string,
  delivery_loc: string ,
  unit_number?:string | null
}

export interface ProfileFormValues
{
  first_name: string,
  last_name: string,
  email: string,
  phone: string
}

export interface ChangePasswordFormValues
{
  old_password: string,
  confirm_password: string, 
  new_password: string 
}

export interface DashboardPreferenceDetailsFormValues
{
  frequencyId:number,
}