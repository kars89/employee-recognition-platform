"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"

interface CategoryFilterProps {
  categories: string[]
  activeCategory: string | null
  onChange?: (category: string | null) => void
}

export function CategoryFilter({
  categories,
  activeCategory,
  onChange,
}: CategoryFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const handleCategoryChange = (category: string | null) => {
    if (onChange) {
      onChange(category)
      return
    }
    
    // Use URL-based navigation when onChange is not provided
    const params = new URLSearchParams(searchParams.toString())
    
    if (category === null) {
      params.delete('category')
    } else {
      params.set('category', category)
    }
    
    const newPath = `${window.location.pathname}?${params.toString()}`
    router.push(newPath)
  }
  
  return (
    <div className="mb-6">
      <h3 className="mb-2 text-sm font-medium">Categories</h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleCategoryChange(null)}
          className={cn(
            "rounded-full px-3 py-1 text-sm transition-colors",
            activeCategory === null
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          )}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={cn(
              "rounded-full px-3 py-1 text-sm transition-colors",
              activeCategory === category
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}

