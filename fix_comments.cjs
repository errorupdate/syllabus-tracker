const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'notes', 'TribalMovements.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replace <!-- with {/* and --> with */}
content = content.replace(/<!--/g, '{/*');
content = content.replace(/-->/g, '*/}');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed HTML comments to JSX comments');
