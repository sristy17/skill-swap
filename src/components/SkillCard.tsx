import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Clock, Star, MessageSquare } from "lucide-react";

interface SkillCardProps {
  user: {
    name: string;
    avatar?: string;
    location?: string;
    rating: number;
    reviewCount: number;
  };
  skillsOffered: string[];
  skillsWanted: string[];
  availability: string[];
  isPublic: boolean;
}

const SkillCard = ({ user, skillsOffered, skillsWanted, availability, isPublic }: SkillCardProps) => {
  if (!isPublic) return null;

  return (
    <Card className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-1 animate-fade-in">
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="bg-gradient-primary text-primary-foreground">
              {user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-foreground truncate">
              {user.name}
            </h3>
            {user.location && (
              <div className="flex items-center gap-1 text-muted-foreground text-sm">
                <MapPin className="h-4 w-4" />
                {user.location}
              </div>
            )}
            <div className="flex items-center gap-1 mt-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{user.rating}</span>
              <span className="text-sm text-muted-foreground">({user.reviewCount})</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Skills Offered */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-2">Skills Offered</h4>
          <div className="flex flex-wrap gap-2">
            {skillsOffered.slice(0, 3).map((skill, index) => (
              <Badge key={index} variant="default" className="bg-gradient-primary">
                {skill}
              </Badge>
            ))}
            {skillsOffered.length > 3 && (
              <Badge variant="secondary">+{skillsOffered.length - 3} more</Badge>
            )}
          </div>
        </div>

        {/* Skills Wanted */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-2">Looking For</h4>
          <div className="flex flex-wrap gap-2">
            {skillsWanted.slice(0, 3).map((skill, index) => (
              <Badge key={index} variant="outline" className="border-accent text-accent">
                {skill}
              </Badge>
            ))}
            {skillsWanted.length > 3 && (
              <Badge variant="secondary">+{skillsWanted.length - 3} more</Badge>
            )}
          </div>
        </div>

        {/* Availability */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-2">Available</h4>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {availability.join(", ")}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <div className="flex gap-2 w-full">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => console.log(`View profile of ${user.name}`)}
          >
            View Profile
          </Button>
          <Button 
            variant="accent" 
            className="flex-1"
            onClick={() => console.log(`Request swap with ${user.name}`)}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Request Swap
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SkillCard;