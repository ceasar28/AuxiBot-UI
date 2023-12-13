import React from 'react';
import del from '../assets/material-symbols_delete-outline.png';

const RecentChat = () => {
    const storedText = JSON.parse(localStorage.getItem('userText')) || [];

    const deleteStoredText = (index) => {
        const updatedText = storedText.filter((_, i) => i !== index);
        localStorage.setItem('userText', JSON.stringify(updatedText));
        window.location.reload();
    };

    return (
        <div className="w-[14rem] flex flex-col items-start justify-between overflow-y-auto" style={{ maxHeight: '45vh' }}>
            {storedText.map((chat, index) => (
                <div key={index} className="ChatName w-[14rem] flex items-center justify-between text-start text-white text-lg font-medium font-['Inter']">
                    {chat.substring(0, 20)} {/* Display only the first 10 characters */}
                    <img src={del} alt="Delete" className="w-3.5 h-3.5 cursor-pointer" onClick={() => deleteStoredText(index)} />
                </div>
            ))}
        </div>
    );
};

export default RecentChat;
