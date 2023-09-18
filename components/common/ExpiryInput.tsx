import { dashboardStyle } from "@/styles";

export const ExpiryInput = ({ field, onChange }: any) => {
    const handleChange = (event:any) => {
      const { value } = event.target;
      if (value.length === 2 && !value.includes('/')) {
        onChange(`${value}/`);
      } else if (value.length === 2 && value.includes('/')) {
        onChange(value.slice(0, 2));
      } else {
        onChange(value);
      }
    };
  
    return (
        <>
      <input
        type="text"
        {...field}
        onChange={handleChange}
        className={`${dashboardStyle} bg-[#f9f9f9] border-2 border-l-0  shadow-none rounded-l-none border-[#b6b6b6]    outline-none font-FuturaPTBook focus:outline-none focus:border-l-0   w-full md:w-32 expireinputsize `}
        placeholder="MM/YY"
        minLength={5}
        maxLength={5}
      />
      </>
    );
  };