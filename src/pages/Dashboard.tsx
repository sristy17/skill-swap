import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  MessageSquare, 
  Star, 
  TrendingUp, 
  Clock,
  Plus,
  Search,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Sample data - in real app this would come from your backend
  const stats = {
    totalSwaps: 12,
    pendingRequests: 3,
    rating: 4.8,
    profileViews: 156
  };

  const recentActivity = [
    {
      id: 1,
      type: "swap_request",
      user: "Sarah Chen",
      skill: "Photoshop",
      time: "2 hours ago",
      status: "pending"
    },
    {
      id: 2,
      type: "swap_completed",
      user: "Mike Johnson",
      skill: "Spanish Tutoring",
      time: "1 day ago",
      status: "completed"
    },
    {
      id: 3,
      type: "new_match",
      user: "Emma Wilson",
      skill: "Web Design",
      time: "2 days ago",
      status: "new"
    }
  ];

  const skillsOffered = ["React Development", "UI/UX Design", "JavaScript", "Python"];
  const skillsWanted = ["Spanish", "Photography", "Public Speaking"];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Welcome Header */}
        <div className="bg-gradient-primary rounded-xl p-8 text-primary-foreground animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, Alex!</h1>
              <p className="text-primary-foreground/80 text-lg">
                Ready to share your skills and learn something new?
              </p>
            </div>
            <div className="hidden md:block">
              <Avatar className="h-16 w-16 border-2 border-primary-foreground/20">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-primary-glow text-primary-foreground text-xl">
                  AC
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="hover:shadow-medium transition-all duration-300 animate-scale-in">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-primary rounded-lg">
                  <MessageSquare className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.totalSwaps}</p>
                  <p className="text-sm text-muted-foreground">Total Swaps</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-medium transition-all duration-300 animate-scale-in">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-accent rounded-lg">
                  <Clock className="h-6 w-6 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.pendingRequests}</p>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-medium transition-all duration-300 animate-scale-in">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-yellow-500 rounded-lg">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.rating}</p>
                  <p className="text-sm text-muted-foreground">Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-medium transition-all duration-300 animate-scale-in">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.profileViews}</p>
                  <p className="text-sm text-muted-foreground">Profile Views</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link to="/browse">
                <Button variant="outline" className="w-full justify-start h-12">
                  <Search className="h-5 w-5 mr-3" />
                  Browse Skills
                  <ArrowRight className="h-4 w-4 ml-auto" />
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="outline" className="w-full justify-start h-12">
                  <Plus className="h-5 w-5 mr-3" />
                  Add New Skill
                  <ArrowRight className="h-4 w-4 ml-auto" />
                </Button>
              </Link>
              <Link to="/swaps">
                <Button variant="outline" className="w-full justify-start h-12">
                  <MessageSquare className="h-5 w-5 mr-3" />
                  View Requests
                  <ArrowRight className="h-4 w-4 ml-auto" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* My Skills Summary */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>My Skills</CardTitle>
              <CardDescription>Your offered and wanted skills</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-3 text-foreground">Skills I Offer</h4>
                <div className="flex flex-wrap gap-2">
                  {skillsOffered.map((skill, index) => (
                    <Badge key={index} variant="default" className="bg-gradient-primary">
                      {skill}
                    </Badge>
                  ))}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 px-2"
                    onClick={() => console.log('Add new skill offered')}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add
                  </Button>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3 text-foreground">Skills I Want</h4>
                <div className="flex flex-wrap gap-2">
                  {skillsWanted.map((skill, index) => (
                    <Badge key={index} variant="outline" className="border-accent text-accent">
                      {skill}
                    </Badge>
                  ))}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 px-2"
                    onClick={() => console.log('Add new skill wanted')}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest skill swap interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                      {activity.user.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span> 
                      {activity.type === 'swap_request' && ' requested a swap for '}
                      {activity.type === 'swap_completed' && ' completed a swap for '}
                      {activity.type === 'new_match' && ' is a potential match for '}
                      <span className="font-medium text-primary">{activity.skill}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <Badge 
                    variant={activity.status === 'pending' ? 'secondary' : 
                            activity.status === 'completed' ? 'default' : 'outline'}
                    className={activity.status === 'completed' ? 'bg-green-100 text-green-700 border-green-200' : ''}
                  >
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;