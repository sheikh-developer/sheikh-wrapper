"use client"

import { SandpackProvider, SandpackCodeEditor, SandpackLayout } from "@codesandbox/sandpack-react"
import { githubLight } from "@codesandbox/sandpack-themes"

interface PromptViewerProps {
  code: string
  fileName?: string
  title?: string
}

export function PromptViewer({ code, fileName = "prompt.md", title = "Prompt Preview" }: PromptViewerProps) {
  return (
    <div className="rounded-lg border border-border overflow-hidden">
      {title && <div className="bg-muted/50 p-3 text-sm font-semibold border-b border-border">{title}</div>}
      <SandpackProvider
        template="vanilla"
        theme={githubLight}
        files={{
          [fileName]: code,
        }}
        options={{
          readOnly: true,
          showLineNumbers: true,
          showTabs: false,
          showNavigator: false,
          showRunButton: false,
          showRunOnExternal: false,
        }}
      >
        <SandpackLayout>
          <SandpackCodeEditor />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  )
}
