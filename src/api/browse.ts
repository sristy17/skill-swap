import { supabase } from "@/helpers/supabase";

export async function fetchPublicProfiles() {
  const { data, error } = await supabase
    .from('profiles')
    .select('user_id, full_name, avatar_url, location, is_public, skills_offered, skills_wanted, availability')
    .eq('is_public', true);

  if (error) {
    console.error("Failed to fetch public profiles:", error);
    return { profiles: null, error };
  }

  const formattedProfiles = data.map(profile => ({
    id: profile.user_id,
    user: {
      name: profile.full_name || 'Anonymous',
      avatar: profile.avatar_url,
      location: profile.location,
      rating: 0,
      reviewCount: 0
    },
    skillsOffered: profile.skills_offered || [],
    skillsWanted: profile.skills_wanted || [],
    availability: profile.availability || [],
    isPublic: profile.is_public
  }));

  return { profiles: formattedProfiles, error: null };
}