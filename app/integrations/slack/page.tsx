import { getAuthSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { SlackLogo } from "@/components/icons/slack-logo"

export default async function SlackIntegrationPage() {
  const session = await getAuthSession()

  if (!session?.user || session.user.role !== "admin") {
    redirect("/")
  }

  // In a real app, you'd fetch the current Slack integration status
  const isConnected = false

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Slack Integration</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <SlackLogo className="h-6 w-6" />
              <CardTitle>Connect to Slack</CardTitle>
            </div>
            <CardDescription>Allow employees to send recognitions directly from Slack</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isConnected ? (
              <div className="rounded-md bg-green-50 p-4 dark:bg-green-900/20">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800 dark:text-green-200">Connected to Slack</h3>
                    <div className="mt-2 text-sm text-green-700 dark:text-green-300">
                      <p>
                        Your workspace is successfully connected. Users can now send recognitions using the /recognize
                        command.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-md bg-blue-50 p-4 dark:bg-blue-900/20">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">Not Connected</h3>
                    <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                      <p>Connect your Slack workspace to enable recognition directly from Slack.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="slack-client-id">Slack Client ID</Label>
              <Input id="slack-client-id" placeholder="Enter your Slack Client ID" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slack-client-secret">Slack Client Secret</Label>
              <Input id="slack-client-secret" type="password" placeholder="Enter your Slack Client Secret" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slack-signing-secret">Slack Signing Secret</Label>
              <Input id="slack-signing-secret" type="password" placeholder="Enter your Slack Signing Secret" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">{isConnected ? "Reconnect Slack Workspace" : "Connect Slack Workspace"}</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Slack Settings</CardTitle>
            <CardDescription>Configure how the Slack integration works</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications">Recognition Notifications</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Send notifications to Slack when recognitions are created
                </p>
              </div>
              <Switch id="notifications" />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="slash-command">Enable /recognize Command</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Allow users to recognize colleagues using /recognize @user
                </p>
              </div>
              <Switch id="slash-command" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="daily-summary">Daily Summary</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Send a daily summary of recognitions to a channel
                </p>
              </div>
              <Switch id="daily-summary" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="summary-channel">Summary Channel</Label>
              <Input id="summary-channel" placeholder="e.g. #recognition-feed" />
              <p className="text-sm text-gray-500 dark:text-gray-400">Channel where daily summaries will be posted</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Save Settings
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Slack Command Reference</CardTitle>
            <CardDescription>Available Slack commands for the recognition system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Recognize a Colleague</h3>
                <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded mt-2">
                  /recognize @username 10 Great job on the project! #teamwork
                </code>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Sends 10 points to the user with a message and tag
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium">Check Your Balance</h3>
                <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded mt-2">/recognize balance</code>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Shows your current points balance</p>
              </div>

              <div>
                <h3 className="text-lg font-medium">View Recent Recognitions</h3>
                <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded mt-2">/recognize feed</code>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Shows recent recognitions in your workspace
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium">Help</h3>
                <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded mt-2">/recognize help</code>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Shows all available commands and how to use them
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

