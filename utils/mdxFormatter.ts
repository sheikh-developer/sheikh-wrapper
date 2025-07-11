/**
 * Basic utility functions for processing MDX content.
 * These are illustrative and can be expanded with more robust MDX parsers like @mdx-js/mdx for production.
 */

/**
 * Performs a basic syntax check for MDX content.
 * This is a simplified check and should be replaced with a proper MDX parser for robust validation.
 * @param content The MDX content string.
 * @returns True if the content appears to be valid MDX, false otherwise.
 */
export function validateMDX(content: string): boolean {
  // A very basic check: presence of Markdown headings or JSX-like tags.
  // For real-world use, consider integrating a parser like `@mdx-js/mdx` or `unified`.
  return content.includes("#") || content.includes("<") || content.includes("`")
}

/**
 * Converts MDX content to plain Markdown by stripping out JSX components.
 * This is a naive implementation and might not handle all edge cases of embedded JSX.
 * @param content The MDX content string.
 * @returns The content with JSX components removed, leaving only Markdown.
 */
export function convertToMarkdown(content: string): string {
  // This regex attempts to remove HTML/JSX tags. It's a simple approach.
  // For complex MDX, a proper AST transformation (e.g., with remark-mdx) would be needed.
  return content.replace(/<[^>]+>/g, "")
}

/**
 * Extracts plain text from MDX content by removing all Markdown and JSX formatting.
 * @param content The MDX content string.
 * @returns The plain text content.
 */
export function extractText(content: string): string {
  // Remove HTML/JSX tags, Markdown headings, lists, bold/italic, and extra newlines.
  let plainText = content.replace(/<[^>]+>/g, "") // Remove HTML/JSX tags
  plainText = plainText.replace(/^(#+\s*.*)|([-*+]\s+.*)/gm, "$1$2") // Remove markdown headings and list markers
  plainText = plainText.replace(/(\*\*|__)(.*?)\1/g, "$2") // Remove bold
  plainText = plainText.replace(/(\*|_)(.*?)\1/g, "$2") // Remove italics
  plainText = plainText.replace(/`{1,3}([^`]+?)`{1,3}/g, "$1") // Remove inline code and code blocks
  plainText = plainText.replace(/\n\s*\n/g, "\n") // Collapse multiple newlines
  return plainText.trim()
}
