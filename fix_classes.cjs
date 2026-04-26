const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'notes', 'DevelopmentofEducationinIndia.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Fix Layout limits
content = content.replace(/<div className="w-\[95%\] max-w-\[1800px\] mx-auto px-4 sm:px-6 lg:px-8">/, '<div className="w-full">');

// timeline-dot (3 matches)
content = content.replace(/className="timeline-dot"/g, 'className="w-4 h-4 bg-teal-700 rounded-full absolute -left-[9px] top-6 border-[3px] border-white shadow-[0_0_0_3px_#ccfbf1]"');

// filtration-pyramid
content = content.replace(/className="filtration-pyramid"/g, 'className="flex flex-col items-center gap-1 my-5"');

// pyramid-level level-1
content = content.replace(/className="pyramid-level level-1"/g, 'className="text-white text-center p-2 rounded text-sm font-semibold transition-all duration-300 hover:scale-105 w-[30%] bg-gradient-to-br from-teal-700 to-teal-900"');

// pyramid-level level-2
content = content.replace(/className="pyramid-level level-2"/g, 'className="text-white text-center p-2 rounded text-sm font-semibold transition-all duration-300 hover:scale-105 w-[60%] bg-gradient-to-br from-teal-500 to-teal-700"');

// pyramid-level level-3
content = content.replace(/className="pyramid-level level-3"/g, 'className="text-center p-2 rounded text-sm font-semibold transition-all duration-300 hover:scale-105 w-[90%] bg-gradient-to-br from-teal-300 to-teal-500 text-teal-900"');

// gradient-text
content = content.replace(/className="gradient-text"/g, 'className="text-transparent bg-clip-text bg-gradient-to-r from-teal-900 to-yellow-600"');

// fix glass-card definition if we need. Note: glass-card is already in index.css so no need to change it!

fs.writeFileSync(filePath, content, 'utf8');
console.log('Classes replaced successfully');
