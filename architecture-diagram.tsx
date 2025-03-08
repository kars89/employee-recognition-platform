"use client"

export default function ArchitectureDiagram() {
  return (
    <div className="w-full p-4 bg-white dark:bg-gray-950 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">System Architecture</h2>
      <div className="relative w-full h-[600px] border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
        {/* Frontend Layer */}
        <div className="absolute top-4 left-4 right-4 h-24 bg-blue-100 dark:bg-blue-950 rounded-lg border border-blue-300 dark:border-blue-800 flex items-center justify-center">
          <div className="text-center">
            <h3 className="font-bold">Frontend (React + Tailwind CSS)</h3>
            <p className="text-sm">User Interface, Admin Dashboard, Recognition Feed</p>
          </div>
        </div>

        {/* API Gateway Layer */}
        <div className="absolute top-36 left-4 right-4 h-20 bg-green-100 dark:bg-green-950 rounded-lg border border-green-300 dark:border-green-800 flex items-center justify-center">
          <div className="text-center">
            <h3 className="font-bold">API Gateway (Express.js)</h3>
            <p className="text-sm">Authentication, Rate Limiting, Request Routing</p>
          </div>
        </div>

        {/* Microservices Layer */}
        <div className="absolute top-64 left-4 right-4 h-48 flex space-x-4">
          <div className="flex-1 bg-purple-100 dark:bg-purple-950 rounded-lg border border-purple-300 dark:border-purple-800 flex flex-col items-center justify-center p-2">
            <h3 className="font-bold">User Service</h3>
            <p className="text-sm text-center">Authentication, Profiles, Roles</p>
          </div>
          <div className="flex-1 bg-purple-100 dark:bg-purple-950 rounded-lg border border-purple-300 dark:border-purple-800 flex flex-col items-center justify-center p-2">
            <h3 className="font-bold">Recognition Service</h3>
            <p className="text-sm text-center">Points, Badges, Feed</p>
          </div>
          <div className="flex-1 bg-purple-100 dark:bg-purple-950 rounded-lg border border-purple-300 dark:border-purple-800 flex flex-col items-center justify-center p-2">
            <h3 className="font-bold">Rewards Service</h3>
            <p className="text-sm text-center">Catalog, Redemption</p>
          </div>
          <div className="flex-1 bg-purple-100 dark:bg-purple-950 rounded-lg border border-purple-300 dark:border-purple-800 flex flex-col items-center justify-center p-2">
            <h3 className="font-bold">Analytics Service</h3>
            <p className="text-sm text-center">Reports, Insights</p>
          </div>
        </div>

        {/* Integration Layer */}
        <div className="absolute top-320 left-4 right-4 h-20 bg-yellow-100 dark:bg-yellow-950 rounded-lg border border-yellow-300 dark:border-yellow-800 flex items-center justify-center">
          <div className="text-center">
            <h3 className="font-bold">Integration Layer</h3>
            <p className="text-sm">Slack, MS Teams, HRMS Connectors</p>
          </div>
        </div>

        {/* Database Layer */}
        <div className="absolute top-[350px] left-4 right-4 h-20 bg-red-100 dark:bg-red-950 rounded-lg border border-red-300 dark:border-red-800 flex items-center justify-center">
          <div className="text-center">
            <h3 className="font-bold">Database (PostgreSQL)</h3>
            <p className="text-sm">User Data, Recognition Records, Rewards Catalog</p>
          </div>
        </div>

        {/* External Services */}
        <div className="absolute bottom-4 left-4 right-4 h-20 bg-gray-100 dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-700 flex items-center justify-center">
          <div className="text-center">
            <h3 className="font-bold">External Services</h3>
            <p className="text-sm">Auth0, Payment Gateways, Email Service, Notification Service</p>
          </div>
        </div>
      </div>
    </div>
  )
}

