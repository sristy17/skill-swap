import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Clock, CheckCircle, XCircle, Star } from "lucide-react";

const Swaps = () => {
  const pendingRequests = [
    {
      id: 1,
      requester: "Sarah Chen",
      avatar: undefined,
      skillOffered: "Photoshop",
      skillWanted: "React Development",
      message: "Hi! I'd love to trade my Photoshop skills for some React help. I'm working on a portfolio project.",
      time: "2 hours ago",
      type: "incoming"
    },
    {
      id: 2,
      requester: "Mike Johnson",
      avatar: undefined,
      skillOffered: "Spanish Tutoring",
      skillWanted: "Photography",
      message: "Looking to improve my photography skills. Happy to help with Spanish in return!",
      time: "1 day ago",
      type: "outgoing"
    }
  ];

  const activeSwaps = [
    {
      id: 1,
      partner: "Emma Wilson",
      avatar: undefined,
      skillOffered: "Web Design",
      skillWanted: "Marketing",
      startDate: "2024-01-15",
      nextSession: "Today, 3:00 PM",
      progress: 60
    }
  ];

  const completedSwaps = [
    {
      id: 1,
      partner: "David Kim",
      avatar: undefined,
      skillOffered: "Python",
      skillWanted: "Public Speaking",
      completedDate: "2024-01-10",
      rating: 5,
      feedback: "Excellent teacher! Very patient and knowledgeable."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            My Skill Swaps
          </h1>
          <p className="text-xl text-muted-foreground">
            Manage your skill exchange requests and active swaps
          </p>
        </div>

        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Pending ({pendingRequests.length})
            </TabsTrigger>
            <TabsTrigger value="active" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Active ({activeSwaps.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Completed ({completedSwaps.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {pendingRequests.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No pending requests</h3>
                  <p className="text-muted-foreground">
                    Browse skills to start new swap requests
                  </p>
                </CardContent>
              </Card>
            ) : (
              pendingRequests.map((request) => (
                <Card key={request.id} className="hover:shadow-medium transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={request.avatar} />
                          <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                            {request.requester.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{request.requester}</CardTitle>
                          <CardDescription>{request.time}</CardDescription>
                        </div>
                      </div>
                      <Badge variant={request.type === 'incoming' ? 'default' : 'secondary'}>
                        {request.type === 'incoming' ? 'Incoming' : 'Outgoing'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">Offering</p>
                        <Badge variant="default" className="bg-gradient-primary">
                          {request.skillOffered}
                        </Badge>
                      </div>
                      <div className="text-muted-foreground">⇄</div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">Wanting</p>
                        <Badge variant="outline" className="border-accent text-accent">
                          {request.skillWanted}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-foreground bg-card p-3 rounded-lg border">
                      "{request.message}"
                    </p>
                    {request.type === 'incoming' ? (
                      <div className="flex gap-2">
                        <Button 
                          variant="default" 
                          className="flex-1"
                          onClick={() => console.log(`Accepted swap request from ${request.requester}`)}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Accept
                        </Button>
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => console.log(`Declined swap request from ${request.requester}`)}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Decline
                        </Button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => console.log(`Edit request to ${request.requester}`)}
                        >
                          Edit Request
                        </Button>
                        <Button 
                          variant="destructive" 
                          className="flex-1"
                          onClick={() => console.log(`Cancel request to ${request.requester}`)}
                        >
                          Cancel Request
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            {activeSwaps.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No active swaps</h3>
                  <p className="text-muted-foreground">
                    Accept pending requests to start your skill exchanges
                  </p>
                </CardContent>
              </Card>
            ) : (
              activeSwaps.map((swap) => (
                <Card key={swap.id} className="hover:shadow-medium transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={swap.avatar} />
                        <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                          {swap.partner.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{swap.partner}</CardTitle>
                        <CardDescription>Started {swap.startDate}</CardDescription>
                      </div>
                      <Badge variant="default" className="bg-green-100 text-green-700 border-green-200">
                        Active
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">Teaching</p>
                        <Badge variant="default" className="bg-gradient-primary">
                          {swap.skillWanted}
                        </Badge>
                      </div>
                      <div className="text-muted-foreground">⇄</div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">Learning</p>
                        <Badge variant="outline" className="border-accent text-accent">
                          {swap.skillOffered}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{swap.progress}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-primary transition-all duration-300"
                          style={{ width: `${swap.progress}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-accent/10 rounded-lg">
                      <div>
                        <p className="text-sm font-medium">Next Session</p>
                        <p className="text-sm text-muted-foreground">{swap.nextSession}</p>
                      </div>
                      <Button 
                        variant="accent"
                        onClick={() => console.log(`Message ${swap.partner}`)}
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedSwaps.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No completed swaps yet</h3>
                  <p className="text-muted-foreground">
                    Complete your first skill exchange to see it here
                  </p>
                </CardContent>
              </Card>
            ) : (
              completedSwaps.map((swap) => (
                <Card key={swap.id} className="hover:shadow-medium transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={swap.avatar} />
                        <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                          {swap.partner.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{swap.partner}</CardTitle>
                        <CardDescription>Completed {swap.completedDate}</CardDescription>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < swap.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} 
                          />
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">Taught</p>
                        <Badge variant="default" className="bg-gradient-primary">
                          {swap.skillWanted}
                        </Badge>
                      </div>
                      <div className="text-muted-foreground">⇄</div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">Learned</p>
                        <Badge variant="outline" className="border-accent text-accent">
                          {swap.skillOffered}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-3 bg-card rounded-lg border">
                      <p className="text-sm text-muted-foreground mb-1">Feedback</p>
                      <p className="text-sm">"{swap.feedback}"</p>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Swaps;