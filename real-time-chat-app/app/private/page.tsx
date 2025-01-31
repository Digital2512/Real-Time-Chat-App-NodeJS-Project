import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function PrivateMessages() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Private Messages</h1>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Chat with John Doe</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mb-4">
            <p className="bg-blue-100 p-2 rounded-lg">Hey, how are you?</p>
            <p className="bg-gray-100 p-2 rounded-lg text-right">I'm good, thanks! How about you?</p>
            <p className="bg-blue-100 p-2 rounded-lg">Doing great! Want to grab lunch later?</p>
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

