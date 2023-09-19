"use client";
import Image from "next/image";
import Link from "next/link";
import {OrderTable} from '@/components';
import { useAppSelector,useAppDispatch } from '@/store';
import {pickUpDateFormat} from '@/lib/dateConversion';
import { useState,useEffect  } from 'react'
import { errorToast } from '@/constants/utis';
import { Toast,capitalizeFirstWord } from '@/lib/toast';
import { patchApi } from '@/lib/apiCallMethod';
import { fetchOrder } from "@/store/features/orders/orderSlice";
import { fetchProfile } from "@/store/features/profile/profileSlice";
import { fetchCreditCard } from "@/store/features/creditCard/creditCardSlice";
import { fetchFrequency } from "@/store/features/frequency/frequencySlice";
import {fetchOrderData,fetchDashboard} from '@/lib/apiCall';
import { fetchzipcode } from "@/store/features/zipcode/zipcodeSlice";
import {fetchAddress} from '@/store/features/address/addressSlice';
import { fetchUser } from "@/store/features/createUser/createUserSlice";
import Loading from "../loading";
import Bugsnag from '@/lib/bugsnagConfig'
import OrderImg from '@/public/assets/icons/order_icon.svg';

export default function Orders() {

  const currentOrder:any = useAppSelector((state) => state.profile.user_orders);
  const dispatch = useAppDispatch();

  const userID = useAppSelector((state) => state.auth.userID);
  const currentOrderTime_slot:any = useAppSelector((state) => state.profile.address_time_slot);
  const [newOrder, setNewOrder] = useState(false);
  const [currentOrderID, setCurrentOrderID] = useState('');
  const [btnDisable, setbtnDisable] = useState(false)
  const[loading,setLoading]= useState(true);
  const orderData = useAppSelector((state) => state.orders.orders);
  const orders = Object.values(orderData);
  const filterOrders:any[]  = orders.filter(item => !item.hasOwnProperty('version') || !item.hasOwnProperty('rehydrated'));
  filterOrders.sort((a, b) => b.id - a.id);

  useEffect(() => {
 
    setNewOrder(currentOrder.hasOwnProperty("pickupDate")?true:false);
    setCurrentOrderID(currentOrder.id);
    if(filterOrders.length>0)
    {
    setLoading(false);
    }
  }, [filterOrders,currentOrder]);
  const order_id=currentOrder.id;
  const SkipOrder=async()=>{

const body={
  skip: 2
};
setbtnDisable(true)
try {
  const response = await patchApi(`/v6/users/${userID}/orders/${order_id}`, body);
  if (response.success) {
     fetchOrderData(dispatch,fetchOrder,userID);
     fetchDashboard(dispatch, fetchProfile, fetchCreditCard,fetchFrequency,fetchzipcode,fetchUser,fetchAddress);
   Toast({ type: 'success', message: capitalizeFirstWord(response.data.message) });
    setbtnDisable(false);
  } else {
    
   
      Toast({ type: 'error', message: capitalizeFirstWord(response.data.message) });

   
    }
    setbtnDisable(false)
  
} catch (error: any) {
  Bugsnag.notify(error);
  errorToast();
  setbtnDisable(false)
}

  }
  if(loading)
  {
   return <Loading></Loading>;
  }
  return (
    <div className="p-4 lg:ml-[300px]">
      <div className="px-4 lg:px-12 py-4  mx-auto">
        <h1 className="font-FuturaPTDemi text-4xl">Orders</h1>
        <hr />

        <section className="mt-4  shadow-lg bg-[#F6FBFE] px-8 py-4 flex flex-wrap gap-4   lg:gap-12 lg:mt-12 justify-between">
          <div className="flex gap-8 lg:gap-16">
            <Image
              src={OrderImg}
              alt="Margo Logo"
              width={75}
              height={75}
            />
        <>
        {newOrder?(
          <section>
        <p className="text-orange font-FuturaPTMedium text-xl">Next pickup</p>
        <p className="text-black font-FuturaPTMedium font-[600] text-xl">{pickUpDateFormat(currentOrder?.pickupDate?.date|| '')}</p>
        <p className="text-[#92999E] font-FuturaPTMedium text-xl">{currentOrderTime_slot?.pickup?.start_time} - {currentOrderTime_slot?.pickup?.end_time}</p>
         </section>):(<section>
        <p className="text-orange font-FuturaPTMedium text-xl">Current Order</p>
        <p className="text-black font-FuturaPTMedium text-xl">No Current Order</p>
        </section>) }
           </>

          </div>
          <div className="flex flex-wrap justify-between items-center gap-4 mt-4 lg:mt-0" >
           {currentOrderID && <button
            disabled={btnDisable}
            onClick={SkipOrder}
              className="bg-white text-lg font-[450] rounded-full  border-blue text-blue  border px-6 py-[6px] font-FuturaPTMedium hover:bg-white hover:text-blue hover:border-blue hover:border"
            > 
            {  btnDisable &&
    (<div className="flex  items-center text-lg ">  <svg aria-hidden="true" role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path>
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
    </svg>
    <span className="text-lg ">Please wait...</span></div>)
}
             {!btnDisable && <p>Skip This Order</p> }
            </button>}
            {!newOrder &&
            <Link
              href="/laundry/plans"
              className="bg-blue text-lg font-[450] rounded-full  text-white  border px-6 py-[6px] font-FuturaPTMedium hover:bg-white hover:text-blue hover:border-blue hover:border"
            >
              Start New Order
            </Link>
}
          </div>

        </section>
        <section className="mt-4 lg:mt-12">
          <h2 className="font-FuturaPTDemi text-2xl">Past Orders</h2>
          <div className="overflow-x-auto">
            <OrderTable ordersData={filterOrders} />
          </div>
        </section>
      </div>
    </div>
  );
}
