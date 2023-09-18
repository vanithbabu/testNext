"use client";
import { AllOrder } from "@/components/ThankyouPage/AllOrder";
import { FirstOrder } from "@/components/ThankyouPage/FirstOrder";
import { ThankyouPage } from "@/components/ThankyouPage/Layout";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import { useAppDispatch,useAppSelector } from '@/store';
import { fetchProfile } from "@/store/features/profile/profileSlice";
import { fetchCreditCard } from "@/store/features/creditCard/creditCardSlice";
import {fetchOrderData,fetchDashboard} from '@/lib/apiCall';
import { fetchOrder } from "@/store/features/orders/orderSlice";
import {fetchPreferenceData} from "@/lib/apiCall";
import { fetchPreference } from "@/store/features/preferences/preferenceSlice";
import { fetchFrequency } from "@/store/features/frequency/frequencySlice";
import { fetchzipcode } from "@/store/features/zipcode/zipcodeSlice";
import {useEffect, useState } from "react";
import { fetchUser } from "@/store/features/createUser/createUserSlice";
import {fetchAddress} from '@/store/features/address/addressSlice';
import Loading from "../../loading";
import { fetchscheduling } from "@/store/features/scheduling/schedulingSlice";
export default function Thankyou() {
    const {userID} = useAppSelector(state => state.auth);
    const orderData = useAppSelector((state) => state.orders.orders);
    const orders = Object.values(orderData);
    const filterOrders:any[]  = orders.filter(item => !item.hasOwnProperty('version') || !item.hasOwnProperty('rehydrated'));
    filterOrders.sort((a, b) => b.id - a.id);
    const[noOfOrder,setNoOfOrder]= useState(0);
    const[loading,setLoading]= useState(true);
    const disableBackButton = () => {
      window.history.pushState(null, '', window.location.href);
      window.onpopstate = function () {
        window.history.pushState(null, '', window.location.href);
      };
    };
    const router = useRouter();
    const isAuth =  Cookies.get('cdone_token');
    const dispatch = useAppDispatch();
    const fetchData = async () => {
        await Promise.all([
          fetchDashboard(dispatch, fetchProfile, fetchCreditCard,fetchFrequency,fetchzipcode,fetchUser,fetchAddress),
          fetchOrderData(dispatch, fetchOrder, userID),
          fetchPreferenceData(dispatch, fetchPreference, userID),  
          dispatch(
            fetchscheduling({
              storeId: 0,
              address_id: 0,
              pickupDate: [],
              deliverydDate: [],
            })
          ),        
        ]);
      };
      useEffect(() => {
        disableBackButton();
        if (!isAuth) {
          router.push("/login");
        }
        else
        {
          
           fetchData();
           setNoOfOrder(filterOrders.length);
           setLoading(false);
          
        }
      },[]);
    const orderResponse=noOfOrder==1?<ThankyouPage template={<FirstOrder />}/> :<ThankyouPage template={<AllOrder />}/>;
   
   if(loading)
   {
    return <Loading></Loading>;
   }
    return (
      orderResponse
    );
}
  