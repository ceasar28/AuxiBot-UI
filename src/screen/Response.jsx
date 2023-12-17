import React, { useEffect, useRef } from 'react';
import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/github.css'; // Choose your preferred style
import Markdown from 'react-markdown';
import auxibot from '../assets/material-symbols_robot.jpg';

const Response = ({ message }) => {
    const contentRef = useRef(null);

    useEffect(() => {
        // Highlight code blocks after component mounts
        if (contentRef.current) {
            hljs.highlightAll();
        }
    }, [message]);

    return (
        <div className="WelcomeMessage w-[90vw] sm:w-[60vw] flex flex-col items-start min-h-[50x] h-auto">
            <div className="Auxibot flex mt-0 gap-1 text-start text-violet-900 text-[18px] font-bold font-Sora mb-0">
                <img src={auxibot} alt="Logo" className="w-6 h-6" />
                AuxiBot
            </div>
            <div className="w-[90vw] sm:w-[60vw] flex flex-col justify-between bg-black-600 p-3 rounded-lg overflow-x-auto">
                <div className="ResponseText w-[87vw] sm:w-[58vw] text-start text-white text-opacity-75 text-[15px] font-normal font-Sora">
                    {/* Apply custom CSS for code syntax highlighting */}
                    <style>{`
                        /* Customize syntax highlighting colors */
                        pre {
                            background-color: #2d2d2d; /* Background color for code blocks */
                            color: #ffffff; /* Text color for code blocks */
                            padding: 10px;
                            border-radius: 5px;
                            overflow-x: auto;
                        }
                        code {
                            color: #ffcc00; /* Color for code text */
                        }
                        h1 {
                            color: #ff6b6b; /* Color for headers */
                        }
                        /* Add more styles as needed */

                        /* Highlight.js specific */
                        .hljs {
                            display: block;
                            overflow-x: auto;
                            padding: 0.5em;
                            color: #ffffff; /* Text color for highlighted code */
                        }
                    `}</style>
                    <Markdown ref={contentRef} children={message} />
                </div>
            </div>
        </div>
    );
}; 

export default Response;
