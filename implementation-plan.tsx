"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ImplementationPlan() {
  return (
    <div className="w-full p-4 bg-white dark:bg-gray-950 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Implementation Plan</h2>

      <Tabs defaultValue="phase1">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="phase1">Phase 1: Core Platform</TabsTrigger>
          <TabsTrigger value="phase2">Phase 2: Advanced Features</TabsTrigger>
          <TabsTrigger value="phase3">Phase 3: Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="phase1" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Phase 1: Core Platform (8-10 weeks)</CardTitle>
              <CardDescription>Establish the foundation of the recognition system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Week 1-2: Setup & Authentication</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Project setup with React, Node.js, and PostgreSQL</li>
                    <li>Auth0 integration for user authentication</li>
                    <li>Basic user management and role system</li>
                    <li>Database schema implementation</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Week 3-4: Recognition System</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>User profile management</li>
                    <li>Basic recognition functionality (send/receive points)</li>
                    <li>Recognition feed with pagination</li>
                    <li>Points allocation and tracking system</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Week 5-6: Rewards System</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Rewards catalog management</li>
                    <li>Basic redemption flow</li>
                    <li>Points balance and history</li>
                    <li>Admin approval workflow for redemptions</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Week 7-8: Admin Features</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Admin dashboard for user management</li>
                    <li>Basic reporting and analytics</li>
                    <li>System configuration options</li>
                    <li>Basic branding customization</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Week 9-10: Testing & Deployment</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Comprehensive testing (unit, integration, E2E)</li>
                    <li>Performance optimization</li>
                    <li>Documentation</li>
                    <li>Production deployment</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Deliverables:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Fully functional user authentication system</li>
                    <li>Core recognition system with points allocation</li>
                    <li>Basic rewards catalog and redemption</li>
                    <li>Admin dashboard with essential management features</li>
                    <li>Responsive UI for desktop and mobile</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="phase2" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Phase 2: Advanced Features (6-8 weeks)</CardTitle>
              <CardDescription>Enhance the platform with social and gamification features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Week 1-2: Social Features</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Comments and reactions on recognitions</li>
                    <li>Enhanced recognition feed with filtering options</li>
                    <li>Hashtag system and trending topics</li>
                    <li>User mentions and notifications</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Week 3-4: Gamification</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Badges and achievements system</li>
                    <li>Leaderboards (company-wide and departmental)</li>
                    <li>Streaks and milestones</li>
                    <li>Achievement levels and progression</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Week 5-6: Enhanced Rewards</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Expanded rewards catalog with categories</li>
                    <li>Custom company rewards management</li>
                    <li>Wishlist functionality</li>
                    <li>Advanced redemption workflows</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Week 7-8: Advanced Analytics</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Comprehensive analytics dashboard</li>
                    <li>Custom report generation</li>
                    <li>Data visualization enhancements</li>
                    <li>Export functionality (CSV, PDF)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Deliverables:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Social interaction features (comments, reactions)</li>
                    <li>Complete gamification system with badges and leaderboards</li>
                    <li>Enhanced rewards marketplace</li>
                    <li>Advanced analytics and reporting tools</li>
                    <li>Improved user experience and engagement features</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="phase3" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Phase 3: Integrations (6-8 weeks)</CardTitle>
              <CardDescription>Connect with external systems and enhance functionality</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Week 1-2: Slack Integration</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Slack app development with slash commands</li>
                    <li>Interactive messages for recognition</li>
                    <li>Notification system in Slack</li>
                    <li>OAuth flow for workspace connection</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Week 3-4: Microsoft Teams Integration</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Teams app with embedded tabs</li>
                    <li>Bot for recognition commands</li>
                    <li>Adaptive cards for interactive recognition</li>
                    <li>SSO with Microsoft identity</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Week 5-6: HRMS Integration</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>User synchronization with HR systems</li>
                    <li>Department and reporting structure import</li>
                    <li>Connectors for popular HRMS (Workday, BambooHR)</li>
                    <li>Automated user provisioning and deprovisioning</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Week 7-8: Gift Card & Reward Providers</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Integration with gift card APIs (Tango Card, etc.)</li>
                    <li>E-commerce connections for physical rewards</li>
                    <li>Automated fulfillment workflows</li>
                    <li>Tracking and delivery confirmation</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Deliverables:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Fully functional Slack and MS Teams integrations</li>
                    <li>HRMS connectors with automated sync</li>
                    <li>Gift card and reward provider integrations</li>
                    <li>Comprehensive API documentation</li>
                    <li>Integration testing and monitoring tools</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

