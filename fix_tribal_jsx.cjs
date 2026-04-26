const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'notes', 'TribalMovements.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Extract the body content
let bodyStart = content.indexOf('<body');
if (bodyStart !== -1) {
    bodyStart = content.indexOf('>', bodyStart) + 1;
}
let bodyEnd = content.lastIndexOf('</body>');
if (bodyStart !== -1 && bodyEnd !== -1) {
    content = content.substring(bodyStart, bodyEnd).trim();
}

// Convert class to className
content = content.replace(/class="/g, 'className="');

// Fix unclosed tags
content = content.replace(/<br>/g, '<br />');
content = content.replace(/<hr([^>]*)>/g, (match, p1) => {
    if (p1.endsWith('/')) return match;
    return `<hr${p1} />`;
});
content = content.replace(/<img([^>]*)>/g, (match, p1) => {
    if (p1.endsWith('/')) return match;
    return `<img${p1} />`;
});
content = content.replace(/<input([^>]*)>/g, (match, p1) => {
    if (p1.endsWith('/')) return match;
    return `<input${p1} />`;
});

// SVG fixes
content = content.replace(/stroke-linecap/g, 'strokeLinecap');
content = content.replace(/stroke-linejoin/g, 'strokeLinejoin');
content = content.replace(/stroke-width/g, 'strokeWidth');

// Fix glass-card dark theme bug (replace with light theme utilities)
content = content.replace(/className="glass-card /g, 'className="bg-white shadow-xl shadow-slate-200/50 border border-slate-200 ');

// Make sure text colors are good for light mode
// It seems the user's HTML already uses text-slate-800, text-slate-900 etc. 
// Let's replace bg-bpsc-500 etc. with standard tailwind colors like bg-teal-500
content = content.replace(/bpsc-/g, 'teal-');
content = content.replace(/accent-dark/g, 'amber-600');
content = content.replace(/accent-light/g, 'amber-100');

// Fix custom CSS class names that don't exist anymore
content = content.replace(/timeline-dot/g, 'relative before:content-[\'\'] before:absolute before:-left-[33px] before:top-[6px] before:h-4 before:w-4 before:rounded-full before:bg-teal-700 before:border-4 before:border-teal-100');

// Add the wrapper
let reactComponent = `import React from 'react';

const TribalMovements = () => {
    return (
        <div className="font-sans text-slate-800 antialiased leading-relaxed w-full bg-[#f8fafc] min-h-screen pt-8 pb-16">
            ${content}
        </div>
    );
};

export default TribalMovements;
`;

fs.writeFileSync(filePath, reactComponent, 'utf8');
console.log('Fixed TribalMovements JSX');
