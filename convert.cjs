const fs = require("fs");
let content = fs.readFileSync("src/components/notes/LandRevenueSytem.jsx", "utf8");

const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
let bodyContent = bodyMatch ? bodyMatch[1] : content;

bodyContent = bodyContent.replace(/class=/g, "className=");
bodyContent = bodyContent.replace(/<(br|hr|img|input)([^>]*?)(?<!\/)>/gi, "<$1$2/>");
// fix styles inside body if any (like inline styles string to object, but there are none).

const reactComponent = `import React from "react";
import { BookOpen, Map, Clock, Swords, CheckCircle2, Target, Lightbulb, Anchor, Compass, Award, Ship } from "lucide-react";

export default function LandRevenueSystem() {
  return (
    <div className="antialiased min-h-screen bg-[#f4f7f6] text-slate-800 font-sans pb-10">
      <style>{\`
        .hero-pattern {
          background-color: #0f172a;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231e293b' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
        }
        .hover-lift {transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease; }
        .hover-lift:hover {transform: translateY(-5px); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
        .fraction {display: inline-flex; flex-direction: column; text-align: center; vertical-align: middle; line-height: 1.2; font-weight: bold; }
        .fraction span:first-child {border-bottom: 2px solid currentColor; padding-bottom: 1px; }
        .fraction span:last-child {padding-top: 1px; }
      \`}</style>
      ${bodyContent}
    </div>
  );
}
`;

fs.writeFileSync("src/components/notes/LandRevenueSytem.jsx", reactComponent);
console.log("Converted successfully!");
