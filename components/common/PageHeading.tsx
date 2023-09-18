import { CustomPageHeadingProps } from "@/types";

const PageHeading = ({  textStyles, title }: CustomPageHeadingProps) => (
  <h1 className={`text-center font-semibold font-chicle text-6xl md:text-8xl leading-[5rem] md:leading-[8rem]  font text-blue ${textStyles}`}>{title}</h1>
);

export default PageHeading;
