import fs from "fs/promises"
import path from "path"

/**
 * Loads the content of a system prompt file from the 'prompts' directory.
 * @param promptFile The filename of the prompt (e.g., 'sheikh-1.5-ui.md').
 * @returns A promise that resolves to the trimmed content of the prompt file.
 * @throws Error if the prompt file cannot be found or read.
 */
export async function loadPrompt(promptFile: string): Promise<string> {
  try {
    // Construct the full path to the prompt file.
    // process.cwd() gets the current working directory (project root).
    const promptPath = path.join(process.cwd(), "prompts", promptFile)

    // Read the file content asynchronously.
    const promptContent = await fs.readFile(promptPath, "utf-8")

    // Return the content, removing any leading/trailing whitespace.
    return promptContent.trim()
  } catch (error) {
    // Log the error and throw a more descriptive error message.
    console.error(`Failed to load prompt file: ${promptFile}`, error)
    throw new Error(`Prompt file not found: ${promptFile}`)
  }
}
