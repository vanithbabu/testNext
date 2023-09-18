import * as yup from 'yup';
const EMAIL_REGX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const ProfileSchema = yup.object({
    first_name: yup
        .string()
        .required('First name is required'),
    last_name: yup
        .string()
        .required('Last name is required'),
    email: yup
        .string()
        .required('Email is required')
        .matches(EMAIL_REGX, "Must be a valid email"),
    phone: yup
        .string()
        .required('Mobile number is required')
        .min(12,'Please enter valid phone number')
        .max(12,'Please enter valid phone number')
});

export const DashboardOrderDetailSchema = yup.object({
    delivery_notes: yup
        .string(),
    delivery_loc: yup
        .string()
        .required('Pickup from is required'),
    unit_number:yup.string().nullable(true)
  
       
  });

  export const DashboardPreferenceDetailSchema = yup.object({
 
    frequencyId: yup
        .number()
        .required('select plan is required'),
       
  });