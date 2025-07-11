import fs from "fs/promises"
import path from "path"

export async function loadPrompt(promptFile: string): Promise<string> {
  try {
    const promptPath = path.join(process.cwd(), "prompts", promptFile)
    const promptContent = await fs.readFile(promptPath, "utf-8")
    return promptContent.trim()
  } catch (error) {
    console.error(`Failed to load prompt file: ${promptFile}`, error)
    throw new Error(`Prompt file not found: ${promptFile}`)
  }
}
