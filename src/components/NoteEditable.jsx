import { useRef, useEffect } from 'react';

/**
 * A ref-controlled contentEditable div.
 * React NEVER uses dangerouslySetInnerHTML after mount.
 * This prevents the cursor reset / backward-typing bug completely.
 */
export default function NoteEditable({ html, onChange, placeholder }) {
  const divRef = useRef(null);
  // Track what we last wrote into the DOM ourselves
  const lastWritten = useRef(null);

  // On mount: set initial content once
  useEffect(() => {
    if (divRef.current) {
      divRef.current.innerHTML = html;
      lastWritten.current = html;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // On external change (Firebase sync or clear button): update DOM
  useEffect(() => {
    if (divRef.current && html !== lastWritten.current) {
      lastWritten.current = html;
      divRef.current.innerHTML = html;
    }
  }, [html]);

  return (
    <div
      ref={divRef}
      className="note-editable"
      contentEditable
      suppressContentEditableWarning
      onInput={() => {
        const newHtml = divRef.current.innerHTML;
        lastWritten.current = newHtml;
        onChange(newHtml);
      }}
      onClick={e => e.stopPropagation()}
      data-placeholder={placeholder}
    />
  );
}
