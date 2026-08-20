svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <rect width="100" height="100" rx="20" fill="#0B0F19"/>
  <path d="M65,30 C55,20 40,20 30,30 C20,40 20,60 30,70 C40,80 55,80 65,70 L55,60 C48,67 37,67 30,60 C23,53 23,42 30,35 C37,28 48,28 55,35 L65,30 Z" fill="#5B5BD6"/>
  <circle cx="65" cy="50" r="8" fill="#7C3AED"/>
</svg>"""

with open("public/online.svg", "w", encoding="utf-8") as f:
    f.write(svg_content)
with open("public/logo-dark.svg", "w", encoding="utf-8") as f:
    f.write(svg_content)
with open("public/logo-light.svg", "w", encoding="utf-8") as f:
    f.write(svg_content)
