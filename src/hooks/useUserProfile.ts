
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface UserProfile {
  id: string;
  user_id: string;
  display_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  location: string | null;
  profession: string | null;
  experience_years: number | null;
  profile_type: 'lender' | 'borrower';
  verification_status: string | null;
  success_rate: number | null;
  total_funded: number | null;
  total_borrowed: number | null;
  created_at: string;
  updated_at: string;
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
      
      // Properly transform the data to match our interface
      const transformedProfile: UserProfile | null = data ? {
        id: data.id,
        user_id: data.user_id,
        display_name: data.display_name,
        bio: data.bio,
        avatar_url: data.avatar_url,
        location: data.location,
        profession: data.profession,
        experience_years: data.experience_years,
        profile_type: data.profile_type as 'lender' | 'borrower',
        verification_status: data.verification_status,
        success_rate: data.success_rate,
        total_funded: data.total_funded,
        total_borrowed: data.total_borrowed,
        created_at: data.created_at,
        updated_at: data.updated_at
      } : null;
      
      setProfile(transformedProfile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const createProfile = async (profileData: {
    display_name: string;
    profile_type: 'lender' | 'borrower';
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
      console.error('Error creating user profile:', error);
      throw error;
    }
  };

  return {
    profile,
    loading,
    createProfile,
    fetchProfile
  };
};
