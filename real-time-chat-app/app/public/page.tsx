import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function PublicMessages() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Public Messages</h1>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Community Chat</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mb-4">
            <p className="bg-gray-100 p-2 rounded-lg">
              <span className="font-bold">User123:</span> Hello everyone!
            </p>
            <p className="bg-gray-100 p-2 rounded-lg">
              <span className="font-bold">ChatEnthusiast:</span> Welcome to the community chat!
            </p>
            <p className="bg-gray-100 p-2 rounded-lg">
              <span className="font-bold">NewUser:</span> Glad to be here. What's the topic for today?
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

