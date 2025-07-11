// components/mdx-components.tsx
"use client"

import type React from "react"

import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button" // Example custom component
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/card" // Example custom component
import { Input } from "@/components/ui/input" // Example custom component

// Define custom components available within your MDX
// These components should match the ones you expect to be embedded in the MDX output
const components = {
  Button: ({
    variant,
    children,
    ...props
  }: {
    variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link"
    children: React.ReactNode
    [key: string]: any
  }) => (
    <Button variant={variant} {...props}>
      {children}
    </Button>
  ),
  Card: ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => (
    <Card {...props}>{children}</Card>
  ),
  CardHeader: ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => (
    <CardHeader {...props}>{children}</CardHeader>
  ),
  CardContent: ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => (
    <CardContent {...props}>{children}</CardContent>
  ),
  CardTitle: ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => (
    <CardTitle {...props}>{children}</CardTitle>
  ),
  CardDescription: ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => (
    <CardDescription {...props}>{children}</CardDescription>
  ),
  CardFooter: ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => (
    <CardFooter {...props}>{children}</CardFooter>
  ),
  Input: ({ ...props }: { [key: string]: any }) => <Input {...props} />,
  // Add other custom components here as needed
}

interface RenderMDXProps {
  content: string
}

export default function RenderMDX({ content }: RenderMDXProps) {
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null)

  useEffect(() => {
    const getMdxSource = async () => {
      if (!content) {
        setMdxSource(null)
        return
      }
      try {
        const source = await serialize(content, {
          mdxOptions: {
            // You can add remark/rehype plugins here if needed
          },
          scope: {}, // Data passed to MDX components
        })
        setMdxSource(source)
      } catch (error) {
        console.error("Error serializing MDX content:", error)
        setMdxSource(null) // Or set an error state
      }
    }

    getMdxSource()
  }, [content])

  if (!mdxSource) {
    return <div>Loading content...</div>
  }

  return <MDXRemote {...mdxSource} components={components} />
}
