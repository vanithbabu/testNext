import PageHeading from '@/components/common/PageHeading';
import { getApi } from '@/lib/apiCallMethod';
import type { Metadata } from "next"; 
import {formatDate} from '@/lib/dateConversion';
import Bugsnag from '@/lib/bugsnagConfig'

export const metadata: Metadata = {
  title: "Terms & Conditions — Laundry Pickup and Delivery Service | Margo's Laundry",
  description:"Read the terms and conditions of  Margo's laundry Champaign Urbana Laundry Service.",
};
interface termsConditionContent {
  title: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}
export const dynamic='force-dynamic';
async function getData() {
  try {
    const response =  await getApi('/v7/page/terms-conditions');
    if (response.success) {
      const data: termsConditionContent = response.data.is_success ? response.data.data : {};
      return data;
    } else {
      return {updated_at:new Date(),title:'',description:''}
    //  throw new Error('Failed to fetch data');
    }
  } catch (error: any) {
    Bugsnag.notify(error);
    return {updated_at:new Date(),title:'',description:''}
    //throw new Error('Failed to fetch data');
  }
}


export default async function TermsCondtions() {

  const data = await getData(); 

  const updatetime = formatDate(data.updated_at);

  return (
    <main className="max-w-7xl mx-auto font-FuturaPTMedium flex min-h-screen flex-col items-center justify-between px-4">
      <div className="text-orange pb-4 lg:pb-8 text-xl">
        <PageHeading textStyles="mt-8 mb-8 pt-4" title={data.title} />
        <p className="text-center mb-4">Last Updated: {updatetime}</p>
        <div className='[&>p]:mb-4 [&>p]:leading-6 [&>p>a]:text-blue [&>p>a]:underline [&>p>a]:ml-1 [&>p>a]:break-all [&>ol]:list-decimal [&>ol]:list-outside  [&>ol]:ml-4  [&>ol]:lg:ml-8  [&>ol]:mb-4 [&>ul]:list-disc [&>ul]:list-outside  [&>ul]:ml-4  [&>ul]:lg:ml-8  [&>ul]:mb-4' dangerouslySetInnerHTML={{ __html: data.description }} />
      </div>
    </main>
  );
}
