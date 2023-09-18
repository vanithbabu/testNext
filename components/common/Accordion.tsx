import React from "react";
import { ModalPopupProps } from "@/types";

const Accordion = ({ template }: ModalPopupProps) => {
  return (
    <div className="bg-primary max-w-7xl mx-auto gap-4 flex  justify-between items-center py-3 px-4 ">
    <div
        className="bg-white w-full p-4 rounded-lg shadow-md cursor-pointer"
    >
       {template}
    </div>

    </div>
  );
};

export default Accordion;