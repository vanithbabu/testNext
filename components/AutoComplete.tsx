"use client";
import Script from 'next/script';
import { fetchAddress } from "@/store/features/address/addressSlice";
import {useAppDispatch,useAppSelector } from '@/store';
import {dashboardStyle} from '@/styles/index';
import {validateAndFetchAddress} from '@/lib/apiCall';
import {fetchscheduling} from '@/store/features/scheduling/schedulingSlice';
import { useState,ChangeEvent, useEffect  } from 'react';
import { Toast } from "@/lib/toast";
import Bugsnag from '@/lib/bugsnagConfig'

interface AutoCompleteProps {
  updateFormatAddress: (address: string) => void;
  error_Address: (message: string) => void;
  buttonDisabled: (value: boolean) => void;
  nextStep: (values: number) => void;
}

const Autocomplete: React.FC<AutoCompleteProps> = ({ updateFormatAddress, error_Address,buttonDisabled,nextStep }) => {
  const dispatch = useAppDispatch();
  const zipcode =  useAppSelector(state => state.zipcode.zipcode);
  const formatAddress = useAppSelector((state) => state.address.address);
  const cityAddress = useAppSelector((state) => state.address.city);
  const stateAddress = useAppSelector((state) => state.address.state);
  const zipcodeAddress = useAppSelector((state) => state.zipcode.zipcode);
  let newAddress='';
  if(formatAddress!=''&& cityAddress!='' && cityAddress!='')
  {
  newAddress=formatAddress+', '+cityAddress+ ', '+stateAddress+','+zipcodeAddress;
  }
  const [inputAddress, setInputAddress] = useState<string>(newAddress);
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  const initializeAutocomplete = () => {
    const options: google.maps.places.AutocompleteOptions = {
      types: ['geocode'], // Limit results to addresses for better accuracy
    };

    const input = document.getElementById('addressField') as HTMLInputElement;
    const newAutocomplete: google.maps.places.Autocomplete = new google.maps.places.Autocomplete(input, options);

    newAutocomplete.addListener('place_changed', async() => {
      buttonDisabled(true);
      const place =   newAutocomplete.getPlace();
      error_Address('');
      const formattedAddress: string = place.formatted_address || '';  
      let city: string = '';
      let state: string = '';
      let streetNumber: string = '';
      let route: string = '';
  
      // Extract city, state, street number, and route from the address components
      place.address_components?.forEach((component) => {
        if (component.types.includes('locality')) {
          city = component.long_name;
        } else if (component.types.includes('administrative_area_level_1')) {
          state = component.short_name;
        } else if (component.types.includes('street_number')) {
          streetNumber = component.long_name;
        } else if (component.types.includes('route')) {
          route = component.long_name;
        }
      });
 
        // To use the promise
        setInputAddress(formattedAddress);
  validateAndFetchAddress(formattedAddress, zipcode)
  .then((result:any) => {
     if(result.available){
   
           dispatch(fetchscheduling({
              storeId: result.storeId,
              address_id: result.address_id,
              pickupDate: [],
              deliverydDate: [],
           }));
          updateFormatAddress(formattedAddress);
          Toast({
            type: "success",
            message: "Entered address is inside zipcode",
          });
          const unitNumber=result.name=='H'?true:false;
          dispatch(fetchAddress({ address: streetNumber+' '+route, city: city, state: state, address2:"", unitNumber:unitNumber }));
          buttonDisabled(false);
        }else{
      error_Address(result.message);
  
      dispatch(fetchAddress({ address: '', city: '', state: '',address2:"",unitNumber:false }));
      dispatch(fetchscheduling({
       storeId: 0,
       address_id: 0,
       pickupDate: [],
       deliverydDate: [],
     }));
     }
    }).catch ((error: any)=> {
      Bugsnag.notify(error);
      error_Address(error);
      dispatch(fetchAddress({ address: '', city: '', state: '',address2:"",unitNumber:false }));
      dispatch(fetchscheduling({
       storeId: 0,
       address_id: 0,
       pickupDate: [],
       deliverydDate: [],
     }));
 });   

});

    setAutocomplete(newAutocomplete);
  };

  const handleInputClick = () => {
    initializeAutocomplete();
 
  };

  const addressFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    buttonDisabled(true);
    nextStep(1);
    setInputAddress('');
    if (e.target.value === '') {
      error_Address('');
      updateFormatAddress('');
    }
  setInputAddress(e.target.value);
  };
  
  useEffect(() => {
    // Initialize the Autocomplete instance after the window has loaded
    window.addEventListener('load', initializeAutocomplete);
   // updateFormatAddress(newAddress);
    return () => {
      // Remove the event listener to avoid memory leaks
      window.removeEventListener('load', initializeAutocomplete);
    };
  }, []); // Run only once on component mount


  return (
    <div>
      <input
        id="addressField"
        onClick={handleInputClick}
        className={`${dashboardStyle} w-full bg-[#f9f9f9] rounded-[15px] text-lg  border-2 border-[#b6b6b6]  shadow-[#c5c1bf]`}
        onChange={addressFieldChange}
        value={inputAddress}
      />
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&libraries=places&libraries=places`}
        onLoad={initializeAutocomplete}
      />
    </div>
  );
};

export default Autocomplete;
