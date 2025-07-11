// This file defines the registry for Sheikh models, mapping their IDs to
// backend Gemini models and associated system prompt files.

export const sheikhModels = {
  "sheikh-1.5-ui": {
    model: "gemini-1.5-flash", // Backend Gemini model
    promptFile: "sheikh-1.5-ui.md", // Path to the system prompt file
  },
  "sheikh-2.5-cog-thinking": {
    model: "gemini-1.5-pro", // Backend Gemini model
    promptFile: "sheikh-2.5-cog-thinking.md",
  },
  "sheikh-3.0-legacy": {
    model: "gemini-pro", // Backend Gemini model
    promptFile: "sheikh-3.0-legacy.md",
  },
} as const

// Define a type for valid Sheikh model IDs for type safety.
export type SheikhModelId = keyof typeof sheikhModels
