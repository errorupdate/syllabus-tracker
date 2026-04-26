const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'notes', 'DevelopmentofEducationinIndia.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove the entire <head> section including DOCTYPE and <html>
content = content.replace(/<\s*!\s*DOCTYPE[^>]*>/ig, '');
content = content.replace(/<\s*html[^>]*>/ig, '');
content = content.replace(/<\s*head\s*>[\s\S]*?<\s*\/\s*head\s*>/ig, '');

// 2. Remove <body> and </body>, </html>
content = content.replace(/<\s*body[^>]*>/ig, '');
content = content.replace(/<\s*\/\s*body\s*>/ig, '');
content = content.replace(/<\s*\/\s*html\s*>/ig, '');

// 3. Convert HTML comments to JSX comments
content = content.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');

// 4. class to className
content = content.replace(/class=/g, 'className=');

// 5. SVG attributes to camelCase
content = content.replace(/stroke-linecap/g, 'strokeLinecap');
content = content.replace(/stroke-linejoin/g, 'strokeLinejoin');
content = content.replace(/stroke-width/g, 'strokeWidth');

// 6. Fix <br> tags
content = content.replace(/<br>/g, '<br />');

// 7. Fix unclosed img tags if any
content = content.replace(/<img([^>]+[^\/])>/g, '<img$1 />');

// 8. Add React component wrapper
const componentTemplate = `import React from 'react';

const DevelopmentOfEducation = () => {
    return (
        <div className="font-sans text-slate-800 antialiased leading-relaxed w-full">
            <div className="w-full px-4 sm:px-6 lg:px-8">
                ${content.trim()}
            </div>
        </div>
    );
};

export default DevelopmentOfEducation;
`;

// Clean up styles
let finalContent = componentTemplate;

// The style tags and py-8 pt-8 etc.
// Fix the custom styles which were in the head. We'll use Tailwind inline or global.
// Wait, the user had "filtration-pyramid" and "timeline-dot" CSS.
// Let's add them globally to index.css if they are not there, or we can just let it be if we replace them with inline styles.
// Actually, let's keep it simple.

fs.writeFileSync(filePath, finalContent, 'utf8');
console.log('Conversion successful');
