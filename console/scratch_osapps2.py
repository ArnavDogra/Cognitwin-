import re

path = "src/os/osApps.ts"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

new_apps = """export const OS_APPS: OsAppDef[] = [
  {
    routeId: "core.chat",
    labelKey: "nav.chat",
    fallback: "Chat",
    Icon: MessageSquare,
    accent: "#5B5BD6",
    defaultW: 880,
    defaultH: 640,
  },
  {
    routeId: "core.memory",
    labelKey: "nav.memory",
    fallback: "Memory",
    Icon: Sparkles,
    accent: "#5B5BD6",
    defaultW: 880,
    defaultH: 640,
  },
  {
    routeId: "core.browser",
    labelKey: "nav.browser",
    fallback: "Browser",
    Icon: Network,
    accent: "#5B5BD6",
    defaultW: 1000,
    defaultH: 700,
  },
  {
    routeId: "core.files",
    labelKey: "nav.files",
    fallback: "Files",
    Icon: Files,
    accent: "#5B5BD6",
    defaultW: 1180,
    defaultH: 720,
    minW: 760,
    minH: 480,
  },
  {
    routeId: "core.settings",
    labelKey: "nav.settings",
    fallback: "Settings",
    Icon: Settings,
    accent: "#5B5BD6",
    defaultW: 880,
    defaultH: 640,
  },
];"""

content = re.sub(r'export const OS_APPS: OsAppDef\[\] = \[\s*\{[\s\S]*?\n\];', new_apps, content)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
