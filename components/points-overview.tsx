"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ArrowUpIcon, ArrowDownIcon, TrendingUpIcon } from "lucide-react"
import { getUserPointsData } from "@/lib/actions/user-actions"

export function PointsOverview() {
  const { data: session } = useSession()
  const [pointsData, setPointsData] = useState<{
    totalPoints: number
    pointsGiven: number
    pointsReceived: number
    recentActivity: any[]
  } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // Set isClient to true when component is mounted on the client
    setIsClient(true)
    
    async function fetchPointsData() {
      if (session?.user) {
        try {
          const data = await getUserPointsData()
          setPointsData(data)
        } catch (error) {
          console.error("Failed to fetch points data:", error)
        } finally {
          setIsLoading(false)
        }
      } else {
        setIsLoading(false)
      }
    }

    fetchPointsData()
  }, [session])

  // Render skeleton or placeholder when not on client yet to avoid hydration mismatch
  if (!isClient) {
    return (
      <div className="space-y-6">
        {/* Balance skeleton */}
        <div className="text-center">
          <h3 className="text-lg font-medium">Your Points Balance</h3>
          <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded mx-auto mt-2 animate-pulse"></div>
          <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded mx-auto mt-2 animate-pulse"></div>
        </div>
        
        {/* Allowance skeleton */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
          <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-3 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
        
        {/* Stats grid skeleton */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
            <div className="h-8 w-12 bg-gray-200 dark:bg-gray-700 rounded mt-2 animate-pulse"></div>
            <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded mt-2 animate-pulse"></div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
            <div className="h-8 w-12 bg-gray-200 dark:bg-gray-700 rounded mt-2 animate-pulse"></div>
            <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded mt-2 animate-pulse"></div>
          </div>
        </div>
        
        {/* Button skeleton */}
        <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm text-gray-500">Loading your points data...</p>
      </div>
    )
  }

  if (!session?.user || !pointsData) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <p className="text-lg font-medium">Sign in to view your points</p>
        <Button asChild>
          <a href="/api/auth/signin">Sign In</a>
        </Button>
      </div>
    )
  }

  // Define a fixed monthly allowance since it's not provided by the API
  const monthlyAllowance = 100
  // Calculate how many points are remaining based on the monthly allowance and points given
  const remaining = Math.max(0, monthlyAllowance - pointsData.pointsGiven)
  // Calculate percentage used
  const percentUsed = Math.round(((monthlyAllowance - remaining) / monthlyAllowance) * 100)

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-medium">Your Points Balance</h3>
        <p className="text-4xl font-bold mt-2">{pointsData.totalPoints}</p>
        <p className="text-sm text-gray-500 mt-1">Total available points</p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Monthly Allowance</span>
          <span className="font-medium">
            {remaining} of {monthlyAllowance} remaining
          </span>
        </div>
        <Progress value={percentUsed} className="h-2" />
        <p className="text-xs text-gray-500">Resets on the 1st of next month</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <ArrowDownIcon className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium">Received</span>
          </div>
          <p className="text-2xl font-bold mt-2">{pointsData.pointsReceived}</p>
          <p className="text-xs text-gray-500 mt-1">Points from others</p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <ArrowUpIcon className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium">Given</span>
          </div>
          <p className="text-2xl font-bold mt-2">{pointsData.pointsGiven}</p>
          <p className="text-xs text-gray-500 mt-1">Points to others</p>
        </div>
      </div>

      <Button variant="outline" className="w-full" asChild>
        <a href="/rewards">
          <TrendingUpIcon className="h-4 w-4 mr-2" />
          Redeem Points
        </a>
      </Button>
    </div>
  )
}

