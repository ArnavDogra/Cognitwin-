import re

path = "src/pages/Chat/index.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Add import
if "CognitwinWelcome" not in content[:2000]:
    content = content.replace("import { ChatHeaderTitle } from './components/ChatHeaderTitle';", "import { ChatHeaderTitle } from './components/ChatHeaderTitle';\nimport { CognitwinWelcome } from './components/CognitwinWelcome';")

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
