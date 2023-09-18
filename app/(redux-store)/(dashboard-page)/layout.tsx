"use client";
import { SideBar } from "@/components";
import {useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import { useAppDispatch,useAppSelector } from '@/store';
import { fetchProfile } from "@/store/features/profile/profileSlice";
import { fetchCreditCard } from "@/store/features/creditCard/creditCardSlice";
import { fetchOrder } from "@/store/features/orders/orderSlice";
import {fetchOrderData,fetchDashboard} from '@/lib/apiCall';
import {fetchPreferenceData} from "@/lib/apiCall";
import { fetchPreference } from "@/store/features/preferences/preferenceSlice";
import { fetchFrequency } from "@/store/features/frequency/frequencySlice";
import { fetchzipcode } from "@/store/features/zipcode/zipcodeSlice";
import { fetchselectedDate } from "@/store/features/selectedDate/selectedDateSlice";
import { fetchUser } from "@/store/features/createUser/createUserSlice";
import {fetchAddress} from '@/store/features/address/addressSlice';

export default  function DashbordLayout({
  children,
}: {
  children: React.ReactNode
}) {
const dispatch = useAppDispatch();
 
  const {userID} = useAppSelector(state => state.auth);
  const router = useRouter();
  const isAuth =  Cookies.get('cdone_token');
  const fetchData = async () => {
    await Promise.all([
      fetchDashboard(dispatch, fetchProfile, fetchCreditCard,fetchFrequency,fetchzipcode,fetchUser,fetchAddress),
      fetchOrderData(dispatch, fetchOrder, userID),
      fetchPreferenceData(dispatch, fetchPreference, userID),  
    ]);
  };
  useEffect(() => {
    if (!isAuth) {
      router.push("/login");
    }
    else
    {
      
       fetchData();
      
    }
  },[]);

  return (
      <>
      <SideBar />
      {children}
     </>
  );
}
