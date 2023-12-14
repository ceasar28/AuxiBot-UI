// Response component
import React from 'react';
import auxibot from '../assets/material-symbols_robot.jpg';

const Response = ({ message }) => {
    return (
        <div className="WelcomeMessage w-[75vw] sm:w-[60vw] flex flex-col items-start min-h-[50x] h-auto">
            <div className="Auxibot flex mt-0 text-start text-violet-900 text-xl font-bold font-['Inter'] mb-0">
                <img src={auxibot} alt="Logo" className="w-6 h-6" />
                AuxiBot
            </div>
            <div className="w-[75vw] sm:w-[60vw] flex flex-col justify-between overflow-y-auto overflow-x-hidden "
                style={{ maxHeight: "20rem"}}>
                <div className="ResponseText w-[75vw] sm:w-[60vw] text-start text-gray-900 text-opacity-75 text-[15px] font-normal font-['Inter'] ">
                    {message}
                </div>
            </div>
        </div>
    );
};

export default Response;
