
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface UserProfile {
  id: string;
  user_id: string;
  profile_type: 'lender' | 'borrower';
  display_name: string | null;
  bio: string | null;
  location: string | null;
  profession: string | null;
  experience_years: number | null;
  total_funded: number | null;
  total_borrowed: number | null;
  success_rate: number | null;
  avatar_url: string | null;
  verification_status: string | null;
}

export const useUserProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const createProfile = async (profileData: {
    profile_type: 'lender' | 'borrower';
    display_name?: string;
    bio?: string;
    location?: string;
    profession?: string;
    experience_years?: number;
  }) => {
    try {
      const { error } = await supabase
        .from('user_profiles')
        .insert({
          user_id: user?.id,
          ...profileData
        });

      if (error) throw error;
      await fetchProfile();
    } catch (error) {
      console.error('Error creating profile:', error);
      throw error;
    }
  };

  const updateProfile = async (profileData: Partial<UserProfile>) => {
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update(profileData)
        .eq('user_id', user?.id);

      if (error) throw error;
      await fetchProfile();
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  return {
    profile,
    loading,
    createProfile,
    updateProfile,
    fetchProfile
  };
};
