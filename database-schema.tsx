"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DatabaseSchema() {
  return (
    <div className="w-full p-4 bg-white dark:bg-gray-950 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Database Schema</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Users</CardTitle>
            <CardDescription>User accounts and profiles</CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded-md overflow-x-auto">
              {`users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  department VARCHAR(255),
  role VARCHAR(50) NOT NULL,
  avatar_url TEXT,
  points_balance INTEGER DEFAULT 0,
  monthly_points_allowance INTEGER DEFAULT 100,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
)`}
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Recognitions</CardTitle>
            <CardDescription>Point transfers and recognitions</CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded-md overflow-x-auto">
              {`recognitions (
  id UUID PRIMARY KEY,
  sender_id UUID REFERENCES users(id),
  receiver_id UUID REFERENCES users(id),
  points INTEGER NOT NULL,
  message TEXT NOT NULL,
  gif_url TEXT,
  is_public BOOLEAN DEFAULT TRUE,
  approval_status VARCHAR(20) DEFAULT 'approved',
  created_at TIMESTAMP DEFAULT NOW()
)`}
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Recognition Tags</CardTitle>
            <CardDescription>Hashtags for recognitions</CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded-md overflow-x-auto">
              {`recognition_tags (
  recognition_id UUID REFERENCES recognitions(id),
  tag VARCHAR(50) NOT NULL,
  PRIMARY KEY (recognition_id, tag)
)`}
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Badges</CardTitle>
            <CardDescription>Achievement badges</CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded-md overflow-x-auto">
              {`badges (
  id UUID PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  icon_url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
)`}
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>User Badges</CardTitle>
            <CardDescription>Badges earned by users</CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded-md overflow-x-auto">
              {`user_badges (
  user_id UUID REFERENCES users(id),
  badge_id UUID REFERENCES badges(id),
  awarded_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (user_id, badge_id)
)`}
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Rewards</CardTitle>
            <CardDescription>Available rewards catalog</CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded-md overflow-x-auto">
              {`rewards (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  points_cost INTEGER NOT NULL,
  image_url TEXT,
  category VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE,
  stock INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
)`}
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Redemptions</CardTitle>
            <CardDescription>Reward redemption records</CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded-md overflow-x-auto">
              {`redemptions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  reward_id UUID REFERENCES rewards(id),
  points_spent INTEGER NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  redeemed_at TIMESTAMP DEFAULT NOW(),
  fulfilled_at TIMESTAMP
)`}
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Comments</CardTitle>
            <CardDescription>Comments on recognitions</CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded-md overflow-x-auto">
              {`comments (
  id UUID PRIMARY KEY,
  recognition_id UUID REFERENCES recognitions(id),
  user_id UUID REFERENCES users(id),
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
)`}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

