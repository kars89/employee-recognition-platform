"use client"

import * as React from "react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { X } from "lucide-react"

interface GifPickerProps {
  onSelect: (gifUrl: string | null) => void
  selected: string | null
}

// Sample GIFs for demonstration purposes
const sampleGifs = [
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjQzZjM4MWVlYjY5ZTYzMzE5NWMzYWJlOTc5NDA2OWMyMDRmOTcxZCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/l0MYt5jPR6QX5pnqM/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTk4OGU0NTI0MDg0YzRkNDhmMTg4ZGM1N2FmMmNiOTRlN2QxNDlkMiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/QMoXbsDO89qIY3lB3t/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExODBiMDY3NGJhOTNlMTcyODYwM2Y3YzUzMDZlMzI3YmRmZjY0YjU3OCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/ummeQH0c3jdm2o3Olp/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExODQ1YmZkNWJkOWJiMWFiMjMxM2FjNGM0Yjk2MjliYmRmZjZlMmE1NCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/3o7abKhOpu0NwenH3O/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmI0MGNiNmIzODU5MDgyNWIzNDc4YTNhM2YzN2M0MjAzYTQ3MWU1MiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/dCRipPM7eThmRfBXJ0/giphy.gif"
]

export function GifPicker({ onSelect, selected }: GifPickerProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (gifUrl: string) => {
    onSelect(gifUrl)
    setIsOpen(false)
  }

  const handleClear = () => {
    onSelect(null)
  }

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          type="button"
        >
          {isOpen ? "Close GIFs" : "Select a GIF"}
        </Button>
      </div>

      {selected && (
        <div className="relative mt-2 w-full max-w-xs">
          <img 
            src={selected} 
            alt="Selected GIF" 
            className="rounded-md border"
          />
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-2 h-6 w-6 rounded-full bg-background"
            onClick={handleClear}
            type="button"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}

      {isOpen && (
        <Card className="mt-2">
          <CardContent className="p-2">
            <ScrollArea className="h-60">
              <div className="grid grid-cols-2 gap-2">
                {sampleGifs.map((gif, index) => (
                  <div 
                    key={index} 
                    className="cursor-pointer rounded-md overflow-hidden border hover:border-primary transition-colors"
                    onClick={() => handleSelect(gif)}
                  >
                    <img 
                      src={gif} 
                      alt={`GIF option ${index + 1}`} 
                      className="w-full h-auto"
                    />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

