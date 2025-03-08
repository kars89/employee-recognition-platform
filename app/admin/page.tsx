import { getAuthSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserManagement } from "@/components/admin/user-management"
import { RewardManagement } from "@/components/admin/reward-management"
import { AnalyticsDashboard } from "@/components/admin/analytics-dashboard"
import { RedemptionManagement } from "@/components/admin/redemption-management"

export default async function AdminPage() {
  const session = await getAuthSession()

  if (!session?.user || session.user.role !== "admin") {
    redirect("/")
  }

  // Get some basic stats for the dashboard
  const userCount = await prisma.user.count()
  const recognitionCount = await prisma.recognition.count()
  const pendingRedemptionsCount = await prisma.redemption.count({
    where: { status: "pending" },
  })
  const totalPointsAwarded = await prisma.recognition.aggregate({
    _sum: {
      points: true,
    },
  })

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Users</CardTitle>
            <CardDescription>Active accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{userCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Recognitions</CardTitle>
            <CardDescription>Total sent</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{recognitionCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Pending Redemptions</CardTitle>
            <CardDescription>Awaiting approval</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{pendingRedemptionsCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Points</CardTitle>
            <CardDescription>Points awarded</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalPointsAwarded._sum.points || 0}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="analytics">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
          <TabsTrigger value="redemptions">Redemptions</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="mt-6">
          <AnalyticsDashboard />
        </TabsContent>

        <TabsContent value="users" className="mt-6">
          <UserManagement />
        </TabsContent>

        <TabsContent value="rewards" className="mt-6">
          <RewardManagement />
        </TabsContent>

        <TabsContent value="redemptions" className="mt-6">
          <RedemptionManagement />
        </TabsContent>
      </Tabs>
    </div>
  )
}

