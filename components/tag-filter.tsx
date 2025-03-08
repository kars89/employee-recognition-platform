"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface Tag {
  id: string
  name: string
}

interface TagFilterProps {
  tags: Tag[]
  activeTag?: string
  onChange?: (tagId: string) => void
}

export function TagFilter({ tags, activeTag, onChange }: TagFilterProps) {
  const router = useRouter()

  const handleTagClick = (tagId: string) => {
    if (onChange) {
      onChange(tagId)
    } else {
      // Use URL-based navigation if no onChange handler is provided
      const url = tagId ? `/feed?tag=${tagId}` : '/feed'
      router.push(url)
    }
  }

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Button
        variant={!activeTag ? "default" : "outline"}
        size="sm"
        onClick={() => handleTagClick("")}
        className={cn(
          "text-xs h-8 rounded-md",
          !activeTag ? "bg-primary text-primary-foreground" : ""
        )}
      >
        All
      </Button>
      
      {tags.map((tag) => (
        <Button
          key={tag.id}
          variant={activeTag === tag.id ? "default" : "outline"}
          size="sm"
          onClick={() => handleTagClick(tag.id)}
          className={cn(
            "text-xs h-8 rounded-md",
            activeTag === tag.id ? "bg-primary text-primary-foreground" : ""
          )}
        >
          {tag.name}
        </Button>
      ))}
    </div>
  )
}

