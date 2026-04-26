const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'notes', 'DevelopmentofEducationinIndia.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Fix Phase 4 bright white/orange background
content = content.replace(/bg-gradient-to-br from-white to-orange-50/g, 'bg-gradient-to-br from-slate-800/80 to-slate-900/80');

// Fix text-orange-700 to text-orange-400
content = content.replace(/text-orange-700/g, 'text-orange-400');

// Fix border-orange-200 to border-orange-500/30
content = content.replace(/border-orange-200/g, 'border-orange-500/30');

// What about text-red-600? Let's make it text-red-400 for better contrast on dark
content = content.replace(/text-red-600/g, 'text-red-400');

// What about text-brand-900? Did I miss any?
content = content.replace(/text-brand-900/g, 'text-teal-300');

// Let's check table text. text-brand-700 -> text-teal-400
content = content.replace(/text-brand-700/g, 'text-teal-400');

// bg-brand-900 -> bg-teal-900/80
content = content.replace(/bg-brand-900/g, 'bg-teal-900/80');
content = content.replace(/border-brand-800/g, 'border-teal-800');

// bg-brand-100 -> bg-teal-900/30 (if any remaining)
content = content.replace(/bg-brand-100/g, 'bg-teal-900/30');

// text-brand-800 -> text-teal-400
content = content.replace(/text-brand-800/g, 'text-teal-400');

// border-brand-300 -> border-teal-700
content = content.replace(/border-brand-300/g, 'border-teal-700');

// bg-amber-500 text-slate-900 text-xs font-bold px-2 py-1 rounded
content = content.replace(/bg-amber-500 text-slate-900/g, 'bg-amber-500/20 text-amber-300 border border-amber-500/30');

// bg-yellow-500 text-slate-900 text-xs font-bold px-2 py-1 rounded
content = content.replace(/bg-yellow-500 text-slate-900/g, 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30');

// bg-yellow-200 -> bg-yellow-500/20 text-yellow-300
content = content.replace(/bg-yellow-200/g, 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30');

// text-slate-900 -> text-white
content = content.replace(/text-slate-900/g, 'text-white');

// text-slate-800 -> text-slate-200
content = content.replace(/text-slate-800/g, 'text-slate-200');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Final colors replaced successfully');
