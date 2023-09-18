import '../globals.css'
import type { Metadata } from 'next'
import { Footer, Header } from "@/components";

export const metadata: Metadata = {
  title: 'Laundry Pickup and Delivery Service | Margo Laundry',
  description: 'Laundry Pickup and Delivery Service - $1.50/lb + Free Delivery + No Fees.',
}

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
  <div className='bg-[#fcf5f2]'>
      <Header />
      {children}
      <Footer />
  </div>
  )
}
