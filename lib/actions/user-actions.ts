"use server";

import { getAuthSession } from "@/lib/auth";

/**
 * Fetches the points data for a specific user
 * @param userId - The ID of the user to fetch points data for (optional, uses current user if not provided)
 * @returns An object containing the user's points data
 */
export async function getUserPointsData(userId?: string) {
  // If no userId is provided, get it from the session
  if (!userId) {
    const session = await getAuthSession();
    userId = session?.user?.id;
    
    // Return empty data if no user is authenticated
    if (!userId) {
      return {
        totalPoints: 0,
        pointsGiven: 0,
        pointsReceived: 0,
        recentActivity: [],
      };
    }
  }
  try {
    // In a real application, this would fetch data from a database
    // For now, we're returning mock data based on the userId
    
    // Generate some deterministic mock data based on the userId
    const hash = userId.split('').reduce((acc, char) => {
      return acc + char.charCodeAt(0);
    }, 0);
    
    const totalPoints = 100 + (hash % 900); // Between 100-999
    const pointsGiven = Math.floor(totalPoints * 0.6); // 60% of total points
    const pointsReceived = Math.floor(totalPoints * 0.4); // 40% of total points
    
    return {
      totalPoints,
      pointsGiven,
      pointsReceived,
      recentActivity: [
        {
          id: "activity-1",
          type: "received",
          amount: 25,
          from: "Jane Doe",
          message: "Great work on the project!",
          date: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        },
        {
          id: "activity-2",
          type: "given",
          amount: 15,
          to: "John Smith",
          message: "Thanks for helping with the debugging",
          date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        },
        {
          id: "activity-3",
          type: "received",
          amount: 30,
          from: "Alex Johnson",
          message: "Excellent presentation yesterday",
          date: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
        },
      ],
    };
  } catch (error) {
    console.error("Error fetching user points data:", error);
    return {
      totalPoints: 0,
      pointsGiven: 0,
      pointsReceived: 0,
      recentActivity: [],
    };
  }
}

