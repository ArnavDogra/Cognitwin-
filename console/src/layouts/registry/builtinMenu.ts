/**
 * builtinMenu.ts — host's built-in sidebar menu entries as data.
 *
 * Importing this module self-registers all builtins into menuRegistry, so the
 * Sidebar's `useMenuItems()` snapshot returns them on first render. Plugins
 * register via `Cognitwin.menu.add(...)` which lands in the same registry, so
 * Sidebar treats core + plugin items uniformly.
 *
 * ── Naming convention ──────────────────────────────────────────────────────
 *  Group ids: `core.<name>-group` (e.g. core.control-group)
 *  Item ids:  `core.<key>`        (e.g. core.workspace)
 *  Plugin items use their own prefix (e.g. cloudpaw.a2a) — no clash possible.
 *
 * ── Sticky chat button carve-out ───────────────────────────────────────────
 *  `core.chat` is NOT in this data. The sticky chat button lives outside the
 *  antd <Menu> (rendered next to AgentSelector with bespoke styling); see
 *  Sidebar.tsx. We don't model it as menu data because it has zero antd-Menu
 *  semantics in common with the rest of the sidebar entries.
 *
 * ── Order convention ───────────────────────────────────────────────────────
 *  Within each group, items use order = 10/20/30/… in their natural sequence
 *  so plugins can insert with order 15/25 without colliding.
 */
import {
  SparkAgentLine,
  SparkBarChartLine,
  SparkBrowseLine,
  SparkDataLine,
  SparkDateLine,
  SparkDebugLine,
  SparkEmailLine,
  SparkInternetLine,
  SparkMagicWandLine,
  SparkMcpMcpLine,
  SparkMicLine,
  SparkModePlazaLine,
  SparkModifyLine,
  SparkMyApplicationLine,
  SparkOtherLine,
  SparkPluginLine,
  SparkSaveLine,
  SparkScanLine,
  SparkToolLine,
  SparkUserGroupLine,
  SparkVoiceChat01Line,
  SparkWifiLine,
} from "@agentscope-ai/icons";
import { GitBranch } from "lucide-react";
import i18next from "i18next";
import { FolderOpen } from "lucide-react";
import { menuRegistry } from "../../plugins/registry/store";
import type { MenuItem } from "../../plugins/registry/types";

/** Translate a nav key. Falls back to defaultValue when i18n hasn't loaded. */
const navLabel = (key: string, defaultValue?: string) => (): string =>
  i18next.t(key, defaultValue ?? key);

export const BUILTIN_MENU: MenuItem[] = [
  // ── Primary (Sidebar Menu #1) ───────────────────────────────────────
  {
    id: "core.memory",
    location: "primary.agentScoped",
    label: () => "Memory",
    icon: SparkMagicWandLine,
    route: "core.memory",
    order: 10,
  },
  {
    id: "core.browser",
    location: "primary.agentScoped",
    label: () => "Browser",
    icon: SparkInternetLine,
    route: "core.browser",
    order: 20,
  },
  {
    id: "core.files",
    location: "primary.agentScoped",
    label: navLabel("nav.files"),
    icon: FolderOpen,
    route: "core.files",
    order: 30,
  },

  // ── Developer Mode (Advanced Settings) ────────────────────────────────
  {
    id: "core.dev-group",
    location: "primary.agentScoped",
    label: () => "Developer Mode",
    isGroup: true,
    order: 100,
  },
  {
    id: "core.inbox",
    location: "primary.agentScoped",
    parentId: "core.dev-group",
    label: navLabel("nav.inbox"),
    icon: SparkEmailLine,
    route: "core.inbox",
    order: 110,
  },
  {
    id: "core.app-center",
    location: "primary.agentScoped",
    parentId: "core.dev-group",
    label: navLabel("nav.apps", "Apps"),
    icon: SparkMyApplicationLine,
    route: "core.app-center",
    order: 120,
  },
  {
    id: "core.channels",
    location: "primary.agentScoped",
    parentId: "core.dev-group",
    label: navLabel("nav.channels"),
    icon: SparkWifiLine,
    route: "core.channels",
    order: 130,
  },
  {
    id: "core.sessions",
    location: "primary.agentScoped",
    parentId: "core.dev-group",
    label: navLabel("nav.sessions"),
    icon: SparkUserGroupLine,
    route: "core.sessions",
    order: 140,
  },
  {
    id: "core.cron-jobs",
    location: "primary.agentScoped",
    parentId: "core.dev-group",
    label: navLabel("nav.cronJobs"),
    icon: SparkDateLine,
    route: "core.cron-jobs",
    order: 150,
  },
  {
    id: "core.heartbeat",
    location: "primary.agentScoped",
    parentId: "core.dev-group",
    label: navLabel("nav.heartbeat"),
    icon: SparkVoiceChat01Line,
    route: "core.heartbeat",
    order: 160,
  },
  {
    id: "core.skills",
    location: "primary.agentScoped",
    parentId: "core.dev-group",
    label: navLabel("nav.skills"),
    icon: SparkMagicWandLine,
    route: "core.skills",
    order: 170,
  },
  {
    id: "core.tools",
    location: "primary.agentScoped",
    parentId: "core.dev-group",
    label: navLabel("nav.tools"),
    icon: SparkToolLine,
    route: "core.tools",
    order: 180,
  },
  {
    id: "core.mcp",
    location: "primary.agentScoped",
    parentId: "core.dev-group",
    label: navLabel("nav.mcp"),
    icon: SparkMcpMcpLine,
    route: "core.mcp",
    order: 190,
  },
  {
    id: "core.acp",
    location: "primary.agentScoped",
    parentId: "core.dev-group",
    label: navLabel("nav.acp"),
    icon: SparkScanLine,
    route: "core.acp",
    order: 200,
  },
  {
    id: "core.agent-config",
    location: "primary.agentScoped",
    parentId: "core.dev-group",
    label: navLabel("nav.agentConfig"),
    icon: SparkModifyLine,
    route: "core.agent-config",
    order: 210,
  },
  {
    id: "core.agent-stats",
    location: "primary.agentScoped",
    parentId: "core.dev-group",
    label: navLabel("nav.agentStats"),
    icon: SparkBarChartLine,
    route: "core.agent-stats",
    order: 220,
  },
  {
    id: "core.checkpoints",
    location: "primary.agentScoped",
    parentId: "core.dev-group",
    label: navLabel("checkpoints.nav"),
    icon: GitBranch,
    route: "core.checkpoints",
    order: 230,
  },

  // ── Settings (Sidebar Menu #2) ───────────────────────────────────────────
  {
    id: "core.settings-group",
    location: "primary.settings",
    label: navLabel("nav.settings"),
    isGroup: true,
    order: 10,
  },
  {
    id: "core.agents",
    location: "primary.settings",
    parentId: "core.settings-group",
    label: navLabel("nav.agents"),
    icon: SparkAgentLine,
    route: "core.agents",
    order: 10,
  },
  {
    id: "core.models",
    location: "primary.settings",
    parentId: "core.settings-group",
    label: navLabel("nav.models"),
    icon: SparkModePlazaLine,
    route: "core.models",
    order: 20,
  },
  {
    id: "core.skill-pool",
    location: "primary.settings",
    parentId: "core.settings-group",
    label: navLabel("nav.skillPool", "Skill Pool"),
    icon: SparkOtherLine,
    route: "core.skill-pool",
    order: 30,
  },
  {
    id: "core.environments",
    location: "primary.settings",
    parentId: "core.settings-group",
    label: navLabel("nav.environments"),
    icon: SparkInternetLine,
    route: "core.environments",
    order: 50,
  },
  {
    id: "core.offload-policy",
    location: "primary.settings",
    parentId: "core.settings-group",
    label: navLabel("nav.offloadPolicy", "Offload Policy"),
    icon: SparkDataLine,
    route: "core.offload-policy",
    order: 55,
  },
  {
    id: "core.security",
    location: "primary.settings",
    parentId: "core.settings-group",
    label: navLabel("nav.security"),
    icon: SparkScanLine,
    route: "core.security",
    order: 60,
  },
  {
    id: "core.token-usage",
    location: "primary.settings",
    parentId: "core.settings-group",
    label: navLabel("nav.tokenUsage"),
    icon: SparkBarChartLine,
    route: "core.token-usage",
    order: 70,
  },
  {
    id: "core.voice",
    location: "primary.settings",
    parentId: "core.settings-group",
    label: navLabel("nav.voiceTranscription"),
    icon: SparkMicLine,
    route: "core.voice",
    order: 80,
  },
  {
    id: "core.backups",
    location: "primary.settings",
    parentId: "core.settings-group",
    label: navLabel("nav.backups"),
    icon: SparkSaveLine,
    route: "core.backups",
    order: 90,
  },
  {
    id: "core.plugin-manager",
    location: "primary.settings",
    parentId: "core.settings-group",
    label: navLabel("nav.pluginManager"),
    icon: SparkPluginLine,
    route: "core.plugin-manager",
    order: 100,
  },
  {
    id: "core.debug",
    location: "primary.settings",
    parentId: "core.settings-group",
    label: navLabel("nav.debug"),
    icon: SparkDebugLine,
    route: "core.debug",
    order: 110,
  },
];