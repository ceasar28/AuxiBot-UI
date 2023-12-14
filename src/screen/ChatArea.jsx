// ChatArea component
import React from "react";
import auxibot from "../assets/Group.png";

const ChatArea = ({ message, fName }) => {
  return (
    <div className="WelcomeMessage flex flex-col items-start sm:ml-8 w-[60vw] min-h-[50x] h-auto">
      <div className="Auxibot flex mt-2 text-start text-neutral-900 text-xl font-bold font-['Inter'] mb-2">
        <img src={auxibot} alt="Logo" className="w-6 h-6" />
        {fName}
      </div>
      <div className="ResponseText text-start text-gray-900 text-opacity-75 text-xl font-normal font-['Inter'] w-full m-2">
        {message}
      </div>
    </div>
  );
};

export default ChatArea;
