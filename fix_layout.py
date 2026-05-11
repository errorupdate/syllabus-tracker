#!/usr/bin/env python3
"""
Carefully fix OperatingSystem.jsx layout by converting grid-cols-12 layouts
to full-width stacks while maintaining proper JSX tag balance.
"""
import re

filepath = "src/components/notes/OperatingSystem.jsx"

with open(filepath, 'r') as f:
    lines = f.readlines()

# Strategy: For each grid-cols-12 section, we need to:
# 1. Change the grid container to space-y-8
# 2. Remove col-span classes from children
# 3. Keep all content intact

new_lines = []
for line in lines:
    modified = line
    
    # Convert 12-col grids to vertical stacks
    modified = modified.replace(
        'grid grid-cols-1 lg:grid-cols-12 gap-8',
        'space-y-8'
    )
    modified = modified.replace(
        'grid grid-cols-1 lg:grid-cols-12 gap-10',
        'space-y-8'
    )
    
    # Remove col-span classes (they're meaningless without grid parent)
    # But keep the div and rest of the className
    modified = re.sub(r'lg:col-span-\d+\s*', '', modified)
    
    new_lines.append(modified)

content = ''.join(new_lines)

with open(filepath, 'w') as f:
    f.write(content)

print("Grid layout conversion applied!")
print(f"File size: {len(content)} bytes")

# Verify tag balance
opens = content.count('<div')
closes = content.count('</div>')
print(f"<div> opens: {opens}, </div> closes: {closes}")
sec_opens = content.count('<section')
sec_closes = content.count('</section>')
print(f"<section> opens: {sec_opens}, </section> closes: {sec_closes}")
main_opens = content.count('<main')
main_closes = content.count('</main>')
print(f"<main> opens: {main_opens}, </main> closes: {main_closes}")
