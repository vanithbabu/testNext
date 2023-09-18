import { CustomButton, HelpForm, SupportTeamCard } from "@/components";

export default function Userhelp() {
    return (
        <>
            <div className="bg-primary max-w-7xl mx-auto gap-4 flex  justify-between items-center px-4 ">
                <div
                    className="w-full"
                >
                    <section>
                        <div className=" grid grid-cols-1 lg:grid-cols-[45%,45%] max-w-6xl mx-auto px-4 gap-x-24">
                            <div className="w-full max-w-sm xl:max-w-lg">
                                <div className="py-2 my-3 md:my-0">
                                <h2 className="font-chicle text-orange text-center md:text-left md:pl-28  text-3xl md:text-4xl">Need Assistance? </h2>
                                </div>
                                <p className="text-center md:text-left my-3 md:my-0 text-xl xl:text-2xl pb-6  break-words font-FuturaPTBook font-[400]">We are here to help. Please ﬁll out the form below
                                    and our customer care team will reach out. </p>
                                <HelpForm />
                            </div>
                            <div className="flex flex-col justify-center items-center md:items-end">
                                <SupportTeamCard text="I`m here to help you out!" textStyle="text-sm md:2xl xl:text-4xl" />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}
  