// Button.js
import React from 'react';

const Button = ({ onClick, className, children }) => {
    return (
        <div>
            <button
                onClick={onClick}
                className={className}
            >
                {children}
            </button>
        </div>
    );
};

export default Button;
