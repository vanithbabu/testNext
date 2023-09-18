"use client";
import { useAppSelector } from '@/store';
import { useState,useEffect } from 'react';
import {pickUpDateFormat} from '@/lib/dateConversion';

interface PickupDateProps {
    changeDate:boolean,
    setDelivery: (date: string) => void;
    setPickup: (date: string) => void;
    firstChangeDate:(value:boolean) => void;
}
const PickupDateChange: React.FC<PickupDateProps> = ({changeDate,setDelivery,setPickup,firstChangeDate}) => {
    const pickupDates = useAppSelector(state => state.scheduling.pickupDate);
    const deliveryDates = useAppSelector(state => state.scheduling.deliverydDate);
    const selectedDeliveryDate = useAppSelector(state => state.selectedDate.deliveryDate);
    const selectedPickupDate = useAppSelector(state => state.selectedDate.pickupDate);
    const pickupUpcomingDate = Object.values(pickupDates);
    const deliveryUpcomingDate = Object.values(deliveryDates);
    const filterpickupUpcomingDate = pickupUpcomingDate.filter(item => !item.hasOwnProperty('version') || !item.hasOwnProperty('rehydrated'));
    const filterdeliveryUpcomingDate = deliveryUpcomingDate.filter(item => !item.hasOwnProperty('version') || !item.hasOwnProperty('rehydrated'));
   
    const [pickup1,setpickup1]=useState('');
    const [delivery1,setDelivery1]=useState('');

    useEffect(()=>{
       
        setDelivery(selectedDeliveryDate || filterdeliveryUpcomingDate[0]||'');
        setPickup(selectedPickupDate|| filterpickupUpcomingDate[0]||'');
        setpickup1(selectedPickupDate|| filterpickupUpcomingDate[0]||'');
        setDelivery1(selectedDeliveryDate || filterdeliveryUpcomingDate[0]||'');
    },[]);
  
const changePickUpDate=(e: React.ChangeEvent<HTMLSelectElement>)=>{
    e.preventDefault();
    const newPickupDate = e.target.value;
    setPickup(newPickupDate);
    setpickup1(newPickupDate);
    const pickupindex = filterpickupUpcomingDate.indexOf(e.target.value);
    setDelivery(filterdeliveryUpcomingDate[pickupindex]);
    setDelivery1(filterdeliveryUpcomingDate[pickupindex]);
    firstChangeDate(false);


};
    return (
        <>
            <div className="flex flex-row gap-6 items-center">
                <div className="item-left">
                    <h3 className="font-FuturaPTDemi text-black text-sm md:text-lg">Your pickup day is:</h3>
                </div>
                {changeDate  &&<select
                   onChange={changePickUpDate}
                    id="pickupDate"
                    value={pickup1}
                    className={`grow py-3 px-2 border-2 border-[#b6b6b6] shadow-sm shadow-[#c5c1bf] font-FuturaPTBook focus:outline-none focus:border-orange`}
                   
                >
                    {filterpickupUpcomingDate.map((pickdate)=>{
                       return( <option key={pickdate.toString()} value={pickdate}>{pickUpDateFormat(pickdate.toString())}</option>)
                    })
                }
            
                </select> }

                {!changeDate && <span className="ml-3 font-FuturaPTDemi text-blue text-sm md:text-xl">{pickUpDateFormat(pickup1.toString())}</span>}
              
            </div>

            <div className="flex flex-row gap-6 items-center">
                <div className="item-left">
                    <h3 className="font-FuturaPTDemi text-black text-sm  md:text-lg">Your delivery day is:</h3>
                </div>
                <span className=" font-FuturaPTDemi text-blue text-sm md:text-xl">{pickUpDateFormat(delivery1.toString())}</span>
               
            </div>
        </>
    );
}

export default PickupDateChange;
