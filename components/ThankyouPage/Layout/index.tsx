import { ModalPopupProps } from "@/types";

export const ThankyouPage = ({template}: ModalPopupProps) => {
    return (
        <div className="bg-primary max-w-7xl mx-auto gap-4 flex  justify-between items-center py-3 px-4 ">
        <div
            className="bg-white w-full md:p-4 rounded-lg shadow-md"
        >
           {template}
        </div>
    
        </div>
    );
}
  