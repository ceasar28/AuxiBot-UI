// ChatArea component
import React from "react";
import auxibot from "../assets/Group.png";

const ChatArea = ({ message, fName }) => {
  return (
    <div className="WelcomeMessage w-[90vw] sm:w-[60vw] flex flex-col items-start  min-h-[20x] h-auto mb-2">
      <div className="Auxibot flex mt-2 gap-1 text-start text-neutral-900 text-[18px] font-bold font-Sora ">
        <img src={auxibot} alt="Logo" className="w-6 h-6" />
        {fName}
      </div>
      <div className="w-[90vw] sm:w-[60vw] flex flex-col justify-between ">
        <div className="ResponseText w-[87vw] sm:w-[58vw] text-start text-gray-900 text-opacity-75 text-[15px] font-normal font-Sora">
          {message}
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
