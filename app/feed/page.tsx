import { getRecognitionFeed } from "@/lib/actions/recognition-actions"
import { RecognitionCard } from "@/components/recognition-card"
import { Pagination } from "@/components/ui/pagination"
import { TagFilter } from "@/components/tag-filter"
import { prisma } from "@/lib/prisma"

interface FeedPageProps {
  searchParams: {
    page?: string
    tag?: string
  }
}

export default async function FeedPage({ 
  searchParams,
}: FeedPageProps) {
  // Parse and validate the page parameter
  const page = searchParams?.page 
    ? parseInt(searchParams.page, 10) || 1 // Ensure it's a valid number
    : 1
  
  // Get the tag parameter
  const tag = searchParams?.tag || undefined

  const { recognitions, totalPages, currentPage } = await getRecognitionFeed(page, tag)

  // Get popular tags for filter
  const popularTags = await prisma.tag.findMany({
    select: {
      id: true,
      name: true,
      _count: {
        select: { recognitions: true },
      },
    },
    orderBy: {
      recognitions: {
        _count: "desc",
      },
    },
    take: 10,
  })

  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-3xl font-bold">Recognition Feed</h1>
        <TagFilter 
          tags={popularTags.map((t) => ({ id: t.id, name: t.name }))} 
          activeTag={tag} 
        />
      </div>

      <div className="space-y-6">
        {recognitions.length > 0 ? (
          recognitions.map((recognition) => <RecognitionCard key={recognition.id} recognition={recognition} />)
        ) : (
          <div className="text-center py-10">
            <h3 className="text-lg font-medium">No recognitions found</h3>
            <p className="text-gray-500 dark:text-gray-400">
              {tag ? `No recognitions with the tag #${tag}` : "Be the first to recognize a colleague!"}
            </p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination totalPages={totalPages} currentPage={currentPage} />
        </div>
      )}
    </div>
  )
}

