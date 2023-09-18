import Image from "next/image";
import {SupportTeamCardProps} from '@/types';
const SupportTeamCard = ({text,textStyle}:SupportTeamCardProps) => {
  return (
    <div className="flex flex-col justify-center items-center lg:items-start">
    <div className="flex gap-2 items-end ">
  <Image
    src="/assets/images/mia.webp"
    alt="margos customer support"
    blurDataURL={"/assets/images/mia.webp"}
    width={200}
    height={50}
    placeholder="blur"
    priority
    
  />
  <div className="mb-2">
  <h2 className=" text-blue text-4xl pb-2 font-chicle">I{"'"}m Mia</h2>
  <p className=" font-chicle text-2xl text-yellow">From the Customer</p>
<p className=" font-chicle  text-2xl text-yellow pb-2">Success team</p>
</div>
  </div>
  <h2 className={`font-chicle  inline-block  mb-2  mt-[-1px] bg-[#579d44] text-white px-20 lg:px-24 py-2 rounded-[15px] ${textStyle} `}>
 {text}
    </h2>

  </div>
  )
}

export default SupportTeamCard