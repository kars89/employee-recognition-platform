"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function KeyComponents() {
  return (
    <div className="w-full p-4 bg-white dark:bg-gray-950 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Key Components</h2>

      <Tabs defaultValue="frontend">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="frontend">Frontend Components</TabsTrigger>
          <TabsTrigger value="backend">Backend Services</TabsTrigger>
        </TabsList>

        <TabsContent value="frontend" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Authentication Module</CardTitle>
                <CardDescription>User login and registration</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Login/Register forms with validation</li>
                  <li>SSO integration (Google, Microsoft)</li>
                  <li>Password reset flow</li>
                  <li>Auth state management with React Context</li>
                  <li>Protected routes with role-based access</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recognition Feed</CardTitle>
                <CardDescription>Social-style recognition board</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Infinite scrolling feed of recognitions</li>
                  <li>Filtering by department, tags, date</li>
                  <li>Like and comment functionality</li>
                  <li>Real-time updates with WebSockets</li>
                  <li>Recognition composer with GIF picker</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Dashboard</CardTitle>
                <CardDescription>Personal stats and activity</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Points balance and history</li>
                  <li>Badges and achievements</li>
                  <li>Recent recognitions (given/received)</li>
                  <li>Profile management</li>
                  <li>Personalized recommendations</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Rewards Marketplace</CardTitle>
                <CardDescription>Browse and redeem rewards</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Categorized rewards catalog</li>
                  <li>Search and filter functionality</li>
                  <li>Redemption flow with confirmation</li>
                  <li>Redemption history</li>
                  <li>Wishlist functionality</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Admin Dashboard</CardTitle>
                <CardDescription>Platform management</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1">
                  <li>User management and role assignment</li>
                  <li>Recognition approval workflows</li>
                  <li>Rewards catalog management</li>
                  <li>Points allocation settings</li>
                  <li>Custom branding configuration</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Analytics Dashboard</CardTitle>
                <CardDescription>Insights and reporting</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Engagement metrics visualization</li>
                  <li>Recognition trends over time</li>
                  <li>Department participation rates</li>
                  <li>Top recognizers and recipients</li>
                  <li>Custom report generation</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="backend" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Authentication Service</CardTitle>
                <CardDescription>User identity management</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Auth0 integration for authentication</li>
                  <li>JWT token generation and validation</li>
                  <li>Role-based permission system</li>
                  <li>SSO provider connections</li>
                  <li>Password policies and security</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Service</CardTitle>
                <CardDescription>User profile management</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1">
                  <li>User CRUD operations</li>
                  <li>Profile data management</li>
                  <li>Department and team associations</li>
                  <li>Points balance tracking</li>
                  <li>HRMS data synchronization</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recognition Service</CardTitle>
                <CardDescription>Core recognition functionality</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Recognition creation and validation</li>
                  <li>Points transfer logic</li>
                  <li>Approval workflows</li>
                  <li>Feed generation and filtering</li>
                  <li>Hashtag and mention processing</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Rewards Service</CardTitle>
                <CardDescription>Rewards catalog and redemption</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Rewards catalog management</li>
                  <li>Redemption processing</li>
                  <li>Inventory tracking</li>
                  <li>Gift card integration</li>
                  <li>Fulfillment workflows</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Service</CardTitle>
                <CardDescription>Multi-channel notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Email notifications</li>
                  <li>In-app notifications</li>
                  <li>Slack/Teams message delivery</li>
                  <li>Notification preferences</li>
                  <li>Scheduled reminders</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Analytics Service</CardTitle>
                <CardDescription>Data analysis and reporting</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Data aggregation and processing</li>
                  <li>Report generation</li>
                  <li>Trend analysis</li>
                  <li>Export functionality (CSV, PDF)</li>
                  <li>Custom dashboard metrics</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

