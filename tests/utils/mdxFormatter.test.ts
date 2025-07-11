import { validateMDX, convertToMarkdown, extractText } from "@/utils/mdxFormatter"

describe("mdxFormatter", () => {
  it("validateMDX should correctly identify MDX content", () => {
    expect(validateMDX("# Hello")).toBe(true)
    expect(validateMDX("<Button>Click</Button>")).toBe(true)
    expect(validateMDX("Plain text")).toBe(false) // Simplified check
  })

  it("convertToMarkdown should strip JSX tags", () => {
    const mdx = "# Title\n\nThis is a paragraph with a <Button>Click Me</Button> component."
    const markdown = "# Title\n\nThis is a paragraph with a Click Me component."
    expect(convertToMarkdown(mdx)).toBe(markdown)
  })

  it("extractText should remove all formatting", () => {
    const mdx =
      '# Heading\n\n**Bold text** and _italic_ text. `console.log("hello")`\n\n<CustomComponent />\n- List item 1\n- List item 2'
    const plainText = 'Heading\n\nBold text and italic text. console.log("hello")\n\nList item 1\nList item 2'
    expect(extractText(mdx)).toBe(plainText)
  })
})
