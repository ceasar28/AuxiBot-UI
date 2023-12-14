import React from "react";
import { Link } from "react-router-dom";
const WelcomeMessage = ({ fName }) => {
  return (
    <div className="WelcomeMessage flex flex-col items-start ml-[5vw] bottom-0 transform ">
      <div className="Auxibot text-start text-violet-900 text-xl font-bold font-['Inter'] mb-2">
        AuxiBot
      </div>
      <div className="WelcomeBelieve text-start text-gray-900 text-opacity-75 text-xl font-normal font-['Inter']">
        Welcome {fName}
      </div>
      <div className="Group20 flex flex-wrap gap-5">
      <Link to="/Reminder">
        <div className="Group17 cursor-pointer">
        
          <div className="SetReminder w-[200px] [50px] text-center text-black text-xl font-normal font-['Inter'] bg-violet-900 bg-opacity-30 rounded-[20px] flex items-center justify-center m-auto cursor-pointe p-2 cursor-pointer">
            Set Reminder
          </div>
          
        </div>
        </Link>
        <Link to="/Task">
        <div className="Group18">
          <div className="MakeAList w-[200px] [50px] text-center text-black text-xl font-normal font-['Inter'] bg-violet-900 bg-opacity-30 rounded-[20px] flex items-center justify-center m-auto cursor-pointer p-2">
            Make a list
          </div>
        </div>
        </Link>
      </div>
    </div>
  );
};

export default WelcomeMessage;
