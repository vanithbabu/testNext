import { getApi,postApi } from '@/lib/apiCallMethod';
import axios from 'axios';
import Bugsnag from '@/lib/bugsnagConfig'

export const fetchOrderData = async (dispatch:any,fetchOrder:any,userID:number) => {
    try {
      const response = await getApi(`/v6/users/${userID}/history`);
      if (response.success) {
        dispatch(fetchOrder(response?.data || []));
      }
      else
      {
        dispatch(fetchOrder([]));
      }
    } catch (error: any) {
      Bugsnag.notify(error);
      dispatch(fetchOrder( []));
    }
  };

  const loadformatPhoneNumber = (value:any) => {
    const phone = value;
    const cleanedInput = phone.replace(/-/g, '');
    const cleanedAndTrimmed = cleanedInput.slice(0, 10);
    if (cleanedAndTrimmed) {
      const formattedPhoneNumber =
        cleanedAndTrimmed.slice(0, -4).match(/.{1,3}/g).join('-') +
        '-' +
      cleanedAndTrimmed.slice(-4);
      return formattedPhoneNumber;
     
  }
  return phone;
  };
  export const fetchDashboard = async (dispatch:any,fetchProfile:any,fetchCreditCard:any, fetchFrequency:any,fetchzipcode:any,fetchUser:any,fetchAddress:any,) => {
    try {
      const response = await getApi(`/v6/users/dashboard`);
      if (response.success) {
        dispatch(fetchProfile({
          first_name: response.data.data.user_detail.first_name,
          last_name:response.data.data.user_detail.last_name,
          email:  response.data.data.user_detail.email,
          phone:  response.data.data.user_detail.phone,
          address_services:response.data.data?.address_services|| {},
          user_orders:response.data.data?.user_orders|| {},
          address_time_slot:response.data.data?.address_time_slot?.data || {},
        }));
        dispatch(fetchFrequency({frequencyId:response.data.data?.user_plan?.programId || 0}));
        dispatch(fetchCreditCard(response.data.data?.user_credit_cards||[]));
        dispatch(fetchzipcode({zipcode:response.data?.data?.address_services?.zipcode||0,available_services:response.data?.data?.address_services?.available_services || []}));
        dispatch(
          fetchUser({
            first_name: response.data.data.user_detail.first_name,
            last_name: response.data.data.user_detail.last_name,
            email: response.data.data.user_detail.email,
            phone: loadformatPhoneNumber(response.data.data.user_detail.phone),
            id: response.data.data.user_id,
          })
        );

        dispatch(fetchAddress({ address:response.data.data?.address_services?.address, city: response.data.data?.address_services?.city, state: response.data.data?.address_services?.state, address2:response.data.data?.address_services?.address2, unitNumber:response.data.data?.address_services?.name=='H'?true:false, }));
     
      } 
    } catch (error: any) {
      Bugsnag.notify(error);
    }
  };


  export const fetchPreferenceData = async (dispatch:any,fetchPreference:any,userID:number) => {
    try {
      const response = await getApi(`/v6/users/${userID}/preferences`);
      if (response.success) {
        dispatch(fetchPreference({delivery_loc:response.data.delivery_loc,delivery_notes:response.data.delivery_notes}));
      } 
    } catch (error: any) {
      Bugsnag.notify(error);
    }
  };

  export const getStripeToken = async (field:any) => {
    try {
      let headers=  {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_STRIPE_SECRET}`
      }
      // Make a POST request to the specified URL
      const response = await axios.post<any>(
        `https://api.stripe.com/v1/tokens`,
        field,
        {headers}
      );
 if( response.data.id)
 {
      return { success: true, data: response.data, error: '' };
 }
 else
 {
  return { success: false, data: null, error: response.data.error.message };
 }
    } catch (error: any) {
      Bugsnag.notify(error);
      // Handle unexpected errors
      if (axios.isAxiosError(error)) {
        const responseData = error.response?.data;
      
      return { success: false, data: null, error: responseData.error.message };
      }
    }
      
  };


  export const validateAndFetchAddress = (formattedAddress:string, zipcode:number)=> {
    return new Promise(async (resolve, reject) => {
      try {
        const checkZipcodeAddressResponse =await postApi(`/v6/zipcode/address-validation`,{"formatted_address":formattedAddress,"zipcode":zipcode});
        if (checkZipcodeAddressResponse.success && checkZipcodeAddressResponse.data.under_zipcode) {
          const getStoreIDResponse =  await postApi(`/v6/address/validate`,{"formatted_address":formattedAddress});
          if (getStoreIDResponse.success && getStoreIDResponse.data) {
            resolve(getStoreIDResponse.data);
          } else {
            reject(getStoreIDResponse.data);
          }
        } else {
       if(checkZipcodeAddressResponse.data)
       {
          reject(checkZipcodeAddressResponse.data);
       }
       else
       {
        reject('The address you have entered is not a valid USPS address.  Please check that you have entered it correctly');
       }
        }
      } catch (error: any) {
        Bugsnag.notify(error);
        reject(error); 
      }
    });
  }
  

  