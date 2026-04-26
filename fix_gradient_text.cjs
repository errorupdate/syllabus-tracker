const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'notes', 'DevelopmentofEducationinIndia.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// The first two boxes of the filtration pyramid are dark gradient, text should be white.
content = content.replace(/className="text-slate-900 text-center p-2 rounded text-sm font-semibold transition-all duration-300 hover:scale-105 w-\[30%\] bg-gradient-to-br from-teal-700 to-teal-900"/, 'className="text-white text-center p-2 rounded text-sm font-semibold transition-all duration-300 hover:scale-105 w-[30%] bg-gradient-to-br from-teal-700 to-teal-900"');

content = content.replace(/className="text-slate-900 text-center p-2 rounded text-sm font-semibold transition-all duration-300 hover:scale-105 w-\[60%\] bg-gradient-to-br from-teal-500 to-teal-700"/, 'className="text-white text-center p-2 rounded text-sm font-semibold transition-all duration-300 hover:scale-105 w-[60%] bg-gradient-to-br from-teal-500 to-teal-700"');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed pyramid text contrast');
