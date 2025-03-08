"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrophyIcon, MedalIcon, StarIcon } from "lucide-react";
import { UserButton } from "@/components/user-button";

// Define types for our leaderboard data
type LeaderboardUser = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  department: string | null;
  jobTitle: string | null;
  pointsBalance: number;
};

export default function LeaderboardPage() {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [timeframe, setTimeframe] = useState<string>("alltime");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark as client-side rendered to avoid hydration issues
    setIsClient(true);

    // In a real implementation, this would be an API call to fetch leaderboard data
    // based on the selected timeframe
    setTimeout(() => {
      const mockUsers: LeaderboardUser[] = [
        {
          id: "1",
          name: "Emma Johnson",
          email: "emma@example.com",
          image: null,
          department: "Engineering",
          jobTitle: "Senior Developer",
          pointsBalance: 850,
        },
        {
          id: "2",
          name: "Michael Chen",
          email: "michael@example.com",
          image: null,
          department: "Product",
          jobTitle: "Product Manager",
          pointsBalance: 720,
        },
        {
          id: "3",
          name: "Sophia Rodriguez",
          email: "sophia@example.com",
          image: null,
          department: "Marketing",
          jobTitle: "Marketing Specialist",
          pointsBalance: 690,
        },
        {
          id: "4",
          name: "Daniel Kim",
          email: "daniel@example.com",
          image: null,
          department: "Engineering",
          jobTitle: "Frontend Developer",
          pointsBalance: 645,
        },
        {
          id: "5",
          name: "Olivia Taylor",
          email: "olivia@example.com",
          image: null,
          department: "Customer Success",
          jobTitle: "Customer Success Manager",
          pointsBalance: 610,
        },
        {
          id: "6",
          name: "James Wilson",
          email: "james@example.com",
          image: null,
          department: "Sales",
          jobTitle: "Sales Representative",
          pointsBalance: 580,
        },
        {
          id: "7",
          name: "Ava Martinez",
          email: "ava@example.com",
          image: null,
          department: "Design",
          jobTitle: "UI/UX Designer",
          pointsBalance: 520,
        },
        {
          id: "8",
          name: "William Lee",
          email: "william@example.com",
          image: null,
          department: "Engineering",
          jobTitle: "Backend Developer",
          pointsBalance: 505,
        },
        {
          id: "9",
          name: "Isabella Brown",
          email: "isabella@example.com",
          image: null,
          department: "HR",
          jobTitle: "HR Specialist",
          pointsBalance: 490,
        },
        {
          id: "10",
          name: "Noah Garcia",
          email: "noah@example.com",
          image: null,
          department: "Finance",
          jobTitle: "Financial Analyst",
          pointsBalance: 465,
        },
      ];
      setUsers(mockUsers);
      setIsLoading(false);
    }, 1000);
  }, [timeframe]);

  // Helper function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Helper function to render the rank badge/icon based on position
  const getRankBadge = (index: number) => {
    if (index === 0) {
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400 text-white">
          <TrophyIcon className="h-4 w-4" />
        </div>
      );
    } else if (index === 1) {
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-white">
          <MedalIcon className="h-4 w-4" />
        </div>
      );
    } else if (index === 2) {
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-600 text-white">
          <StarIcon className="h-4 w-4" />
        </div>
      );
    }
    return null;
  };

  if (!isClient) {
    return (
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold">PeerPraise</span>
            </Link>
            <div className="w-20 h-6 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </header>
        <main className="flex-1 p-6">
          <div className="container">
            <div className="w-40 h-8 bg-gray-200 rounded mb-4 animate-pulse"></div>
            <div className="w-full h-96 bg-gray-100 rounded animate-pulse"></div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">PeerPraise</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/feed" className="text-sm font-medium hover:underline">
              Recognition Feed
            </Link>
            <Link href="/rewards" className="text-sm font-medium hover:underline">
              Rewards
            </Link>
            <Link href="/leaderboard" className="text-sm font-medium underline hover:underline">
              Leaderboard
            </Link>
            <UserButton />
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Leaderboard</h1>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  See who's leading the way in recognition points
                </p>
              </div>
            </div>
            <div className="mx-auto mt-8 max-w-4xl">
              <Tabs defaultValue="alltime" className="w-full" onValueChange={setTimeframe}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="alltime">All Time</TabsTrigger>
                  <TabsTrigger value="month">This Month</TabsTrigger>
                  <TabsTrigger value="week">This Week</TabsTrigger>
                </TabsList>
                <TabsContent value="alltime" className="mt-6">
                  {renderLeaderboard()}
                </TabsContent>
                <TabsContent value="month" className="mt-6">
                  {renderLeaderboard()}
                </TabsContent>
                <TabsContent value="week" className="mt-6">
                  {renderLeaderboard()}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-gray-500 dark:text-gray-400">© 2023 PeerPraise. All rights reserved.</p>
          <nav className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
            <Link href="/terms" className="hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="hover:underline">
              Privacy
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );

  function renderLeaderboard() {
    if (isLoading) {
      return (
        <div className="flex justify-center py-10">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-gray-500 mt-4">Loading leaderboard data...</p>
          </div>
        </div>
      );
    }

    if (users.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-lg text-gray-500">No data available for this time period.</p>
          <Button variant="outline" className="mt-4" asChild>
            <Link href="/recognize">Recognize Someone</Link>
          </Button>
        </div>
      );
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle>Top Performers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {users.map((user, index) => (
              <div key={user.id} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-sm font-medium">#{index + 1}</span>
                  </div>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.image || ""} alt={user.name} />
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {user.jobTitle} {user.department ? `• ${user.department}` : ""}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
                    <span className="font-bold">{user.pointsBalance}</span>
                    <span className="text-xs">points</span>
                  </Badge>
                  {getRankBadge(index)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
}

