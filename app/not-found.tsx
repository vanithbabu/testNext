import Link from "next/link";
import { Footer, Header } from "@/components";

export default function Custom404() {
    return (
      <>
      <Header />   
    <div className="bg-[url('/assets/images/404.webp')] bg-no-repeat bg-bottom bg-cover h-[500px] md:bg-cover md:h-[89vh] flex flex-col justify-end items-center gap-2 " >
      <h1 className='text-orange  text-3xl md:text-6xl font-chicle '>404 Error</h1>
      <h1 className='text-orange   text-3xl   md:text-6xl font-chicle'>Page Not Found</h1>
    <Link href="/" className="custom-btn hover:opacity-80 rounded-full bg-blue text-white  text-3xl py-3 px-12  font-FuturaPTMedium mb-8 mt-4 "> Go to Homepage</Link>
</div>
<Footer/>
</>
)
}