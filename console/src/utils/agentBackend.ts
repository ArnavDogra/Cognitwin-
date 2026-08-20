import type { AgentBackend } from "../api/types/agents";
import type { HarnessCapabilities } from "../api/modules/harness";

export function requiresCognitwinModel(backend: AgentBackend): boolean {
  return backend === "qwenpaw";
}

export function supportsAgentAttachments(
  backend: AgentBackend,
  capabilities?: Partial<HarnessCapabilities>,
): boolean {
  return requiresCognitwinModel(backend) || Boolean(capabilities?.attachments);
}
