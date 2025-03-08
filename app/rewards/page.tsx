import { prisma } from "@/lib/prisma"
import { getAuthSession } from "@/lib/auth"
import { RewardCard } from "@/components/reward-card"
import { CategoryFilter } from "@/components/category-filter"
import { redirect } from "next/navigation"

interface RewardsPageProps {
  searchParams: {
    category?: string
  }
}

export default async function RewardsPage({ searchParams }: RewardsPageProps) {
  const session = await getAuthSession()

  if (!session?.user) {
    redirect("/api/auth/signin")
  }

  const category = searchParams.category

  // Get user's points balance
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { pointsBalance: true },
  })

  // Get all reward categories
  const categories = await prisma.reward.groupBy({
    by: ["category"],
    _count: {
      id: true,
    },
    orderBy: {
      _count: {
        id: "desc",
      },
    },
  })

  // Get rewards, filtered by category if provided
  const whereClause: any = {
    isActive: true,
  }

  if (category) {
    whereClause.category = category
  }

  const rewards = await prisma.reward.findMany({
    where: whereClause,
    orderBy: [{ category: "asc" }, { pointsCost: "asc" }],
  })

  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Rewards Marketplace</h1>
          <p className="text-gray-500">
            Your balance: <span className="font-bold text-primary">{user?.pointsBalance || 0} points</span>
          </p>
        </div>
        <CategoryFilter categories={categories.map((c) => c.category)} activeCategory={category} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewards.length > 0 ? (
          rewards.map((reward) => <RewardCard key={reward.id} reward={reward} userPoints={user?.pointsBalance || 0} />)
        ) : (
          <div className="col-span-full text-center py-10">
            <h3 className="text-lg font-medium">No rewards found</h3>
            <p className="text-gray-500 dark:text-gray-400">
              {category ? `No rewards in the ${category} category` : "Check back later for available rewards"}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

