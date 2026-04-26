const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'notes', 'DevelopmentofEducationinIndia.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Fix light backgrounds
content = content.replace(/bg-teal-100/g, 'bg-teal-900/30');
content = content.replace(/bg-teal-50/g, 'bg-teal-900/20');
content = content.replace(/bg-emerald-100/g, 'bg-emerald-900/30');
content = content.replace(/bg-yellow-200/g, 'bg-yellow-900/40 text-yellow-300'); // was used for highlighting text

// The original Charter Act badge: <span class="bg-brand-900 text-white px-4 py-1 rounded font-bold text-lg">1813</span>
// That became bg-teal-900/80 text-teal-200. That's fine.

// What about text-teal-700? I replaced text-teal-700 font-bold with text-teal-300 font-bold.
// Did I replace all text-teal-700?
content = content.replace(/text-teal-700/g, 'text-teal-300');
content = content.replace(/text-teal-800/g, 'text-teal-300');
content = content.replace(/text-teal-900/g, 'text-teal-300');

// Fix border colors
content = content.replace(/border-brand-200/g, 'border-teal-700');
content = content.replace(/border-teal-200/g, 'border-teal-700');
content = content.replace(/border-teal-300/g, 'border-teal-700');
content = content.replace(/border-teal-800/g, 'border-teal-700');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Backgrounds replaced successfully');
