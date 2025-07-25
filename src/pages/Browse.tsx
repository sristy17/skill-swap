import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SkillCard from "@/components/SkillCard";
import { Search, Filter, MapPin, Clock, Loader2 } from "lucide-react";
import { fetchPublicProfiles } from "@/api/browse";

const Browse = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedSkill, setSelectedSkill] = useState("all");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProfiles = async () => {
      setIsLoading(true);
      const { profiles, error } = await fetchPublicProfiles();
      if (error) {
        setError(error);
      } else {
        setUsers(profiles);
      }
      setIsLoading(false);
    };

    getProfiles();
  }, []);

  // Your filter logic remains the same, but now it operates on the fetched data
  const filteredUsers = users.filter(user => {
    const matchesSearch = searchQuery === "" || 
      user.skillsOffered.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
      user.skillsWanted.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
      user.user.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLocation = selectedLocation === "all" || user.user.location === selectedLocation;
    const matchesSkill = selectedSkill === "all" || 
      user.skillsOffered.some(skill => skill === selectedSkill) ||
      user.skillsWanted.some(skill => skill === selectedSkill);
    
    return matchesSearch && matchesLocation && matchesSkill;
  });

  const popularSkills = [
    "React Development", "Photoshop", "Spanish", "Photography", "UI/UX Design",
    "Python", "Marketing", "Public Speaking", "Data Analysis", "Video Editing"
  ];

  const locations = ["San Francisco, CA", "New York, NY", "Los Angeles, CA", "Seattle, WA", "Austin, TX"];
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
        <p className="text-xl text-muted-foreground ml-4">Loading profiles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <p className="text-xl text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Discover Amazing Skills
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with talented individuals in your area and start swapping skills today
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Find Your Perfect Skill Match
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search skills, people, or expertise..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12"
                />
              </div>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-full md:w-48 h-12">
                  <MapPin className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                <SelectTrigger className="w-full md:w-48 h-12">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Skill Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Skills</SelectItem>
                  {popularSkills.map(skill => (
                    <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Popular Skills */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-3">Popular Skills</h3>
              <div className="flex flex-wrap gap-2">
                {popularSkills.slice(0, 8).map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => setSelectedSkill(skill)}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">
              {filteredUsers.length} {filteredUsers.length === 1 ? 'Person' : 'People'} Found
            </h2>
            <Select defaultValue="rating">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="reviews">Most Reviews</SelectItem>
                <SelectItem value="recent">Recently Active</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredUsers.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No matches found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria or browse all skills
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedLocation("all");
                    setSelectedSkill("all");
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map((userData) => (
                <SkillCard
                  key={userData.id}
                  user={userData.user}
                  skillsOffered={userData.skillsOffered}
                  skillsWanted={userData.skillsWanted}
                  availability={userData.availability}
                  isPublic={userData.isPublic}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Browse;