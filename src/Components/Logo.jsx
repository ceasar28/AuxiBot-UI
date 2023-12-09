import React from 'react';
import logoImage from '../assets/material-symbols_robot.png'; 

const Logo = () => {
    return (
        <div className="flex items-center mt-5 ml-5 absolute">
            <img src={logoImage} alt="Logo" className="h-8 mr-2" />
            <div className=" text-center text-white text-2xl font-semibold font-['Inter']"> AuxiBot<br/></div> 
        </div>
    );
};

export default Logo;
