import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  MapPin, 
  Mail, 
  Plus, 
  X, 
  Clock,
  Star,
  Eye,
  EyeOff
} from "lucide-react";

const Profile = () => {
  const [isPublic, setIsPublic] = useState(true);
  const [skillsOffered, setSkillsOffered] = useState([
    "React Development", "UI/UX Design", "JavaScript", "Python"
  ]);
  const [skillsWanted, setSkillsWanted] = useState([
    "Spanish", "Photography", "Public Speaking"
  ]);
  const [newSkill, setNewSkill] = useState("");
  const [availability, setAvailability] = useState(["Weekends", "Evenings"]);

  const addSkill = (type: 'offered' | 'wanted') => {
    if (newSkill.trim()) {
      if (type === 'offered') {
        setSkillsOffered([...skillsOffered, newSkill.trim()]);
      } else {
        setSkillsWanted([...skillsWanted, newSkill.trim()]);
      }
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string, type: 'offered' | 'wanted') => {
    if (type === 'offered') {
      setSkillsOffered(skillsOffered.filter(s => s !== skill));
    } else {
      setSkillsWanted(skillsWanted.filter(s => s !== skill));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            My Profile
          </h1>
          <p className="text-xl text-muted-foreground">
            Manage your skills and profile information
          </p>
        </div>

        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Basic Information
                </CardTitle>
                <CardDescription>
                  Your profile information that others can see
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground text-2xl">
                      AC
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline">Upload Photo</Button>
                    <p className="text-xs text-muted-foreground">
                      JPG, PNG or GIF (max. 2MB)
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="Alex Chen" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="alex@example.com" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location (Optional)</Label>
                  <Input 
                    id="location" 
                    placeholder="e.g., San Francisco, CA"
                    defaultValue="San Francisco, CA"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio"
                    placeholder="Tell others about yourself and your interests..."
                    defaultValue="Passionate developer and designer with 5+ years of experience. Love learning new technologies and sharing knowledge with others!"
                    rows={4}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {isPublic ? (
                        <Eye className="h-4 w-4 text-green-600" />
                      ) : (
                        <EyeOff className="h-4 w-4 text-orange-600" />
                      )}
                      <span className="font-medium">
                        Profile Visibility
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {isPublic 
                        ? "Your profile is public and visible to all users"
                        : "Your profile is private and only visible to you"
                      }
                    </p>
                  </div>
                  <Switch 
                    checked={isPublic}
                    onCheckedChange={setIsPublic}
                  />
                </div>

                <Button 
                  className="w-full" 
                  variant="default"
                  onClick={() => console.log('Profile changes saved')}
                >
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Skills Offered */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-primary">Skills I Offer</CardTitle>
                  <CardDescription>
                    Skills you can teach or share with others
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {skillsOffered.map((skill, index) => (
                      <Badge 
                        key={index} 
                        variant="default" 
                        className="bg-gradient-primary flex items-center gap-1"
                      >
                        {skill}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 p-0 hover:bg-primary-foreground/20"
                          onClick={() => removeSkill(skill, 'offered')}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Add a new skill..."
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addSkill('offered')}
                    />
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => addSkill('offered')}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Skills Wanted */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-accent">Skills I Want</CardTitle>
                  <CardDescription>
                    Skills you want to learn from others
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {skillsWanted.map((skill, index) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className="border-accent text-accent flex items-center gap-1"
                      >
                        {skill}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 p-0 hover:bg-accent/20"
                          onClick={() => removeSkill(skill, 'wanted')}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Add a skill you want to learn..."
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addSkill('wanted')}
                    />
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => addSkill('wanted')}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Profile Statistics</CardTitle>
                <CardDescription>Your activity overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-primary">4.8</div>
                    <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      Rating
                    </div>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-primary">23</div>
                    <div className="text-sm text-muted-foreground">Reviews</div>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-primary">12</div>
                    <div className="text-sm text-muted-foreground">Swaps</div>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-primary">156</div>
                    <div className="text-sm text-muted-foreground">Views</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="availability" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Availability
                </CardTitle>
                <CardDescription>
                  When are you available for skill swaps?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {['Weekday Mornings', 'Weekday Afternoons', 'Weekday Evenings', 'Weekends', 'Flexible'].map((time) => (
                    <div key={time} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={time}
                        checked={availability.includes(time)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setAvailability([...availability, time]);
                          } else {
                            setAvailability(availability.filter(a => a !== time));
                          }
                        }}
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor={time}>{time}</Label>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Input 
                    id="timezone"
                    defaultValue="Pacific Time (PT)"
                    placeholder="Your timezone"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea 
                    id="notes"
                    placeholder="Any specific availability notes or preferences..."
                    rows={3}
                  />
                </div>

                <Button 
                  className="w-full" 
                  variant="default"
                  onClick={() => console.log('Availability saved', availability)}
                >
                  Save Availability
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;