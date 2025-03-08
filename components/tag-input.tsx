"use client"

import * as React from "react"
import { X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface TagInputProps {
  tags: string[]
  setTags: (tags: string[]) => void
  placeholder?: string
  availableTags?: string[]
}

export function TagInput({ tags, setTags, placeholder = "Add tags...", availableTags = [] }: TagInputProps) {
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue) {
      e.preventDefault()
      if (!tags.includes(inputValue)) {
        setTags([...tags, inputValue])
        setInputValue("")
      }
    }
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  const addTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag])
      setInputValue("")
      setOpen(false)
      inputRef.current?.focus()
    }
  }

  // Filter available tags that aren't already selected
  const filteredTags = availableTags.filter(
    (tag) => !tags.includes(tag) && tag.toLowerCase().includes(inputValue.toLowerCase())
  )

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="text-sm">
            {tag}
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 ml-2"
              onClick={() => removeTag(tag)}
              aria-label={`Remove ${tag} tag`}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
      </div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="flex items-center border rounded-md px-3 py-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="flex-1 border-0 bg-transparent outline-none focus:ring-0 text-sm"
            />
          </div>
        </PopoverTrigger>
        {availableTags.length > 0 && (
          <PopoverContent className="w-[200px] p-0" align="start">
            <Command>
              <CommandInput 
                placeholder="Search tags..." 
                value={inputValue}
                onValueChange={setInputValue}
              />
              <CommandList>
                <CommandEmpty>No tags found.</CommandEmpty>
                <CommandGroup>
                  {filteredTags.map((tag) => (
                    <CommandItem
                      key={tag}
                      onSelect={() => addTag(tag)}
                      className="cursor-pointer"
                    >
                      {tag}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        )}
      </Popover>
    </div>
  )
}

