"use client"

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism" // A dark theme
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism" // A light theme
import { useTheme } from "next-themes"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CodeBlockProps {
  code: string
  language: string
  file?: string
  project?: string
  type?: string
  title?: string
}

export default function CodeBlock({ code, language, file, project, type, title }: CodeBlockProps) {
  const { theme } = useTheme()
  const currentTheme = theme === "dark" ? vscDarkPlus : oneLight

  const headerText = title || (file && `${project ? `${project}/` : ""}${file}`) || "Code Example"

  return (
    <Card className="my-6 overflow-hidden">
      <CardHeader className="p-4 border-b">
        <CardTitle className="text-base font-semibold">{headerText}</CardTitle>
        {type && <span className="text-xs text-muted-foreground ml-2">({type})</span>}
      </CardHeader>
      <CardContent className="p-0">
        <SyntaxHighlighter
          language={language}
          style={currentTheme}
          showLineNumbers
          customStyle={{ margin: 0, padding: "1rem" }}
        >
          {code}
        </SyntaxHighlighter>
      </CardContent>
    </Card>
  )
}
