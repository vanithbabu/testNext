"use client";
import Image from 'next/image';
import { useSearchParams, useRouter  } from 'next/navigation';
import { useEffect, useState } from 'react';
import {postApi} from '@/lib/apiCallMethod';
import Bugsnag from '@/lib/bugsnagConfig'
import Loading from "@/app/(redux-store)/(dashboard-page)/dashboard/loading";
import {shortPickUpDateFormat} from '@/lib/dateConversion';

const Invoice = () => {
    const params = useSearchParams();
    const router = useRouter();
    const order = params.get('order') ?? '';
    const user = params.get('user') ?? '';
    const [data,setData]=useState<any>({});
    const[loading,setLoading]= useState(true);

    const fetchInVoiceData=async()=>{
        try {
            const response = await postApi('/v6/invoice', { order: order.trim().replace(" ", "+"),user:user.trim().replace(" ", "+") });
            if (response.success) {
              setData(response.data);
           
              return response.data;
            } else {
              
                return{};
            }
          } catch (error: any) {
            Bugsnag.notify(error);
          
            return{};
          }
    }

    useEffect(()=>{
        fetchInVoiceData();
    },[]);
    useEffect(()=>{
        if (data=='')
        {
            router.push('/404');
          }else
          {
            setLoading(false);
          }
    },[data]);


    if(loading)
    {
     return <Loading></Loading>;
    }
    const transactionKeys = Object.keys(data?.transactions || {});
    let transactionTotal=0;
    let productTotal=0;
    let taxFeeTotal=0;
    let couponAmount=0;

    {transactionKeys.map((key) => {
        const transaction = data?.transactions?.[key];
        if (!transaction) return null; // Skip if transaction is missing
        transactionTotal+=transaction.amount;
      })}

    {data?.products?.length > 0 && data.products.map((product:any)=>{
    productTotal+=product.amount;    
    })}

    {data?.price_modifiers?.length > 0 && data.price_modifiers.map((product:any)=>{
    if (product.modifier_type === 'Dryv\\Planes\\Plan' || product.modifier_type === 'Dryv\\Billing\\Tax') {
    taxFeeTotal+=product.amount;
    }
    else
    {
        transactionTotal+= Math.abs(product.amount); 
        couponAmount+=Math.abs(product.amount);
    }
    })}
    return (
        <div>
            <section className='max-w-5xl mx-auto shadow-md '>
                <div className='bg-[#40c198] py-4 flex justify-center items-center'>
                    <h3 className='font-FuturaPTMedium text-center text-2xl text-white font-[900]'> PAID</h3>
                </div>
                <div className="mx-auto py-4 px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 py-8  text-center md:text-left">
                        <div className="">
                            <Image
                                src="/assets/images/margo_logo.svg"
                                alt="Margo Logo"
                                width="600"
                                height={45}
                                blurDataURL={"/assets/images/margo_logo.svg"}
                                priority
                                placeholder="blur"
                            />
                        </div>
                        <div className="text-right">
                            <h3 className="font-FuturaPTBook text-gray-600 text-2xl">Pickup Date : {shortPickUpDateFormat(data?.pickup?.created)} </h3>
                            <h3 className="font-FuturaPTBook text-gray-600 text-2xl">Payment Amount : ${(productTotal+taxFeeTotal-couponAmount)/100} </h3>
                            <h3 className="font-FuturaPTBook text-gray-600 text-2xl">Amount due : <span className='text-black font-FuturaPTMedium font-[900] '>${((productTotal+taxFeeTotal)-transactionTotal)/100 }</span> </h3>
                            <h3 className={`font-FuturaPTMedium  ${((productTotal+taxFeeTotal)-transactionTotal)/100==0?'text-green':'text-orange' } text-2xl font-[900]`}> {((productTotal+taxFeeTotal)-transactionTotal)/100==0?'PAID':'PENDING PAYMENT' }</h3>

                        </div>
                    </div>
                    <div className=''>
                        <div className="px-2">
                            <h3 className='font-FuturaPTMedium font-[900]   text-3xl text-black'> Billed to: </h3>
                            <h3 className='font-FuturaPTBook  text-2xl text-gray-600'> {data?.user?.first_name} {data?.user?.last_name} </h3>
                        </div>
                    </div>
                    <div className="mt-12">
                        <hr />
                    </div>
                    <div className="">
                        <h3 className='font-FuturaPTMedium  font-[900]  text-3xl mb-4 text-black'>Products</h3>
                        <table className="w-full text-3xl text-right text-black  mt-4 font-FuturaPTMedium font-[400]  ">
                            <thead className="text-2xl text-gray-600 bg-[#ECF1F4] font-FuturaPTMedium">
                                <tr>
                                    <th className="px-2 py-2 font-[400] text-left">Description</th>
                                    <th className="px-2 py-2 font-[400] ">Price</th>
                                    <th className="px-2 py-2 font-[400] ">Pieces</th>
                                    <th className="px-2 py-2 font-[400] ">Total</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white text-right text-xl text-black">
                                {data?.products?.length > 0 && data.products.map((product:any)=>{
return(
    <tr className='border-b' key={product.id}>
    <td className="px-2 py-2 text-left">{product.name}</td>
    <td className="px-2 py-2">${product.amount/100}</td>
    <td className="px-2 py-2">{product.quantity}</td>
    <td className="px-2 py-2">${product.amount/100}</td>
</tr>
)
                                })}
                               
                                <tr>
                                    <td colSpan={3} className="px-2  text-left">Product Total</td>
                                    <td className="px-2 py-2">${productTotal/100}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-4">
                        <hr />
                    </div>
                    <div className="">
                        <h3 className='font-FuturaPTMedium font-[900]  text-3xl mb-4 mt-8 text-black'>Taxes and Fees</h3>
                        <table className="w-full text-3xl text-right text-black   font-FuturaPTMedium font-[400]  ">
                            <thead className="text-2xl bg-[#ECF1F4] font-FuturaPTMedium text-gray-600">
                                <tr>
                                    <th colSpan={3} className="px-2 py-3 font-[400] text-left">Description</th>
                                    <th className="px-2 py-2 font-[400] ">Total</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white text-right text-xl text-black">

                            {data?.price_modifiers?.length > 0 && data.price_modifiers.map((product:any)=>{
                               if (product.modifier_type === 'Dryv\\Planes\\Plan' || product.modifier_type === 'Dryv\\Billing\\Tax') {
return(
    <tr className='border-b' key={product.id}>
    <td colSpan={3} className="px-2 py-2 text-left">{product.name}</td>
    <td className="px-2 py-2">${product.amount/100}</td>
</tr>
)
                                }
                                })}
                               <tr>
                                    <td colSpan={3} className="px-2 py-2 text-left">Tax Total</td>
                                    <td className="px-2 py-2">$ {taxFeeTotal/100}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-4">
                        <hr />
                    </div>
                    <div className="">
                        <h3 className='font-FuturaPTMedium font-[900]  text-3xl mb-4 mt-8 text-black'>Payments</h3>
                        <table className="w-full text-3xl text-right text-black   font-FuturaPTMedium font-[400]  ">
                            <thead className="text-2xl bg-[#ECF1F4] font-FuturaPTMedium text-gray-600">
                                <tr>
                                    <th colSpan={3} className="px-2 py-3 font-[400] text-left">Description</th>
                                    <th className="px-2 py-2 font-[400] ">Total</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white text-right text-xl text-black">

                            {data?.price_modifiers?.length > 0 && data.price_modifiers.map((product:any)=>{
                               if (product.modifier_type !== 'Dryv\\Planes\\Plan' && product.modifier_type !== 'Dryv\\Billing\\Tax' ) {
return(
    <tr className='border-b' key={product.id}>
    <td colSpan={3} className="px-2 py-2 text-left">{product.name}</td>
    <td className="px-2 py-2">${product.amount/100}</td>
</tr>
)
                                }
                                })}

{transactionKeys.map((key) => {
        const transaction = data?.transactions?.[key];
        if (!transaction) return null; // Skip if transaction is missing

        return (
          <tr key={key} className='border-b'>
            <td colSpan={3} className="px-2 py-2 text-left">{transaction.type}</td>
            <td className="px-2 py-2">${transaction.amount / 100}</td>
          </tr>
        );
      })}
                               <tr>
                                    <td colSpan={3} className="px-2 py-2 text-left">Payments Total</td>
                                    <td className="px-2 py-2">${transactionTotal/100} </td>
                                </tr>
                            </tbody>
                        </table>
                    </div> 


                    <div className="text-right  mt-5">
                        <h3 className="font-FuturaPTBook text-gray-600 text-2xl">Invoice Amount : ${(productTotal+taxFeeTotal)/100} </h3>
                        <h3 className="font-FuturaPTBook text-gray-600  text-2xl">Payment Amount : ${(productTotal+taxFeeTotal-couponAmount)/100} </h3>
                        <h3 className="font-FuturaPTBook text-gray-600  text-2xl">Amount due : ${((productTotal+taxFeeTotal)-transactionTotal)/100 } </h3>
                    </div>
                </div>
                <div className='bg-[#f15b29] py-4 mt-6 flex justify-center items-center'>
                    <h3 className='font-FuturaPTBook text-center text-2xl  text-white'> 
                    Questions? Contact Support</h3>
                </div>
                <div className="mt-8 px-8">
                    <Image
                        className='mx-auto'
                        src="/assets/images/margo_logo.svg"
                        alt="Margo Logo"
                        width="600"
                        height={45}
                        blurDataURL={"/assets/images/margo_logo.svg"}
                        priority
                        placeholder="blur"
                    />
                </div>
            </section>
        </div>
    );
};

export default Invoice;