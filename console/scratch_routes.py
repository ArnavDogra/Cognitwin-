import re

path = "src/layouts/registry/builtinRoutes.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Add missing imports for the lazy pages
if "const MemoryPage" not in content:
    content = content.replace('const ChannelsPage = lazyImportWithRetry("../../pages/Control/Channels");', 
                              'const ChannelsPage = lazyImportWithRetry("../../pages/Control/Channels");\n'
                              'const MemoryPage = lazyImportWithRetry("../../pages/Memory");\n'
                              'const BrowserPage = lazyImportWithRetry("../../pages/Browser");\n'
                              'const SettingsPage = lazyImportWithRetry("../../pages/Settings");')

# Add missing routes
if '{ id: "core.memory"' not in content:
    content = content.replace('{ id: "core.files", path: "/files", component: FilesPage },',
                              '{ id: "core.files", path: "/files", component: FilesPage },\n'
                              '  { id: "core.memory", path: "/memory", component: MemoryPage },\n'
                              '  { id: "core.browser", path: "/browser", component: BrowserPage },\n'
                              '  { id: "core.settings", path: "/settings", component: SettingsPage },')

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
