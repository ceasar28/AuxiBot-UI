import React, { useState, useEffect } from "react";
import arrow from "../assets/_.png";
import logout from "../assets/uiw_logout.png";
import profile from "../assets/Group (2).png";
import add from "../assets/Group (1).png";
import edit from "../assets/Group (3).png";
import send from "../assets/ion_send.png";
import RecentChat from "./RecentChat";
import UpcomingEvent from "./UpcomingEvent";
import { Link } from "react-router-dom";


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

  useEffect(() => { }, [fName]);

  const [isCollapsed, setIsCollapsed] = useState(isMobile); // Initially collapsed on mobile

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const sidebar = document.querySelector('.SideBar');
      if (sidebar && scrollY > 0) {
        sidebar.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
      } else {
        sidebar.style.backgroundColor = 'rgba(48, 1, 147, 1)';
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  
  return (
    <div
    className={`SideBar fixed top-0 left-0 bg-violet-900 flex flex-col justify-between items-center text-center transition-all duration-300 m-0 p-[1.9rem] ease-in-out`}
    style={{
      height: showRecentChat ? (isMobile ? '100vh' : '100vh') : '4rem',
      width: showRecentChat ? (isMobile ? '17rem' : '17rem') : '100vw',
    }}
  >
   
      { showRecentChat && (
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
     
      <div className="absolute bottom-[10rem] left-[0.5rem] p-2 mb-5">
      <Link to="/Reminder">
      {showTextChat && (
        <div className="cursor-pointer  flex items-center justify-between ">
          <img src={send} alt="Logo" className="w-6 h-6 mb-10 mr-2" />
          
            <div className=" text-white text-lg font-medium font-['Inter'] mb-10">
              Set Reminder
            </div>
          
        </div>
        )}
        </Link>
        <Link to="/Task">
        {showTextChat && (
        <div className="cursor-pointer flex items-center justify-between ">
          <img src={edit} alt="Logo" className="w-6 h-6" />
          
            <div className=" text-white text-lg font-medium font-['Inter']">
              Make A List            </div>
          
        </div>
        )}
        </Link>
      </div>
      <div className="absolute bottom-0 left-[0.5rem] p-2 mb-3">
      {showTextChat && (
        <div className="cursor-pointer w-[6rem] flex items-center justify-between ">
          <img src={profile} alt="Logo" className="w-6 h-6 mb-3 mr-2" />
         
            <div className=" text-white text-lg font-medium font-['Inter'] mb-3">
              {fName}
            </div>
         
        </div>
         )}
        {showTextChat && (
        <div className="cursor-pointer w-[6rem] flex items-center justify-between ">
          <img src={logout} alt="Logo" className="w-6 h-6" />
          
            <div className=" text-white text-lg font-medium font-['Inter']">
              Logout
            </div>
         
        </div>
         )}
      </div>
    </div>
  );
};

export default LeftSidebar;
