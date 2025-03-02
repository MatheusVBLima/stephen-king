import * as React from "react"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"

interface BreadcrumbProps extends React.HTMLAttributes<HTMLDivElement> {
  segments: {
    name: string
    href: string
    isCurrent?: boolean
  }[]
  separator?: React.ReactNode
  homeHref?: string
  showHome?: boolean
}

const Breadcrumb = ({
  segments,
  separator = <ChevronRight className="w-4 h-4 mx-1 text-muted-foreground" />,
  homeHref = "/",
  showHome = true,
  className,
  ...props
}: BreadcrumbProps) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center text-sm", className)}
      {...props}
    >
      <ol className="flex items-center space-x-1">
        {showHome && (
          <li className="flex items-center">
            <Link
              href={homeHref}
              className="flex items-center transition-colors text-muted-foreground hover:text-foreground"
            >
              <Home className="w-4 h-4" />
              <span className="sr-only">Home</span>
            </Link>
            <span aria-hidden="true" className="inline-block ml-1">
              {separator}
            </span>
          </li>
        )}
        
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1
          
          return (
            <li key={segment.href} className="flex items-center">
              {isLast ? (
                <span className="font-medium text-foreground" aria-current="page">
                  {segment.name}
                </span>
              ) : (
                <>
                  <Link
                    href={segment.href}
                    className="transition-colors text-muted-foreground hover:text-foreground"
                  >
                    {segment.name}
                  </Link>
                  <span aria-hidden="true" className="inline-block ml-1">
                    {separator}
                  </span>
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export { Breadcrumb }
