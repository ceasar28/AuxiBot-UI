import React from 'react';
import Response from './Response'; // Update the path based on your folder structure

const Display = () => {
    const sampleMessage = `
# Hello!

This is a sample message with code:

\`\`\`javascript
const greet = (name) => {
    return \`Hello, \${name}!\`;
};

console.log(greet('John'));
\`\`\`

Feel free to customize this message!
    `;

    return (
        <div>
            <h1>Your Component</h1>
            <Response message={sampleMessage} />
        </div>
    );
};

export default Display;
