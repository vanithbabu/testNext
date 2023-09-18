import * as yup from 'yup';
export const OrderDetailSchema = yup.object({
    unit_number:yup.string().nullable(true),
    delivery_notes: yup
        .string(),
    delivery_loc: yup
        .string()
        .required('Pickup from is required'),
  });