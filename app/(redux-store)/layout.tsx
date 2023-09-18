"use client";
import ReduxProvider from "@/store/ReduxProvider";
export default function reduxLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
        <ReduxProvider>
          {children}
        </ReduxProvider>
   
  )
}
