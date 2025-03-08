"use server"

import { getAuthSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

interface RecognitionData {
  receiverId: string
  points: number
  message: string
  gifUrl?: string
  tags?: string[]
  isPublic: boolean
}

export async function createRecognition(data: RecognitionData) {
  const session = await getAuthSession()

  if (!session?.user) {
    throw new Error("You must be logged in to create a recognition")
  }

  const sender = await prisma.user.findUnique({
    where: { id: session.user.id },
  })

  if (!sender) {
    throw new Error("Sender not found")
  }

  // Check if sender has enough points
  if (sender.pointsBalance < data.points) {
    throw new Error("You don't have enough points")
  }

  // Start a transaction to ensure all operations succeed or fail together
  return await prisma.$transaction(async (tx) => {
    // Create the recognition
    const recognition = await tx.recognition.create({
      data: {
        points: data.points,
        message: data.message,
        gifUrl: data.gifUrl,
        isPublic: data.isPublic,
        senderId: session.user.id,
        receiverId: data.receiverId,
      },
    })

    // Add tags if provided
    if (data.tags && data.tags.length > 0) {
      for (const tagName of data.tags) {
        // Find or create the tag
        const tag = await tx.tag.upsert({
          where: { name: tagName },
          update: {},
          create: { name: tagName },
        })

        // Connect tag to recognition
        await tx.recognition.update({
          where: { id: recognition.id },
          data: {
            tags: {
              connect: { id: tag.id },
            },
          },
        })
      }
    }

    // Deduct points from sender
    await tx.user.update({
      where: { id: session.user.id },
      data: {
        pointsBalance: {
          decrement: data.points,
        },
      },
    })

    // Add points to receiver
    await tx.user.update({
      where: { id: data.receiverId },
      data: {
        pointsBalance: {
          increment: data.points,
        },
      },
    })

    // Check for badges (simplified example)
    // In a real app, you'd have more complex badge logic
    const sentCount = await tx.recognition.count({
      where: { senderId: session.user.id },
    })

    if (sentCount === 1) {
      // First recognition badge
      const firstRecognitionBadge = await tx.badge.findUnique({
        where: { name: "First Recognition" },
      })

      if (firstRecognitionBadge) {
        await tx.userBadge.create({
          data: {
            userId: session.user.id,
            badgeId: firstRecognitionBadge.id,
          },
        })
      }
    }

    return recognition
  })
}

export async function getRecognitionFeed(page = 1, filter?: string) {
  const pageSize = 10
  const skip = (page - 1) * pageSize

  const whereClause: any = {
    isPublic: true,
  }

  // Apply tag filter if provided
  if (filter) {
    whereClause.tags = {
      some: {
        name: filter,
      },
    }
  }

  const recognitions = await prisma.recognition.findMany({
    where: whereClause,
    include: {
      sender: {
        select: {
          id: true,
          name: true,
          image: true,
          department: true,
        },
      },
      receiver: {
        select: {
          id: true,
          name: true,
          image: true,
          department: true,
        },
      },
      tags: true,
      comments: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      },
      reactions: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    skip,
    take: pageSize,
  })

  const totalCount = await prisma.recognition.count({
    where: whereClause,
  })

  return {
    recognitions,
    totalPages: Math.ceil(totalCount / pageSize),
    currentPage: page,
  }
}

interface CommentData {
  recognitionId: string
  content: string
}

export async function addComment(data: CommentData) {
  const session = await getAuthSession()

  if (!session?.user) {
    throw new Error("You must be logged in to add a comment")
  }

  const comment = await prisma.comment.create({
    data: {
      content: data.content,
      userId: session.user.id,
      recognitionId: data.recognitionId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  })

  return comment
}

interface ReactionData {
  recognitionId: string
  emoji: string
}

export async function addReaction(data: ReactionData) {
  const session = await getAuthSession()

  if (!session?.user) {
    throw new Error("You must be logged in to add a reaction")
  }

  // Check if user already has a reaction with this emoji
  const existingReaction = await prisma.reaction.findFirst({
    where: {
      recognitionId: data.recognitionId,
      userId: session.user.id,
      emoji: data.emoji,
    },
  })

  // If reaction exists, remove it (toggle behavior)
  if (existingReaction) {
    await prisma.reaction.delete({
      where: {
        id: existingReaction.id,
      },
    })
    return { added: false, removed: true, emoji: data.emoji }
  }

  // Otherwise, create new reaction
  const reaction = await prisma.reaction.create({
    data: {
      emoji: data.emoji,
      userId: session.user.id,
      recognitionId: data.recognitionId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  })

  return { added: true, removed: false, reaction }
}

