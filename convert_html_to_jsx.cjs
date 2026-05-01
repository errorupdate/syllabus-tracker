const fs = require('fs');
const path = require('path');

function convertHtmlToJsx(content, componentName) {
  // 1. Extract body content only (between <body> and </body>)
  let bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  let jsx = bodyMatch ? bodyMatch[1] : content;
  
  // Remove script tags
  jsx = jsx.replace(/<script[\s\S]*?<\/script>/gi, '');
  
  // Remove the nav/navbar if present (the app has its own)
  // Don't remove - these files don't seem to have a nav
  
  // 2. Convert HTML attributes to JSX
  // class -> className
  jsx = jsx.replace(/\bclass=/g, 'className=');
  
  // for -> htmlFor (in labels)
  jsx = jsx.replace(/\bfor=/g, 'htmlFor=');
  
  // tabindex -> tabIndex
  jsx = jsx.replace(/\btabindex=/g, 'tabIndex=');
  
  // Self-closing tags: <br>, <hr>, <img>, <input>
  jsx = jsx.replace(/<br\s*>/gi, '<br />');
  jsx = jsx.replace(/<br\/>/gi, '<br />');
  jsx = jsx.replace(/<hr\s*>/gi, '<hr />');
  jsx = jsx.replace(/<hr\/>/gi, '<hr />');
  // Fix img tags that aren't self-closed
  jsx = jsx.replace(/<img([^>]*[^/])>/gi, '<img$1 />');
  // Fix input tags that aren't self-closed  
  jsx = jsx.replace(/<input([^>]*[^/])>/gi, '<input$1 />');
  
  // SVG attributes
  jsx = jsx.replace(/\bstroke-linecap=/g, 'strokeLinecap=');
  jsx = jsx.replace(/\bstroke-linejoin=/g, 'strokeLinejoin=');
  jsx = jsx.replace(/\bstroke-width=/g, 'strokeWidth=');
  jsx = jsx.replace(/\bstroke-dasharray=/g, 'strokeDasharray=');
  jsx = jsx.replace(/\bstroke-dashoffset=/g, 'strokeDashoffset=');
  jsx = jsx.replace(/\bstroke-miterlimit=/g, 'strokeMiterlimit=');
  jsx = jsx.replace(/\bstroke-opacity=/g, 'strokeOpacity=');
  jsx = jsx.replace(/\bfill-rule=/g, 'fillRule=');
  jsx = jsx.replace(/\bfill-opacity=/g, 'fillOpacity=');
  jsx = jsx.replace(/\bclip-path=/g, 'clipPath=');
  jsx = jsx.replace(/\bclip-rule=/g, 'clipRule=');
  jsx = jsx.replace(/\bfont-size=/g, 'fontSize=');
  jsx = jsx.replace(/\bfont-family=/g, 'fontFamily=');
  jsx = jsx.replace(/\btext-anchor=/g, 'textAnchor=');
  jsx = jsx.replace(/\btext-decoration=/g, 'textDecoration=');
  jsx = jsx.replace(/\bdominant-baseline=/g, 'dominantBaseline=');
  jsx = jsx.replace(/\bcolor-interpolation=/g, 'colorInterpolation=');
  jsx = jsx.replace(/\bcolor-interpolation-filters=/g, 'colorInterpolationFilters=');
  jsx = jsx.replace(/\bxlink:href=/g, 'xlinkHref=');
  jsx = jsx.replace(/\bxml:space=/g, 'xmlSpace=');
  jsx = jsx.replace(/\bviewBox=/g, 'viewBox=');
  
  // Convert style="..." to style={{...}} (inline styles)
  // This is complex - we'll handle the common patterns
  jsx = jsx.replace(/style="([^"]*)"/g, (match, styleStr) => {
    // Parse CSS string to object notation
    const props = styleStr.split(';').filter(s => s.trim()).map(prop => {
      const [key, ...valParts] = prop.split(':');
      const value = valParts.join(':').trim();
      if (!key || !value) return null;
      
      // Convert CSS property to camelCase
      const camelKey = key.trim().replace(/-([a-z])/g, (m, c) => c.toUpperCase());
      
      // Check if value is purely numeric (for certain properties)
      const numericProps = ['opacity', 'zIndex', 'fontWeight', 'lineHeight', 'flex', 'flexGrow', 'flexShrink', 'order'];
      if (numericProps.includes(camelKey) && !isNaN(value)) {
        return `${camelKey}: ${value}`;
      }
      
      return `${camelKey}: '${value.replace(/'/g, "\\'")}'`;
    }).filter(Boolean);
    
    return `style={{${props.join(', ')}}}`;
  });
  
  // HTML comments -> JSX comments
  jsx = jsx.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');
  
  // Handle &bull; and other common entities 
  // (React handles most HTML entities, but some need escaping)
  // Actually JSX handles &bull; etc natively, leave them
  
  // Handle onclick -> onClick, onchange -> onChange etc.
  jsx = jsx.replace(/\bonclick=/gi, 'onClick=');
  jsx = jsx.replace(/\bonchange=/gi, 'onChange=');
  jsx = jsx.replace(/\bonsubmit=/gi, 'onSubmit=');
  jsx = jsx.replace(/\bonfocus=/gi, 'onFocus=');
  jsx = jsx.replace(/\bonblur=/gi, 'onBlur=');
  
  // autocomplete -> autoComplete
  jsx = jsx.replace(/\bautocomplete=/g, 'autoComplete=');
  
  // maxlength -> maxLength
  jsx = jsx.replace(/\bmaxlength=/g, 'maxLength=');
  
  // readonly -> readOnly  
  jsx = jsx.replace(/\breadonly\b/g, 'readOnly');
  
  // colspan -> colSpan, rowspan -> rowSpan
  jsx = jsx.replace(/\bcolspan=/g, 'colSpan=');
  jsx = jsx.replace(/\browspan=/g, 'rowSpan=');
  
  // Remove any remaining <!DOCTYPE>, <html>, <head> remnants
  jsx = jsx.replace(/<!DOCTYPE[^>]*>/gi, '');
  
  // Wrap in component
  const result = `import React, { useEffect } from 'react';

const ${componentName} = () => {
    useEffect(() => {
        // Scroll-reveal animation observer
        const observerOptions = { root: null, rootMargin: '0px 0px -50px 0px', threshold: 0.1 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible', 'active');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.fade-in-section, .reveal').forEach(el => observer.observe(el));
        
        return () => observer.disconnect();
    }, []);

    return (
        <div className="text-slate-800 antialiased font-sans w-full bg-[#f8fafc] min-h-screen pt-8 pb-16">
            ${jsx.trim()}
        </div>
    );
};

export default ${componentName};
`;

  return result;
}

// Process DSA file
const dsaPath = path.join(__dirname, 'src/components/notes/Dsa.jsx');
const dsaContent = fs.readFileSync(dsaPath, 'utf8');
const dsaJsx = convertHtmlToJsx(dsaContent, 'Dsa');
fs.writeFileSync(dsaPath, dsaJsx, 'utf8');
console.log('✅ Converted Dsa.jsx');

// Process OperatingSystem file
const osPath = path.join(__dirname, 'src/components/notes/OperatingSystem.jsx');
const osContent = fs.readFileSync(osPath, 'utf8');
const osJsx = convertHtmlToJsx(osContent, 'OperatingSystem');
fs.writeFileSync(osPath, osJsx, 'utf8');
console.log('✅ Converted OperatingSystem.jsx');
