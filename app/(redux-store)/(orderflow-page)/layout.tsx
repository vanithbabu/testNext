"use client";
import {OrderFlowFooter,OrderFlowHeader} from "@/components"

export default function SchedulePickupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='bg-[#E9F1F4]'>
      <OrderFlowHeader />
      {children}
      <OrderFlowFooter />
    </div>
  )
}
