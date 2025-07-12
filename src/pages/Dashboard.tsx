import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { fetchProfile } from "@/api/profile"; 
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MessageSquare,
  Star,
  TrendingUp,
  Clock,
  Plus,
  Search,
  ArrowRight,
} from "lucide-react";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const { isAuthenticated, user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  // State to hold the fetched profile data
  const [profileData, setProfileData] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);

  // Fetch the profile data when the user is authenticated
  useEffect(() => {
    const getProfile = async () => {
      setProfileLoading(true);
      if (isAuthenticated) {
        const { profile } = await fetchProfile();
        if (profile) {
          setProfileData(profile);
        }
      }
      setProfileLoading(false);
    };

    getProfile();
  }, [isAuthenticated]);

  // Show a loading state while the context is checking the session or fetching profile
  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <p className="text-xl text-muted-foreground">Loading dashboard...</p>
      </div>
    );
  }

  // --- Sample/Fallback Data ---
  // Note: Recent activity is not part of the profile table, so we will keep it as sample data.
  const stats = {
    totalSwaps: profileData?.swaps_count || 0,
    pendingRequests: 0, // This data is not available in the provided profile table
    rating: profileData?.rating || 0,
    profileViews: profileData?.views_count || 0,
  };

  const recentActivity = [
    {
      id: 1,
      type: "swap_request",
      user: "Sarah Chen",
      skill: "Photoshop",
      time: "2 hours ago",
      status: "pending",
    },
    {
      id: 2,
      type: "swap_completed",
      user: "Mike Johnson",
      skill: "Spanish Tutoring",
      time: "1 day ago",
      status: "completed",
    },
    {
      id: 3,
      type: "new_match",
      user: "Emma Wilson",
      skill: "Web Design",
      time: "2 days ago",
      status: "new",
    },
  ];

  // Authenticated Dashboard View
  const AuthenticatedDashboard = () => {
    const userName = profileData?.full_name || user?.email.split("@")[0] || "User";
    const userInitials = userName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);

    return (
      <>
        {/* Welcome Header */}
        <div className="bg-gradient-primary rounded-xl p-8 text-primary-foreground animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {userName}!
              </h1>
              <p className="text-primary-foreground/80 text-lg">
                Ready to share your skills and learn something new?
              </p>
            </div>
            <div className="hidden md:block">
              <Avatar className="h-16 w-16 border-2 border-primary-foreground/20">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-primary-glow text-primary-foreground text-xl">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

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
              <h4 className="font-medium mb-3 text-foreground">
                Skills I Offer
              </h4>
              <div className="flex flex-wrap gap-2">
                {profileData?.skills_offered?.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="default"
                    className="bg-gradient-primary"
                  >
                    {skill}
                  </Badge>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2"
                  onClick={() => navigate("/profile")}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3 text-foreground">
                Skills I Want
              </h4>
              <div className="flex flex-wrap gap-2">
                {profileData?.skills_wanted?.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="border-accent text-accent"
                  >
                    {skill}
                  </Badge>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2"
                  onClick={() => navigate("/profile")}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </>
    );
  };

  // Unauthenticated (Public) Dashboard View
  const PublicDashboard = () => (
    <>
      {/* Welcome Header */}
      <div className="bg-gradient-primary rounded-xl p-8 text-primary-foreground animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Explore SkillSwap</h1>
            <p className="text-primary-foreground/80 text-lg">
              Sign up to start sharing your skills and learning from others.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="outline" size="lg" className="text-black">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="accent" size="lg">Join Now</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Actions (Public) */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Get Started</CardTitle>
          <CardDescription>
            Ready to find a skill? Browse our community!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Link to="/browse">
            <Button variant="outline" className="w-full justify-start h-12">
              <Search className="h-5 w-5 mr-3" />
              Browse Skills
              <ArrowRight className="h-4 w-4 ml-auto" />
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="accent" className="w-full justify-start h-12">
              <Plus className="h-5 w-5 mr-3" />
              Create Your Profile
              <ArrowRight className="h-4 w-4 ml-auto" />
            </Button>
          </Link>
        </CardContent>
      </Card>
      
      {/* Skills Summary (Public) */}
      <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Popular Skills</CardTitle>
            <CardDescription>Skills our community offers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-medium mb-3 text-foreground">
                Trending Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {/* Fallback to hardcoded skills for unauthenticated users */}
                {["React Development", "UI/UX Design", "JavaScript", "Python"].map((skill, index) => (
                  <Badge
                    key={index}
                    variant="default"
                    className="bg-gradient-primary"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3 text-foreground">
                Skills in Demand
              </h4>
              <div className="flex flex-wrap gap-2">
                {["Spanish", "Photography", "Public Speaking"].map((skill, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="border-accent text-accent"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {isAuthenticated ? <AuthenticatedDashboard /> : <PublicDashboard />}

        {/* Quick Stats (common to both dashboards) */}
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

        {/* Recent Activity (common to both dashboards) */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your latest skill swap interactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                      {activity.user
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span>
                      {activity.type === "swap_request" &&
                        " requested a swap for "}
                      {activity.type === "swap_completed" &&
                        " completed a swap for "}
                      {activity.type === "new_match" &&
                        " is a potential match for "}
                      <span className="font-medium text-primary">
                        {activity.skill}
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                  <Badge
                    variant={
                      activity.status === "pending"
                        ? "secondary"
                        : activity.status === "completed"
                        ? "default"
                        : "outline"
                    }
                    className={
                      activity.status === "completed"
                        ? "bg-green-100 text-green-700 border-green-200"
                        : ""
                    }
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