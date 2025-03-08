"use client"

import { useState } from "react"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { HeartIcon, MessageCircleIcon, ShareIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { addComment, addReaction } from "@/lib/actions/recognition-actions"
import { useSession } from "next-auth/react"
import { toast } from "@/hooks/use-toast"

interface RecognitionCardProps {
  recognition: any // Using any for simplicity, in a real app you'd use a proper type
}

export function RecognitionCard({ recognition }: RecognitionCardProps) {
  const { data: session } = useSession()
  const [isCommenting, setIsCommenting] = useState(false)
  const [commentText, setCommentText] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showAllComments, setShowAllComments] = useState(false)

  const hasLiked = recognition.reactions.some(
    (reaction: any) => reaction.userId === session?.user?.id && reaction.type === "like",
  )

  const commentsToShow = showAllComments ? recognition.comments : recognition.comments.slice(0, 2)

  const hasMoreComments = recognition.comments.length > 2 && !showAllComments

  async function handleAddReaction() {
    if (!session?.user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to react to recognitions",
        variant: "destructive",
      })
      return
    }

    try {
      await addReaction({
        recognitionId: recognition.id,
        type: "like",
      })
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Your reaction could not be processed",
        variant: "destructive",
      })
    }
  }

  async function handleAddComment() {
    if (!commentText.trim()) return

    if (!session?.user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to comment",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSubmitting(true)
      await addComment({
        recognitionId: recognition.id,
        content: commentText,
      })
      setCommentText("")
      setIsCommenting(false)
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Your comment could not be posted",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-start gap-4 pb-2">
        <Avatar>
          <AvatarImage src={recognition.sender.image || "/placeholder.svg"} alt={recognition.sender.name} />
          <AvatarFallback>{recognition.sender.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center">
            <span className="font-semibold">{recognition.sender.name}</span>
            <span className="mx-2 text-gray-500">recognized</span>
            <span className="font-semibold">{recognition.receiver.name}</span>
          </div>
          <p className="text-sm text-gray-500">
            {formatDistanceToNow(new Date(recognition.createdAt), { addSuffix: true })}
            {recognition.sender.department && ` • ${recognition.sender.department}`}
          </p>
        </div>
        <div className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium">
          +{recognition.points} points
        </div>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-line mb-4">{recognition.message}</p>

        {recognition.gifUrl && (
          <div className="mb-4 rounded-md overflow-hidden">
            <Image
              src={recognition.gifUrl || "/placeholder.svg"}
              alt="Recognition GIF"
              width={400}
              height={300}
              className="w-full object-cover"
            />
          </div>
        )}

        {recognition.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {recognition.tags.map((tag: any) => (
              <Badge key={tag.id} variant="secondary">
                #{tag.name}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
          <div>
            {recognition.reactions.length > 0 && (
              <span className="flex items-center gap-1">
                <HeartIcon className="h-4 w-4 fill-red-500 text-red-500" />
                {recognition.reactions.length}
              </span>
            )}
          </div>
          <div>{recognition.comments.length > 0 && <span>{recognition.comments.length} comments</span>}</div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col">
        <div className="flex items-center justify-between w-full border-t border-b py-2">
          <Button
            variant="ghost"
            size="sm"
            className={cn("flex items-center gap-1", hasLiked && "text-red-500")}
            onClick={handleAddReaction}
          >
            <HeartIcon className={cn("h-4 w-4", hasLiked && "fill-red-500")} />
            Like
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => setIsCommenting(!isCommenting)}
          >
            <MessageCircleIcon className="h-4 w-4" />
            Comment
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <ShareIcon className="h-4 w-4" />
            Share
          </Button>
        </div>

        {isCommenting && (
          <div className="w-full pt-4">
            <Textarea
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="mb-2"
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsCommenting(false)}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleAddComment} disabled={isSubmitting || !commentText.trim()}>
                {isSubmitting ? "Posting..." : "Post"}
              </Button>
            </div>
          </div>
        )}

        {recognition.comments.length > 0 && (
          <div className="w-full mt-4 space-y-4">
            {commentsToShow.map((comment: any) => (
              <div key={comment.id} className="flex gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={comment.user.image || "/placeholder.svg"} alt={comment.user.name} />
                  <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="bg-secondary p-3 rounded-lg">
                    <div className="font-medium text-sm">{comment.user.name}</div>
                    <p className="text-sm">{comment.content}</p>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                  </div>
                </div>
              </div>
            ))}

            {hasMoreComments && (
              <Button variant="link" size="sm" className="text-sm" onClick={() => setShowAllComments(true)}>
                View all {recognition.comments.length} comments
              </Button>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

