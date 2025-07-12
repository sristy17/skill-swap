import { useState, useEffect } from "react";
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
  Plus, 
  X, 
  Clock,
  Star,
  Eye,
  EyeOff
} from "lucide-react";
import { fetchProfile, updateProfile } from "@/api/profile";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();

  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [fullName, setFullName] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [skillsOffered, setSkillsOffered] = useState<string[]>([]);
  const [skillsWanted, setSkillsWanted] = useState<string[]>([]);
  const [newOfferedSkill, setNewOfferedSkill] = useState(""); // New state for Offered skills
  const [newWantedSkill, setNewWantedSkill] = useState("");   // New state for Wanted skills
  const [availability, setAvailability] = useState<string[]>([]);
  const [timezone, setTimezone] = useState("");
  const [notes, setNotes] = useState("");

  // Fetch profile data only after authentication is confirmed
  useEffect(() => {
    if (!isAuthenticated || authLoading) {
      // If not authenticated or still loading auth state, don't proceed
      return;
    }

    const getProfile = async () => {
      setIsLoading(true);
      const { profile, error } = await fetchProfile();
      if (error) {
        setError(error.message);
      } else if (profile) {
        setProfile(profile);
        setFullName(profile.full_name || "");
        setLocation(profile.location || "");
        setBio(profile.bio || "");
        setIsPublic(profile.is_public);
        setSkillsOffered(profile.skills_offered || []);
        setSkillsWanted(profile.skills_wanted || []);
        setAvailability(profile.availability || []);
        setTimezone(profile.timezone || "");
        setNotes(profile.availability_notes || "");
      }
      setIsLoading(false);
    };

    getProfile();
  }, [isAuthenticated, authLoading]);

  const addSkill = (type: 'offered' | 'wanted') => {
    if (type === 'offered' && newOfferedSkill.trim()) {
      setSkillsOffered([...skillsOffered, newOfferedSkill.trim()]);
      setNewOfferedSkill("");
    } else if (type === 'wanted' && newWantedSkill.trim()) {
      setSkillsWanted([...skillsWanted, newWantedSkill.trim()]);
      setNewWantedSkill("");
    }
  };

  const removeSkill = (skill: string, type: 'offered' | 'wanted') => {
    if (type === 'offered') {
      setSkillsOffered(skillsOffered.filter(s => s !== skill));
    } else {
      setSkillsWanted(skillsWanted.filter(s => s !== skill));
    }
  };

  const handleSave = async (tab: 'basic' | 'skills' | 'availability') => {
    setIsSaving(true);
    setError("");
    setSuccess("");

    let updateData = {};
    if (tab === 'basic') {
      updateData = { full_name: fullName, location, bio, is_public: isPublic };
    } else if (tab === 'skills') {
      updateData = { skills_offered: skillsOffered, skills_wanted: skillsWanted };
    } else if (tab === 'availability') {
      updateData = { availability, timezone, availability_notes: notes };
    }

    const { error } = await updateProfile(updateData);
    if (error) {
      setError(error.message);
    } else {
      setSuccess("Profile updated successfully!");
    }
    setIsSaving(false);
  };
  
  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <p className="text-xl text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <p className="text-xl text-red-500">You must be signed in to view this page.</p>
      </div>
    );
  }

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
          {success && <p className="text-sm text-green-500">{success}</p>}
          {error && <p className="text-sm text-red-500">{error}</p>}
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
                      {fullName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)}
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
                    <Input 
                      id="name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={user?.email || ""} disabled />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location (Optional)</Label>
                  <Input 
                    id="location" 
                    placeholder="e.g., San Francisco, CA"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio"
                    placeholder="Tell others about yourself and your interests..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
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
                  onClick={() => handleSave('basic')}
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
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
                    value={newOfferedSkill}
                    onChange={(e) => setNewOfferedSkill(e.target.value)}
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
                    value={newWantedSkill}
                    onChange={(e) => setNewWantedSkill(e.target.value)}
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
            
            {/* The new button to save skills */}
            <Button
                className="w-full"
                variant="default"
                onClick={() => handleSave('skills')}
                disabled={isSaving}
            >
                {isSaving ? 'Saving Skills...' : 'Save Skills'}
            </Button>

            <Card>
              <CardHeader>
                <CardTitle>Profile Statistics</CardTitle>
                <CardDescription>Your activity overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{profile?.rating}</div>
                    <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      Rating
                    </div>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{profile?.reviews_count}</div>
                    <div className="text-sm text-muted-foreground">Reviews</div>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{profile?.swaps_count}</div>
                    <div className="text-sm text-muted-foreground">Swaps</div>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{profile?.views_count}</div>
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
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    placeholder="Your timezone"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea 
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any specific availability notes or preferences..."
                    rows={3}
                  />
                </div>

                <Button 
                  className="w-full" 
                  variant="default"
                  onClick={() => handleSave('availability')}
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving...' : 'Save Availability'}
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