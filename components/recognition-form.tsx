"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { GifPicker } from "@/components/gif-picker"
import { TagInput } from "@/components/tag-input"
import { createRecognition } from "@/lib/actions/recognition-actions"
import { toast } from "@/hooks/use-toast"

const formSchema = z.object({
  receiverId: z.string({
    required_error: "Please select a colleague to recognize",
  }),
  points: z.number().min(1).max(100),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters",
  }),
  gifUrl: z.string().optional(),
  tags: z.array(z.string()).optional(),
  isPublic: z.boolean().default(true),
})

type RecognitionFormValues = z.infer<typeof formSchema>

interface RecognitionFormProps {
  users: {
    id: string
    name: string
    department?: string | null
    image?: string | null
  }[]
  tags: {
    id: string
    name: string
  }[]
}

export function RecognitionForm({ users, tags }: RecognitionFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedGif, setSelectedGif] = useState<string | null>(null)

  const form = useForm<RecognitionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      points: 10,
      message: "",
      tags: [],
      isPublic: true,
    },
  })

  async function onSubmit(values: RecognitionFormValues) {
    try {
      setIsSubmitting(true)

      // Include the selected GIF if any
      if (selectedGif) {
        values.gifUrl = selectedGif
      }

      await createRecognition(values)

      toast({
        title: "Recognition sent!",
        description: "Your colleague has been notified of your recognition.",
      })

      router.push("/feed")
      router.refresh()
    } catch (error) {
      console.error(error)
      toast({
        title: "Something went wrong",
        description: "Your recognition could not be sent. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="receiverId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recognize</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a colleague" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {users.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.name} {user.department ? `(${user.department})` : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="points"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Points ({field.value})</FormLabel>
                  <FormControl>
                    <Slider
                      min={1}
                      max={100}
                      step={1}
                      defaultValue={[field.value]}
                      onValueChange={(values) => field.onChange(values[0])}
                    />
                  </FormControl>
                  <FormDescription>How many points would you like to award?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What would you like to recognize them for?"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <TagInput
                      placeholder="Add tags..."
                      tags={field.value || []}
                      setTags={(newTags) => field.onChange(newTags)}
                      availableTags={tags.map((tag) => tag.name)}
                    />
                  </FormControl>
                  <FormDescription>Add hashtags to categorize this recognition</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel>Add a GIF (optional)</FormLabel>
              <GifPicker onSelect={setSelectedGif} selected={selectedGif} />
            </div>

            <FormField
              control={form.control}
              name="isPublic"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Make this recognition public</FormLabel>
                    <FormDescription>Public recognitions appear in the company feed</FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Sending..." : "Send Recognition"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

