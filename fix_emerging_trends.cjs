const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'notes', 'EmergingTrends.jsx');
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

// HTML comments to JSX comments
content = content.replace(/<!--/g, '{/*');
content = content.replace(/-->/g, '*/}');

// Fix styling issue with "glass-card" and layout constraints
content = content.replace(/className="glass-card /g, 'className="bg-white shadow-xl shadow-slate-200/50 border border-slate-200 ');
content = content.replace(/max-w-6xl mx-auto/g, 'w-full px-4 sm:px-6 lg:px-8');

// Replace custom colors for light theme compatibility
content = content.replace(/bpsc-/g, 'blue-');

// Add the wrapper
let reactComponent = `import React from 'react';

const EmergingTrends = () => {
    return (
        <div className="text-slate-800 antialiased font-sans w-full bg-[#f8fafc] min-h-screen pt-8 pb-16">
            ${content}
        </div>
    );
};

export default EmergingTrends;
`;

fs.writeFileSync(filePath, reactComponent, 'utf8');
console.log('Fixed EmergingTrends JSX');
