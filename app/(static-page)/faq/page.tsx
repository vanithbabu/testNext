import PageHeading from "@/components/common/PageHeading"; // Import PageHeading component
import type { Metadata } from "next"; // Import Metadata type from "next"
import Image from "next/image"; // Import Image component from Next.js
import { getApi } from "@/lib/apiCallMethod"; 
import FaqAcoordion from "@/components/common/FaqAccordion";
import Bugsnag from '@/lib/bugsnagConfig'


// Metadata definition
export const metadata: Metadata = {
  title: "FAQs — Laundry Pickup and Delivery Service | Margo's Laundry",
  description:
    "Here are the frequent queries we are answering for our Laundry Services, across Champaign Urbana. Try Margo's Laundrys Professional Laundry services with its best offers.",
};
interface FaqItem {
  id:number,
  question: string;
  answer: string;
  is_active:boolean;
}

async function getData() {
  try {
    const response = await getApi('/v7/faq');
    if (response.success) {
      const data: FaqItem[] = response.data.is_success ? response.data.data : [];
      return data;
    } else {
      return [];
      //throw new Error('Failed to fetch data');
    }
  } catch (error: any) {
    Bugsnag.notify(error);
    return [];
   // throw new Error('Failed to fetch data');
  }
 
}

// Faq component
export default async function Faq() {
  const data = await getData(); 
  return (
    <main className="max-w-7xl mx-auto flex min-h-screen flex-col justify-between px-4">
      <div className="text-orange font-bold pb-4 lg:pb-8">
        <PageHeading textStyles="mt-8 pb-8" title="Frequently Asked Questions" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
          {data.map((item: FaqItem) => 
            item.is_active && (
            <FaqAcoordion key={item.question} question={item.question} answer={item.answer}/>
          ))}
        </div>
      </div>
    </main>
  );
}
