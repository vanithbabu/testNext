"use client";
import Image from "next/image";
import { useState} from "react"
import FlowerImg from '@/public/assets/icons/flower.svg';
export default function FaqAccordion( { question, answer} : any) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="flex gap-4 items-start pt-4 cursor-pointer border-t-2 border-[orange]" onClick={() => setIsOpen(!isOpen)} key={question}>
        <Image
          src={FlowerImg}  
          alt="flower"
          width={45}
          height={45}
          priority      
        />
        <div className="flex flex-col">
          <h2 className="font-chicle text-3xl md:text-4xl  font text-blue">
            {question}
          </h2>
          {isOpen ?
            <div
                className=" pt-4 text-xl  text-yellow font-FuturaPTMedium"
                dangerouslySetInnerHTML={{ __html: answer }}
            />
            :
            <div></div>
            }
        </div>
        <div className="ml-auto">
        <span className="text-3xl">
            {isOpen ?
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.98998 16.62C2.87357 16.5039 2.78121 16.366 2.71819 16.2141C2.65518 16.0622 2.62274 15.8994 2.62274 15.735C2.62274 15.5706 2.65518 15.4078 2.71819 15.2559C2.78121 15.1041 2.87357 14.9661 2.98998 14.85L11.3 6.54C11.3925 6.4473 11.5024 6.37375 11.6234 6.32357C11.7443 6.27339 11.874 6.24756 12.005 6.24756C12.1359 6.24756 12.2656 6.27339 12.3866 6.32357C12.5076 6.37375 12.6175 6.4473 12.71 6.54L21.02 14.85C21.51 15.34 21.51 16.13 21.02 16.62C20.53 17.11 19.74 17.11 19.25 16.62L12 9.38L4.74998 16.63C4.26998 17.11 3.46998 17.11 2.98998 16.62Z" fill="#F07622" />
                </svg>
                :
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.98998 7.38C2.87357 7.49611 2.78121 7.63405 2.71819 7.78591C2.65518 7.93778 2.62274 8.10058 2.62274 8.265C2.62274 8.42942 2.65518 8.59222 2.71819 8.74408C2.78121 8.89594 2.87357 9.03388 2.98998 9.15L11.3 17.46C11.3925 17.5527 11.5024 17.6262 11.6234 17.6764C11.7443 17.7266 11.874 17.7524 12.005 17.7524C12.1359 17.7524 12.2656 17.7266 12.3866 17.6764C12.5076 17.6262 12.6175 17.5527 12.71 17.46L21.02 9.15C21.51 8.66 21.51 7.87 21.02 7.38C20.53 6.89 19.74 6.89 19.25 7.38L12 14.62L4.74998 7.37C4.26998 6.89 3.46998 6.89 2.98998 7.38Z" fill="#F07622" />
                </svg>
            }
        </span>
        </div>
      </div>
    );
}
