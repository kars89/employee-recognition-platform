"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { UserButton } from "@/components/user-button"
import { RecentRecognitions } from "@/components/recent-recognitions"
import { PointsOverview } from "@/components/points-overview"
import { TopRecognizers } from "@/components/top-recognizers"

export default function Home() {
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
            <Link href="/leaderboard" className="text-sm font-medium hover:underline">
              Leaderboard
            </Link>
            <UserButton />
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Recognize and Reward Your Colleagues
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Celebrate achievements, foster a positive workplace culture, and reward excellence with our
                    peer-to-peer recognition platform.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/recognize">
                    <Button size="lg">Recognize a Colleague</Button>
                  </Link>
                  <Link href="/rewards">
                    <Button size="lg" variant="outline">
                      Browse Rewards
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Card className="w-full">
                  <CardContent className="p-6">
                    <PointsOverview />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Recent Recognitions</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  See the latest achievements and kudos from your colleagues
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <RecentRecognitions />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Top Recognizers</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Colleagues who are leading the way in recognizing others
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12">
              <TopRecognizers />
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
  )
}

