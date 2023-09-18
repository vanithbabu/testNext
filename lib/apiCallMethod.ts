"use strict"; // Ensure strict mode is enabled
import axios from 'axios';
import Cookies from 'js-cookie';
import Bugsnag from '@/lib/bugsnagConfig'

// Configure cookie attributes
Cookies.withAttributes({ path: '/', domain: process.env.NEXT_PUBLIC_BASE_URL });

const getOAuthToken = async (): Promise<{ success: boolean, data?: string, error?: string }> => {
  try {
      let token = Cookies.get('cdone_oauth_token');

      if (!token || token === '') {
          const response = await axios.post(
              `${process.env.NEXT_PUBLIC_BASE_URL}/api/oauth-token`,
              {},
              { headers: { 'Content-Type': 'application/json' } }
          );

          if (response.status === 200 && response.data && response.data.access_token) {
              const expirationDate = new Date();
              expirationDate.setTime(expirationDate.getTime() + 60 * 60 * 1000); // 1 hour
              Cookies.set('cdone_oauth_token', response.data.access_token, { secure: true, expires: expirationDate });

              return { success: true, data: response.data.access_token, error: '' };
          } else {
              return { success: false, data: '', error: 'OAuth token not received from the server' };
          }
      }

      return { success: true, data: token, error: '' };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const responseData = error.response?.data;   
      Bugsnag.notify(responseData);
    }
      return { success: false, data: '', error: 'Error while fetching or handling OAuth token' };
  }
};

export const postApi = async (url: string, field: any) => {
  try {
    // Obtain an OAuth token using the getOAuthToken() function
    const tokenResponse = await getOAuthToken();
    
    // Check if token retrieval was successful
    if (!tokenResponse.success) {
      return { success: false, data: '', error: tokenResponse.error };
    }

    let headers=  {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${tokenResponse.data}`
    }

    let token = Cookies.get('cdone_token');
  
    if (token) {
     headers=   {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      };
    }
   
    // Make a POST request to the specified URL
    const response = await axios.post<any>(
      `${process.env.NEXT_PUBLIC_API_END_POINT}${url}`,
      field,
      {headers}
    );

    // Return the response from the API
    if(response.data)
    {
    return { success: true, data: response.data, error: '' };
    }
    else
    {
      throw Error('No response');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
        const responseData = error.response?.data;   
        Bugsnag.notify(responseData);

      if (error.response?.status === 400) {
        // Handle bad request error here
     
        return { success: false, data: responseData.errors[0], error: error.response?.statusText };
      }

      if (error.response?.status === 422) {
        // Handle bad request error here
   
        return { success: false, data: responseData.message, error: error.response?.statusText };
      }
  
      // Handle other errors, including network errors
      return { success: false, data: null, error: error.message };
    }
    
    // Handle unexpected errors
    return { success: false, data: null, error: 'An unexpected error occurred.' };
  }
};



export const getApi = async (url: string) => {
  try {
    // Obtain an OAuth token using the getOAuthToken() function
    const tokenResponse = await getOAuthToken();
    
    // Check if token retrieval was successful
    if (!tokenResponse.success) {
      return { success: false, data: '', error: tokenResponse.error };
    }

    
    let headers=  {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${tokenResponse.data}`
    }

    let token = Cookies.get('cdone_token');
   
    if (token) {
     headers=   {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      };
    }

    // Make a POST request to the specified URL
    const response = await axios.get<any>(
      `${process.env.NEXT_PUBLIC_API_END_POINT}${url}`,
      {headers}
    );

    // Return the response from the API
    return { success: true, data: response.data, error: '' };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const responseData = error.response?.data;
      Bugsnag.notify(responseData);
      if (error.response?.status === 400) {
        // Handle bad request error here
     
        return { success: false, data: responseData.errors[0], error: error.response?.statusText };
      }

      if (error.response?.status === 422) {
        // Handle bad request error here
   
        return { success: false, data: responseData.message, error: error.response?.statusText };
      }
  
      // Handle other errors, including network errors
      return { success: false, data: null, error: error.message };
    }
    
    // Handle unexpected errors
    return { success: false, data: null, error: 'An unexpected error occurred.' };
  }
};

export const deleteApi = async (url: string) => {
  try {
    // Obtain an OAuth token using the getOAuthToken() function
    const tokenResponse = await getOAuthToken();
    
    // Check if token retrieval was successful
    if (!tokenResponse.success) {
      return { success: false, data: null, error: tokenResponse.error };
    }

    
    let headers=  {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${tokenResponse.data}`
    }

    let token = Cookies.get('cdone_token');
   
    if (token) {
     headers=   {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      };
    }

    // Make a POST request to the specified URL
    const response = await axios.delete<any>(
      `${process.env.NEXT_PUBLIC_API_END_POINT}${url}`,
      {headers}
    );

    // Return the response from the API
    return { success: true, data: response.data, error: '' };
  } catch (error) {
    if (axios.isAxiosError(error)) { 
      const responseData = error.response?.data;  
      Bugsnag.notify(error);

      if (error.response?.status === 400) {
        // Handle bad request error here
     
        return { success: false, data: responseData.errors[0], error: error.response?.statusText };
      }

      if (error.response?.status === 422) {
        // Handle bad request error here
   
        return { success: false, data: responseData.message, error: error.response?.statusText };
      }
  
      // Handle other errors, including network errors
      return { success: false, data: null, error: error.message };
    }
    
    // Handle unexpected errors
    return { success: false, data: null, error: 'An unexpected error occurred.' };
  }
};

export const patchApi = async (url: string, field: any) => {
  try {
    // Obtain an OAuth token using the getOAuthToken() function
    const tokenResponse = await getOAuthToken();

    // Check if token retrieval was successful
    if (!tokenResponse.success) {
      return { success: false, data: '', error: tokenResponse.error };
    }

 
    let headers=  {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${tokenResponse.data}`
    }

    let token = Cookies.get('cdone_token');
  
    if (token) {
     headers=   {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      };
    }
   

    // Make a PATCH request to the specified URL
    const response = await axios.patch<any>(
      `${process.env.NEXT_PUBLIC_API_END_POINT}${url}`,
      field,
      { headers }
    );

    // Return the response from the API
    return { success: true, data: response.data, error: '' };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const responseData = error.response?.data;   
      Bugsnag.notify(responseData);

      if (error.response?.status === 400) {
        // Handle bad request error here
        return { success: false, data: responseData.errors[0], error: error.response?.statusText };
      }

      if (error.response?.status === 422) {
        // Handle unprocessable entity error here
        return { success: false, data: responseData.message, error: error.response?.statusText };
      }

      // Handle other errors, including network errors
      return { success: false, data: null, error: error.message };
    }

    // Handle unexpected errors
    return { success: false, data: null, error: 'An unexpected error occurred.' };
  }
};

// login

export const LoginApi = async (url: string, field: any) => {
  try {
    // Obtain an OAuth token using the getOAuthToken() function
    const tokenResponse = await getOAuthToken();
    
    // Check if token retrieval was successful
    if (!tokenResponse.success) {
      return { success: false, data:null , error: tokenResponse.error };
    }

    // Make a POST request to the specified URL
    const response = await axios.post<any>(
      `${process.env.NEXT_PUBLIC_API_END_POINT}${url}`,
      field,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${tokenResponse.data}`
        }
      }
    );

    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + 60 * 60 * 1000); // 1 hour
    Cookies.set('cdone_token', response.data.token, { secure: true, expires: expirationDate });

    return { success: true, data: response.data, error: '' };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const responseData = error.response?.data;   
      Bugsnag.notify(responseData);

      if (error.response?.status === 401) {
        // Handle Unauthorized error here
     
        return { success: false, data: responseData.error, error: error.response?.statusText };
      }

      // Handle other errors, including network errors
      return { success: false, data: null, error: error.message };
    }
    
    // Handle unexpected errors
    return { success: false, data: null, error: 'An unexpected error occurred.' };
  }
};

