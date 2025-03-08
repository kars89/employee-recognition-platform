"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { redeemReward } from "@/lib/actions/reward-actions"
import { toast } from "@/hooks/use-toast"

interface RewardCardProps {
  reward: any // Using any for simplicity, in a real app you'd use a proper type
  userPoints: number
}

export function RewardCard({ reward, userPoints }: RewardCardProps) {
  const [isRedeeming, setIsRedeeming] = useState(false)
  const [showDialog, setShowDialog] = useState(false)

  const canAfford = userPoints >= reward.pointsCost

  async function handleRedeem() {
    try {
      setIsRedeeming(true)
      await redeemReward(reward.id)
      toast({
        title: "Reward redeemed!",
        description: "Your redemption is being processed.",
      })
      setShowDialog(false)
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Your redemption could not be processed. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsRedeeming(false)
    }
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle>{reward.name}</CardTitle>
          <Badge variant="secondary">{reward.pointsCost} points</Badge>
        </div>
        <CardDescription>{reward.category}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {reward.imageUrl && (
          <div className="mb-4 rounded-md overflow-hidden">
            <Image
              src={reward.imageUrl || "/placeholder.svg"}
              alt={reward.name}
              width={400}
              height={300}
              className="w-full h-48 object-cover"
            />
          </div>
        )}
        <p className="text-sm">{reward.description}</p>

        {reward.stock !== null && (
          <p className="text-sm text-gray-500 mt-2">
            {reward.stock > 0 ? `${reward.stock} remaining` : "Out of stock"}
          </p>
        )}
      </CardContent>
      <CardFooter>
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button className="w-full" disabled={!canAfford || (reward.stock !== null && reward.stock <= 0)}>
              {!canAfford
                ? "Not enough points"
                : reward.stock !== null && reward.stock <= 0
                  ? "Out of stock"
                  : "Redeem"}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Redemption</DialogTitle>
              <DialogDescription>
                Are you sure you want to redeem {reward.name} for {reward.pointsCost} points?
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p>
                Your current balance: <span className="font-bold">{userPoints} points</span>
              </p>
              <p>
                Balance after redemption: <span className="font-bold">{userPoints - reward.pointsCost} points</span>
              </p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleRedeem} disabled={isRedeeming}>
                {isRedeeming ? "Processing..." : "Confirm Redemption"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}

