import { RecognitionForm } from "@/components/recognition-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getAuthSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"

export default async function RecognizePage() {
  const session = await getAuthSession()

  if (!session?.user) {
    redirect("/api/auth/signin")
  }

  // Get all users except current user
  const users = await prisma.user.findMany({
    where: {
      id: {
        not: session.user.id,
      },
    },
    select: {
      id: true,
      name: true,
      department: true,
      image: true,
    },
    orderBy: {
      name: "asc",
    },
  })

  // Get all tags
  const tags = await prisma.tag.findMany({
    orderBy: {
      name: "asc",
    },
  })

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Recognize a Colleague</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <RecognitionForm users={users} tags={tags} />
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Recognition Guidelines</CardTitle>
              <CardDescription>Tips for meaningful recognition</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 list-disc pl-5">
                <li>Be specific about what you're recognizing</li>
                <li>Tie recognition to company values when possible</li>
                <li>Recognize both achievements and efforts</li>
                <li>Keep it authentic and personal</li>
                <li>Use hashtags to categorize recognitions</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

