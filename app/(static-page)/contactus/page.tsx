import PageHeading from "@/components/common/PageHeading";
import type { Metadata } from "next";
import { ContactForm, SupportTeamCard } from "@/components";

export const metadata: Metadata = {
  title: "Contact — Laundry Pickup and Delivery Service | Margo's Laundry",
  description:
    "If you have any kind of queries related margos laundry and regarding its service, do fill up the form or call us. We will get back to you within 24 hrs",
};

export default function ContactUs() {

  return (
    <main className="max-w-7xl mx-auto  flex min-h-screen flex-col  justify-between px-4">
      <div className="text-orange font-FuturaPTMedium  pb-4 lg:pb-8">
        <PageHeading textStyles="mt-8 pb-8" title="Get In Touch" />

        <div className="grid grid-cols-1   lg:grid-cols-[50%,40%] place-content-between  mt-4">
          <div>
            <p className="pb-4 text-center font-chicle text-yellow text-4xl  ">
              Use the contact form below or you can also call or text us at
              844-427-7457 during business hours Monday-Friday 9am-5pm
            </p>
            <ContactForm />            
          </div>
         <SupportTeamCard text="I’m happy to help!" textStyle="text-xl sm:text-3xl xl:text-4xl"/>
        </div>
      </div>
    </main>
  );
}
