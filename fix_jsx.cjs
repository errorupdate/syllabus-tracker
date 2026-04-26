const fs = require("fs");
let content = fs.readFileSync("src/components/notes/LandRevenueSytem.jsx", "utf8");

// Fix HTML comments -> JSX comments
content = content.replace(/<!--([\s\S]*?)-->/g, "{/* $1 */}");

// Fix SVG properties
content = content.replace(/stroke-linecap/g, "strokeLinecap");
content = content.replace(/stroke-linejoin/g, "strokeLinejoin");
content = content.replace(/stroke-width/g, "strokeWidth");
content = content.replace(/fill-rule/g, "fillRule");
content = content.replace(/fill-opacity/g, "fillOpacity");

fs.writeFileSync("src/components/notes/LandRevenueSytem.jsx", content);
console.log("Fixed JSX syntax!");
