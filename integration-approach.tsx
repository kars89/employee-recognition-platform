"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function IntegrationApproach() {
  return (
    <div className="w-full p-4 bg-white dark:bg-gray-950 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Integration Approaches</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Slack Integration</CardTitle>
            <CardDescription>Recognize colleagues directly from Slack</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Slash Commands:</strong> Implement{" "}
                <code>/recognize @user 10 Great job on the project! #teamwork</code> to send recognition
              </li>
              <li>
                <strong>Interactive Messages:</strong> Recognition notifications with reaction buttons
              </li>
              <li>
                <strong>App Home:</strong> Dashboard showing recent recognitions and points balance
              </li>
              <li>
                <strong>OAuth Flow:</strong> Secure workspace connection with appropriate scopes
              </li>
              <li>
                <strong>Event Subscriptions:</strong> Listen for relevant channel events
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Microsoft Teams Integration</CardTitle>
            <CardDescription>Teams app for recognition</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Teams Tab:</strong> Embedded recognition feed and dashboard
              </li>
              <li>
                <strong>Bot Framework:</strong> Conversational interface for sending recognition
              </li>
              <li>
                <strong>Messaging Extensions:</strong> Quick recognition from message compose box
              </li>
              <li>
                <strong>Adaptive Cards:</strong> Rich, interactive recognition cards
              </li>
              <li>
                <strong>Single Sign-On:</strong> Seamless authentication with Microsoft identity
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>HRMS Integration</CardTitle>
            <CardDescription>Sync with HR systems</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>User Synchronization:</strong> Automatically import and update user profiles
              </li>
              <li>
                <strong>Department Structure:</strong> Maintain accurate org chart and reporting lines
              </li>
              <li>
                <strong>Employment Events:</strong> Handle onboarding, transfers, and offboarding
              </li>
              <li>
                <strong>API Connectors:</strong> Pre-built connectors for Workday, BambooHR, etc.
              </li>
              <li>
                <strong>Scheduled Sync:</strong> Regular data reconciliation with conflict resolution
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SSO Implementation</CardTitle>
            <CardDescription>Enterprise authentication</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>SAML 2.0 Support:</strong> Integration with enterprise identity providers
              </li>
              <li>
                <strong>OAuth/OIDC:</strong> Support for Google Workspace, Microsoft Azure AD
              </li>
              <li>
                <strong>Just-in-time Provisioning:</strong> Create user accounts on first login
              </li>
              <li>
                <strong>Role Mapping:</strong> Map IdP groups to platform roles
              </li>
              <li>
                <strong>Auth0 Integration:</strong> Leverage Auth0 for identity management
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Email Integration</CardTitle>
            <CardDescription>Email notifications and interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Transactional Emails:</strong> Recognition notifications, redemption confirmations
              </li>
              <li>
                <strong>Digest Emails:</strong> Weekly summaries of recognition activity
              </li>
              <li>
                <strong>Interactive Emails:</strong> Respond to recognitions directly from email
              </li>
              <li>
                <strong>Email Templates:</strong> Customizable, branded email templates
              </li>
              <li>
                <strong>Delivery Service:</strong> Integration with SendGrid or similar for reliable delivery
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rewards Vendor Integration</CardTitle>
            <CardDescription>Connect with reward providers</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Gift Card APIs:</strong> Integration with providers like Tango Card, WeGift
              </li>
              <li>
                <strong>E-commerce Integration:</strong> Amazon, Shopify for physical goods
              </li>
              <li>
                <strong>Custom Rewards:</strong> Internal fulfillment workflow for company-specific perks
              </li>
              <li>
                <strong>Inventory Sync:</strong> Real-time availability checking
              </li>
              <li>
                <strong>Fulfillment Tracking:</strong> Monitor delivery status of rewards
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

