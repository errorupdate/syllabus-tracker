const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'notes', 'EmergingTrends.jsx');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(/blue-dark/g, 'slate-900');
content = content.replace(/blue-primary/g, 'blue-800');
content = content.replace(/blue-accent/g, 'emerald-600');
content = content.replace(/blue-light/g, 'slate-50');
content = content.replace(/blue-gold/g, 'amber-500');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed invalid tailwind colors');
