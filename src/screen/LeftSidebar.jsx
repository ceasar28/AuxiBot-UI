import React, { useState, useEffect } from "react";
import arrow from "../assets/_.png";
import logout from "../assets/uiw_logout.png";
import profile from "../assets/Group (2).png";
import add from "../assets/Group (1).png";
import RecentChat from "./RecentChat";
import UpcomingEvent from "./UpcomingEvent";

const LeftSidebar = ({
  fName,
  windowWidth,
  showRecentChat,
  showUpcomingEvent,
  showTextChat,
  chatId,
}) => {
  console.log("LeftSidebar chatId:", chatId);
  const isMobile = windowWidth <= 768;

  useEffect(() => {}, [fName]);

  return (
    <div
      className={`SideBar w-max-[${
        isMobile ? "4" : "17"
      }rem]  min-h-[100vh] bg-violet-900 flex flex-col justify-between items-center text-center transition-all duration-300 m-0 p-[1.9rem] ease-in-out absolute`}
    >
      {showRecentChat && (
        <div className="flex flex-col items-start justify-between mt-[3rem]">
          <div className="w-[14rem] flex items-center justify-between">
            <div className="text-neutral-400 text-opacity-90 text-base font-medium font-['Inter']">
              Recent
            </div>
            <img src={add} alt="Logo" className="w-3.5 h-3.5 cursor-pointer" />
          </div>
          <RecentChat chatId={chatId} />
        </div>
      )}
      {showUpcomingEvent && (
        <div className="mb-[6rem]">
          <div className="w-[14rem] flex items-center justify-between">
            <div className="text-neutral-400 text-opacity-90 text-lg font-medium font-['Inter']">
              Upcoming Event
            </div>
            <img
              src={arrow}
              alt="Logo"
              className="w-3.5 h-3.5 cursor-pointer"
            />
          </div>
          <UpcomingEvent />
        </div>
      )}
      <div className="absolute bottom-0 left-[0.5rem] p-2 mb-3">
        <div className="cursor-pointer w-[6rem] flex items-center justify-between ">
          <img src={profile} alt="Logo" className="w-6 h-6 mb-3 mr-2" />
          {showTextChat && (
            <div className=" text-white text-lg font-medium font-['Inter'] mb-3">
              {fName}
            </div>
          )}
        </div>
        <div className="cursor-pointer w-[6rem] flex items-center justify-between ">
          <img src={logout} alt="Logo" className="w-6 h-6" />
          {showTextChat && (
            <div className=" text-white text-lg font-medium font-['Inter']">
              Logout
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
