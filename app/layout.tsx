import './globals.css'
import {ToasterWrapper} from '@/components';
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: 'Laundry Pickup and Delivery Service | Margo Laundry',
  description: 'Laundry Pickup and Delivery Service - $1.50/lb + Free Delivery + No Fees.',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='scroll-smooth'>
      <body className='antialiased'>
          {children}
        <ToasterWrapper />
      </body>
    </html>
  )
}
