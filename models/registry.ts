export const sheikhModels = {
  "sheikh-1.5-ui": {
    model: "gemini-1.5-flash",
    promptFile: "sheikh-1.5-ui.md",
  },
  "sheikh-2.5-cog-thinking": {
    model: "gemini-1.5-pro",
    promptFile: "sheikh-2.5-cog-thinking.md",
  },
  "sheikh-3.0-legacy": {
    model: "gemini-pro",
    promptFile: "sheikh-3.0-legacy.md",
  },
} as const

export type SheikhModelId = keyof typeof sheikhModels
