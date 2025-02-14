import os
import re

# Path to the README.md
readme_path = 'README.md'

# Directory where the HTML files will be stored
output_dir = 'c:/Users/liselot.HYPERLINC/source/repos/Catalog/pages/'

# Ensure the output directory exists
os.makedirs(output_dir, exist_ok=True)

# Read the content of README.md
with open(readme_path, 'r', encoding='utf-8') as file:
    content = file.read()
    content = content.replace('[↑](#-table-of-contents)', '')

# Split the content based on the sections
sections = content.split('## ')[1:]

# Function to generate an HTML file
def generate_html_file(title, body, filename):
    html_content = f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
  <style>
  ul {{
  list-style-type: none;
  padding: 0;
  }}
  </style>
</head>
<body>
  <h2>{title}</h2>
  <ul>
  {body}
  </ul>
</body>
</html>'''
    
    with open(os.path.join(output_dir, filename), 'w', encoding='utf-8') as file:
        file.write(html_content)

# Process each section and generate the corresponding HTML files
for section in sections:
    lines = section.split('\n')
    title = lines[0].strip()
    body_lines = []

    for line in lines[1:]:
        line = line.strip()
        if line.startswith('* '):
            link_text = line[2:].strip()

            # Extract Markdown links: [Text](URL)
            match = re.match(r'\[(.*?)\]\((.*?)\)(?:\s*-\s*(.*))?', link_text)
            if match:
                display_text = match.group(1)  # De zichtbare tekst
                url = match.group(2)  # De URL
                description = match.group(3) if match.group(3) else ""  # Optionele beschrijving

                if description:
                    link = f'<li><a href="{url}">{display_text}</a> - {description}</li>'
                else:
                    link = f'<li><a href="{url}">{display_text}</a></li>'
            else:
                # Voor gevallen zonder links
                link = f'<li>{link_text}</li>'

            body_lines.append(link)

    body = '\n'.join(body_lines)
    filename = title.lower().replace(' ', '-').replace('/', '-') + '.html'
    generate_html_file(title, body, filename)

print('HTML files have been generated.')
