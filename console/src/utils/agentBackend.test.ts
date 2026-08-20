import { describe, expect, it } from "vitest";

import { requiresCognitwinModel, supportsAgentAttachments } from "./agentBackend";

describe("requiresCognitwinModel", () => {
  it("requires a configured model for native Cognitwin agents", () => {
    expect(requiresCognitwinModel("qwenpaw")).toBe(true);
  });

  it("does not inspect Cognitwin models for Codex agents", () => {
    expect(requiresCognitwinModel("codex")).toBe(false);
  });
});

describe("supportsAgentAttachments", () => {
  it("keeps attachments enabled for native agents", () => {
    expect(supportsAgentAttachments("qwenpaw")).toBe(true);
  });

  it("enables sender drop handling when Codex declares attachments", () => {
    expect(
      supportsAgentAttachments("codex", {
        attachments: true,
      }),
    ).toBe(true);
  });

  it("enables sender drop handling when Qoder declares attachments", () => {
    expect(
      supportsAgentAttachments("qoder", {
        attachments: true,
      }),
    ).toBe(true);
  });

  it("keeps attachments hidden for backends without the capability", () => {
    expect(supportsAgentAttachments("qoder", {})).toBe(false);
  });
});
