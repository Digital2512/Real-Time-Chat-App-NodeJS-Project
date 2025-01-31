import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function GroupMessages() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Group Messages</h1>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Project Team Chat</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mb-4">
            <p className="bg-green-100 p-2 rounded-lg">
              <span className="font-bold">Alice:</span> Hey team, how's the progress?
            </p>
            <p className="bg-yellow-100 p-2 rounded-lg">
              <span className="font-bold">Bob:</span> Almost done with the frontend!
            </p>
            <p className="bg-purple-100 p-2 rounded-lg">
              <span className="font-bold">Charlie:</span> Backend is coming along nicely.
            </p>
          </div>
          <div className="flex space-x-2">
            <Input placeholder="Type your message..." className="flex-grow" />
            <Button>Send</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

