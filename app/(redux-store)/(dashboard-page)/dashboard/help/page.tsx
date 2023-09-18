import { SupportTeamCard,HelpForm } from "@/components";

export default function Help() {
  return (
    <div className="p-4 lg:ml-[300px]">
      <div className="px-4 lg:px-12 py-4  mx-auto">
        <h1 className="font-FuturaPTDemi text-4xl">Contact Us</h1>
        <hr />

        <section className="mt-4 flex flex-wrap justify-between   items-center ">
          <div className="mb-4 w-full max-w-sm xl:max-w-lg">
            <p className="text-xl xl:text-2xl pb-6  break-words font-FuturaPTBook font-[400]">We are here to help. Please ﬁll out the form below
              and our customer care team will reach out. </p>
            <HelpForm />
          </div>
          <div className="mb-4  flex justify-center xl:justify-end">
            <SupportTeamCard text="I`m here to help you out!" textStyle="text-sm md:2xl xl:text-4xl" />
          </div>
        </section>
      </div>
    </div>
  );
  }