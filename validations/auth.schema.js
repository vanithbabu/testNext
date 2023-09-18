import * as yup from 'yup';
const EMAIL_REGX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const loginSchema = yup.object().shape({
  email:yup
  .string()
  .required('Email is required')
  .matches(EMAIL_REGX, "Must be a valid email"),
  password: yup.string()
    .required('Password is required')
    .min(6,'Password must be at least 6 characters')
    .max(16,'Password must be at most 16 characters'),
});

export const forgotSchema =  yup.object().shape({
  email:yup
  .string()
  .required('Email is required')
  .matches(EMAIL_REGX, "Must be a valid email"),
});

export const resetSchema = yup.object({
  password: yup
  .string()
  .required('Password is required')
  .min(6).max(16),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .min(6).max(16)
    .oneOf([yup.ref('password'), null], 'Passwords must match')
 
});

export const changePasswordSchema = yup.object({
  old_password: yup
  .string()
  .required('Old password is required')
  .min(6,'Old password must be at least 6 characters')
  .max(16,'Old password must be at most 16 characters'),
  new_password:  yup
  .string()
  .required('Password is required')
  .min(6,'Password must be at least 6 characters')
  .max(16,'Password must be at most 16 characters'),
  confirm_password: yup
    .string()
    .required('Confirm password is required')
    .min(6,'Confirm password must be at least 6 characters')
    .max(16,'Confirm password must be at most 16 characters')
    .oneOf([yup.ref('new_password'), null], 'Passwords must match')
  
});

export const createAccountSchema = yup.object({
  email: yup
  .string()
  .required('Email is required')
  .matches(EMAIL_REGX, "Must be a valid email"),
  password: yup
    .string()
    .required('Password is required')
    .min(6,'Password must be at least 6 characters')
    .max(16,'Password must be at most 16 characters'),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .min(6,'Password must be at least 6 characters')
    .max(16,'Password must be at most 16 characters')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
  first_name: yup
    .string()
    .required('First name is required')
    .min(1,'First name must be at least 1 characters')
    .max(12,'First name must be at most 30 characters'),
  last_name: yup
    .string()
    .required('Last name is required')
    .min(1,'Last name must be at least 1 characters')
    .max(30,'Last name must be at most 30 characters'),
  phone: yup
  .string()
  .required('Phone number is required')
  .min(12,'Please enter valid phone number')
  .max(12,'Please enter valid phone number'),
});

export const updateUserAccountSchema = yup.object({
  email: yup
  .string()
  .required('Email is required')
  .matches(EMAIL_REGX, "Must be a valid email"),
  first_name: yup
    .string()
    .required('First name is required'),
  last_name: yup
    .string()
    .required('Last name is required'),
  phone: yup
  .string()
  .required('Phone number is required')
  .min(12,'Please enter valid phone number')
  .max(12,'Please enter valid phone number'),
});

export const subscribeSchema =  yup.object().shape({
  email:yup
  .string()
  .required('Email is required')
  .matches(EMAIL_REGX, "Must be a valid email"),
});
