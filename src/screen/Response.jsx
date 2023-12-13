// Response component
import React from 'react';
import auxibot from '../assets/material-symbols_robot.jpg';

const Response = ({ message }) => {
    return (
        <div className="WelcomeMessage w-[60vw] flex flex-col items-start sm:ml-8 min-h-[50x] h-auto">
            <div className="Auxibot flex mt-2 text-start text-violet-900 text-xl font-bold font-['Inter'] mb-2">
                <img src={auxibot} alt="Logo" className="w-6 h-6" />
                AuxiBot
            </div>
            <div className="ResponseText text-start text-gray-900 text-opacity-75 text-xl font-normal font-['Inter'] w-full m-2">
                {message}
            </div>
        </div>
    );
};

export default Response;
