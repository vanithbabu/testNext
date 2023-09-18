"use client";
import { formatDate } from '@/lib/dateConversion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface OrderTableDetailsProps {
  ordersData:any;
}
const OrderTable: React.FC<OrderTableDetailsProps> = ({ordersData}) => { // Explicitly specify that OrderTable is a functional component

const [data,setData]=useState<any>();
  useEffect(()=>{
    setData(ordersData);
  },[ordersData])
  if (!data || data.length === 0) {
    return (
      <table  className="w-full text-sm text-left text-black  mt-4 font-FuturaPTMedium font-[400]  ">
      <thead className="text-lg bg-[#ECF1F4] font-FuturaPTMedium">
        <tr>
          <th className="px-6 py-3 font-[400] ">Delivery Date </th>
          <th className="px-6 py-3 font-[400] ">Order Number</th>
          <th className="px-6 py-3 font-[400] ">Price</th>
          <th className="px-6 py-3 font-[400] ">Status</th>
          <th className="px-6 py-3 font-[400] ">Invoice</th>
        </tr>
      </thead>
      <tbody className="bg-white border-b text-lg text-gray-700">
      <tr>
      <td colSpan={5} className="px-6 py-4">
      <div className="mt-4">
        <p className="text-black text-center font-FuturaPTMedium text-2xl">
          No Record Found
        </p>
      </div>
      </td>
      </tr>
      </tbody>
    </table>
    );
  }

  return (
   
        <table  className="w-full text-sm text-left text-black  mt-4 font-FuturaPTMedium font-[400]  ">
    <thead className="text-lg bg-[#ECF1F4] font-FuturaPTMedium">
      <tr>
        <th className="px-6 py-3 font-[400] ">Delivery Date </th>
        <th className="px-6 py-3 font-[400] ">Order Number</th>
        <th className="px-6 py-3 font-[400] ">Price</th>
        <th className="px-6 py-3 font-[400] ">Status</th>
        <th className="px-6 py-3 font-[400] ">Invoice</th>
      </tr>
    </thead>
      <tbody className="bg-white border-b text-lg text-gray-700">
        {data.length > 0  && data.map((orderDetails:any) =>(
          <tr key={orderDetails?.id}>
            <td className="px-6 py-4">{formatDate(orderDetails?.deliveryDate?.date || '')}</td>
            <td className="px-6 py-4">{orderDetails?.id}</td>
            <td className="px-6 py-4">{orderDetails?.total}</td>
            <td className="px-6 py-4 text-orange">{orderDetails?.status}</td>
            {orderDetails?.status == 'DELIVERED' && <td className="px-6 py-4 text-blue underline cursor-pointer">
              <Link href={orderDetails?.invoice_url}  target="_blank" >
              View Invoice </Link></td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderTable;
