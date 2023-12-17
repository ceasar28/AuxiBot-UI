// Response component
import React from 'react';
import auxibot from '../assets/material-symbols_robot.jpg';

const Response = ({ message }) => {
    return (
        <div className="WelcomeMessage w-[90vw] sm:w-[60vw] flex flex-col items-start min-h-[50x] h-auto">
            <div className="Auxibot flex mt-0 gap-1 text-start text-violet-900 text-[18px] font-bold font-Sora mb-0">
                <img src={auxibot} alt="Logo" className="w-6 h-6" />
                AuxiBot
            </div>
            <div className="w-[90vw] sm:w-[60vw] flex flex-col justify-between bg-black-600 p-3 rounded-lg"
                >
                <div className="ResponseText w-[87vw] sm:w-[58vw] text-start text-white text-opacity-75 text-[15px] font-normal font-Sora ">
                    {message}
                </div>
            </div>
        </div>
    );
};

export default Response;
