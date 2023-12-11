import React from 'react';
import logoImage from '../assets/material-symbols_robot.png';
import { Link } from 'react-router-dom';

const Logo = () => {
    return (
        <div>
            <div className="flex items-center mt-5 ml-5 absolute cursor-pointer">
                <img src={logoImage} alt="Logo" className="h-8 mr-2" />
                <div className=" text-center text-white text-2xl font-semibold font-['Inter']"> AuxiBot<br /></div>
            </div>

        </div>
    );
};

export default Logo;
