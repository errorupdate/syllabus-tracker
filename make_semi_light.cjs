const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'notes', 'DevelopmentofEducationinIndia.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Container
content = content.replace(/<div className="font-sans text-slate-200 antialiased leading-relaxed w-full">/, '<div className="font-sans text-slate-800 antialiased leading-relaxed w-full bg-[#f8fafc] min-h-screen pt-8 pb-16">');

// Text colors
content = content.replace(/text-white/g, 'text-slate-900');
content = content.replace(/text-slate-200/g, 'text-slate-800');
content = content.replace(/text-slate-300/g, 'text-slate-700');
content = content.replace(/text-slate-400/g, 'text-slate-600');

// Background colors
content = content.replace(/bg-slate-800\/40/g, 'bg-white');
content = content.replace(/bg-slate-800\/50/g, 'bg-slate-50');
content = content.replace(/bg-slate-800\/60/g, 'bg-slate-100');
content = content.replace(/bg-amber-900\/20/g, 'bg-amber-50');
content = content.replace(/bg-teal-900\/30/g, 'bg-teal-100');
content = content.replace(/bg-teal-900\/20/g, 'bg-teal-50');
content = content.replace(/bg-emerald-900\/30/g, 'bg-green-100');
content = content.replace(/bg-emerald-900\/40/g, 'bg-green-100');
content = content.replace(/bg-yellow-900\/40/g, 'bg-yellow-200');
content = content.replace(/bg-yellow-500\/20/g, 'bg-yellow-200');
content = content.replace(/bg-amber-500\/20/g, 'bg-amber-200');

// Text colors inside specific colored boxes
content = content.replace(/text-teal-300/g, 'text-teal-900');
content = content.replace(/text-teal-400/g, 'text-teal-800');
content = content.replace(/text-amber-300/g, 'text-amber-900');
content = content.replace(/text-amber-400/g, 'text-amber-900');
content = content.replace(/text-yellow-300/g, 'text-yellow-800');
content = content.replace(/text-orange-400/g, 'text-orange-700');

// Gradients
content = content.replace(/from-slate-800\/80 to-slate-900\/80/g, 'from-white to-orange-50');
content = content.replace(/from-teal-400 to-amber-300/g, 'from-teal-900 to-amber-600');

// Borders
content = content.replace(/border-slate-700\/50/g, 'border-teal-800');
content = content.replace(/border-slate-700/g, 'border-slate-200');
content = content.replace(/border-amber-500\/50/g, 'border-amber-500');
content = content.replace(/border-amber-500\/30/g, 'border-amber-500');
content = content.replace(/border-yellow-500\/30/g, 'border-yellow-500');
content = content.replace(/border-orange-500\/30/g, 'border-orange-200');
content = content.replace(/border-teal-700/g, 'border-teal-200');

// Timeline dot (was white originally)
content = content.replace(/border-slate-900/g, 'border-white');

// Specific badge text fix that might have been hit
content = content.replace(/bg-teal-900\/80 text-teal-200 border border-teal-200/g, 'bg-teal-900 text-slate-50');
content = content.replace(/bg-teal-900\/80/g, 'bg-teal-900');
content = content.replace(/text-teal-200/g, 'text-white'); // Wait, text-slate-200 was replaced with text-slate-800 above. text-teal-200 wasn't replaced, but let's just do it here.

// Fix text-white inside the bg-teal-900 badges (since text-white became text-slate-900 above)
// We need to find `bg-teal-900 text-slate-900` and make it `bg-teal-900 text-white`
content = content.replace(/bg-teal-900 text-slate-900/g, 'bg-teal-900 text-white');
content = content.replace(/bg-slate-900 text-white/g, 'bg-slate-900 text-white'); // Wait, if there was a dark section?
content = content.replace(/text-slate-900 px-4 py-1 rounded/g, 'text-white px-4 py-1 rounded'); // for the 1813 badge

// The BPSC Exam strategy section at the end was dark originally.
// "bg-slate-900 rounded-3xl p-8"
// My script changed bg-slate-900 to bg-white? No, I didn't replace bg-slate-900.
// But I changed text-white to text-slate-900. So the dark section now has dark text!
// Let's fix the dark section specifically.
// The dark section starts with: `<div className="bg-slate-900 rounded-3xl`
// I'll just change the dark section text back to light.
let examStrategyIdx = content.indexOf('BPSC TRE 4.0 Mastery Cheatsheet');
if (examStrategyIdx !== -1) {
    let startIdx = content.lastIndexOf('<section', examStrategyIdx);
    if (startIdx !== -1) {
        let endIdx = content.indexOf('</section>', examStrategyIdx) + '</section>'.length;
        let section = content.substring(startIdx, endIdx);
        // Reverse text colors for this section
        section = section.replace(/text-slate-900/g, 'text-white');
        section = section.replace(/text-slate-800/g, 'text-slate-200');
        section = section.replace(/text-slate-700/g, 'text-slate-300');
        section = section.replace(/bg-white\/10/g, 'bg-white/10');
        section = section.replace(/text-slate-900/g, 'text-white'); // any remaining
        section = section.replace(/bg-slate-100 border/g, 'bg-slate-700 border-slate-600');
        content = content.substring(0, startIdx) + section + content.substring(endIdx);
    }
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Made semi light theme');
