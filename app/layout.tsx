import './globals.css'
import {ToasterWrapper} from '@/components';
import type { Metadata } from "next";
import localFont from 'next/font/local';

const chicle = localFont({
  src: '../public/assets/fonts/Chicle/Chicle-Regular.ttf', 
  variable: '--font-chicle'
})
const FuturaPTBook = localFont({
  src: '../public/assets/fonts/FuturaPT//FuturaPTBook.otf', 
  variable: '--font-futura-pt-book'
})
const FuturaPTBold = localFont({
  src: '../public/assets/fonts/FuturaPT/FuturaPTBold.otf', 
  variable: '--font-futura-pt-bold'
});
const FuturaPTLight = localFont({
  src: '../public/assets/fonts/FuturaPT/FuturaPTLight.otf', 
  variable: '--font-futura-pt-light'
});
const FuturaPTMedium = localFont({
  src: '../public/assets/fonts/FuturaPT/FuturaPTMedium.otf', 
  variable: '--font-futura-pt-medium'
});
const FuturaPTDemi = localFont({
  src: '../public/assets/fonts/FuturaPT/FuturaPTDemi.otf', 
  variable: '--font-futura-pt-demi'
});


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
    <html lang="en" className={`scroll-smooth  ${chicle.variable}  ${FuturaPTBold.variable}  ${FuturaPTLight.variable } ${FuturaPTMedium.variable } ${FuturaPTDemi.variable } ${FuturaPTBook.variable} `}>
      <body className='antialiased'>
          {children}
        <ToasterWrapper />
      </body>
    </html>
  )
}
