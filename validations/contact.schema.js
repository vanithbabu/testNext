import * as yup from 'yup';
const EMAIL_REGX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const zipcodeSchema = yup.object({
    zipcode: yup
        .string()
        .required('Zipcode is required')
        .matches(/^[0-9]*$/, 'Zipcode should be a valid number')
        .min(5, 'Zipcode should be minimum 5 numbers')
        .max(6,'Zipcode should be maximum 6 numbers'),
});

export const ActiveCampaignSchema = yup.object({
 
    email: yup
        .string()
        .required('Email is required')
        .matches(EMAIL_REGX, "Must be a valid Email"),
});
export const userContactSchema = yup.object({
    subject: yup
        .string()
        .required('Subject is required')
        .max(100,'Subject must be at most 100 characters'),
    email: yup
        .string()
        .required('Email is required')
        .matches(EMAIL_REGX, "Must be a valid Email"),
    message: yup
        .string()
        .required('Description is required')
        .max(255),

});
export const ContactUsSchema = yup.object({
    name: yup
        .string()
        .required('Name is required'),
    email: yup
        .string()
        .required('Email is required')
        .matches(EMAIL_REGX, "Must be a valid Email"),
    phone: yup
        .string()
        .required('Phone number is required')
        .min(12,'Please enter valid phone number')
        .max(12,'Please enter valid phone number'),
    message: yup
        .string()
        .required('Message is required'),
       
  });