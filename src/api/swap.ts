import { supabase } from "@/helpers/supabase";

// A type definition for a swap request, including partner's profile
type SwapWithPartner = {
  id: string;
  requester_id: string;
  accepter_id: string;
  skill_offered: string;
  skill_wanted: string;
  message: string;
  status: 'pending' | 'active' | 'completed' | 'declined' | 'canceled';
  start_date: string | null;
  completed_date: string | null;
  rating: number | null;
  feedback: string | null;
  created_at: string;
  // Partner's profile details
  partner: {
    full_name: string;
    avatar_url: string;
    // Add other relevant profile fields here
  };
};

/**
 * Fetches all swaps for the current user.
 * The user ID is retrieved from localStorage.
 */
export const fetchUserSwaps = async () => {
  const userId = localStorage.getItem("user_session_id");

  if (!userId) {
    return { data: null, error: new Error("User not authenticated.") };
  }

  const { data, error } = await supabase
    .from('swaps')
    .select(`
      *,
      partner_profile:accepter_id (full_name, avatar_url),
      requester_profile:requester_id (full_name, avatar_url)
    `)
    .or(`requester_id.eq.${userId},accepter_id.eq.${userId}`)
    .order('created_at', { ascending: false });

  if (error) {
    return { data: null, error };
  }

  // Map the data to a more usable format, determining who the 'partner' is
  const formattedSwaps = data.map((swap) => {
    const isRequester = swap.requester_id === userId;
    const partner = isRequester ? swap.partner_profile : swap.requester_profile;

    return {
      ...swap,
      partner: {
        full_name: partner?.full_name || 'N/A',
        avatar_url: partner?.avatar_url || 'N/A',
      },
      type: isRequester ? 'outgoing' : 'incoming'
    };
  });

  return { data: formattedSwaps, error: null };
};

/**
 * Accepts a pending swap request.
 * The user ID is retrieved from localStorage for security validation.
 */
export const acceptSwap = async (swapId: string) => {
  const userId = localStorage.getItem("user_session_id");

  if (!userId) {
    return { data: null, error: new Error("User not authenticated.") };
  }
  
  const { data, error } = await supabase
    .from('swaps')
    .update({ status: 'active', start_date: new Date().toISOString() })
    .eq('id', swapId)
    .eq('accepter_id', userId); // Security check

  return { data, error };
};

/**
 * Declines a pending swap request.
 * The user ID is retrieved from localStorage for security validation.
 */
export const declineSwap = async (swapId: string) => {
  const userId = localStorage.getItem("user_session_id");

  if (!userId) {
    return { data: null, error: new Error("User not authenticated.") };
  }

  const { data, error } = await supabase
    .from('swaps')
    .update({ status: 'declined' })
    .eq('id', swapId)
    .eq('accepter_id', userId); // Security check

  return { data, error };
};

/**
 * Cancels an outgoing pending request.
 * The user ID is retrieved from localStorage for security validation.
 */
export const cancelSwap = async (swapId: string) => {
  const userId = localStorage.getItem("user_session_id");

  if (!userId) {
    return { data: null, error: new Error("User not authenticated.") };
  }
  
  const { data, error } = await supabase
    .from('swaps')
    .update({ status: 'canceled' })
    .eq('id', swapId)
    .eq('requester_id', userId); // Security check

  return { data, error };
};

/**
 * Marks a swap as completed and adds a rating and feedback.
 * The user ID is retrieved from localStorage for security validation.
 */
export const completeSwap = async (swapId: string, rating: number, feedback: string) => {
  const userId = localStorage.getItem("user_session_id");

  if (!userId) {
    return { data: null, error: new Error("User not authenticated.") };
  }

  const { data, error } = await supabase
    .from('swaps')
    .update({ 
      status: 'completed', 
      completed_date: new Date().toISOString(),
      rating,
      feedback
    })
    .eq('id', swapId)
    .or(`requester_id.eq.${userId},accepter_id.eq.${userId}`); // Security check

  return { data, error };
};