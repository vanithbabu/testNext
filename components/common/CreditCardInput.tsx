import { dashboardStyle } from "@/styles";
export const CreditCardInput = ({ field, onChange }: any) => {
  const handleChange = (event:any) => {
    const inputCreditCardNumber = event.target.value;
    const cleanedInput = inputCreditCardNumber.replace(/-/g, '');
    if(inputCreditCardNumber.length >= 4){
      const formattedCreditCardNumber = cleanedInput
        .match(/.{1,4}/g)
        .join('-');

      onChange(formattedCreditCardNumber);
    }else{
      onChange(event.target.value)
    }
  };
    return (
        <>
        <input
            type="text"
            {...field}
            onChange={handleChange}
            placeholder="xxxx-xxxx-xxxx-xxxx"
            minLength={19}
            maxLength={19}
            className={`${dashboardStyle} border-2 border-r-0 bg-[#f9f9f9] border-[#b6b6b6]    rounded-r-none shadow-none   outline-none  font-FuturaPTBook focus:outline-none focus:border-r-0  w-full md:max-w-7xl text-md `}
            />
      </>
    );
  };