import api from '../lib/api';

/**
 * SIH 25199 Enterprise Portal
 * User Profiling & Identity Service
 * Target Release: May 18
 */

export interface SocialLinks {
  linkedin?: string;
  github?: string;
  twitter?: string;
  portfolio?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  bio?: string;
  phoneNumber?: string;
  organization?: string;
  designation?: string;
  location?: string;
  skills: string[];
  socialLinks?: SocialLinks;
  avatarUrl?: string;
  isProfileComplete: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileUpdatePayload {
  firstName?: string;
  lastName?: string;
  bio?: string;
  phoneNumber?: string;
  organization?: string;
  designation?: string;
  location?: string;
  skills?: string[];
  socialLinks?: SocialLinks;
}

/**
 * Profiling Service
 * 
 * Manages the synchronization of user identity and professional data 
 * for the SIH 25199 backend infrastructure.
 */
const profilingService = {
  /**
   * Fetch current session user profile
   */
  getCurrentProfile: async (): Promise<UserProfile> => {
    const { data } = await api.get<UserProfile>('/users/me/profile');
    return data;
  },

  /**
   * Update profile details
   * Supports partial updates (PATCH)
   */
  updateProfile: async (payload: ProfileUpdatePayload): Promise<UserProfile> => {
    const { data } = await api.patch<UserProfile>('/users/me/profile', payload);
    return data;
  },

  /**
   * Create/Initialize profile for new users during onboarding
   */
  initializeProfile: async (payload: ProfileUpdatePayload): Promise<UserProfile> => {
    const { data } = await api.post<UserProfile>('/users/me/profile', payload);
    return data;
  },

  /**
   * Profile Avatar Upload
   * Uses FormData for binary transmission of image assets
   */
  uploadAvatar: async (file: File): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append('avatar', file);

    const { data } = await api.post<{ url: string }>('/users/me/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },

  /**
   * Check profile completion status for system routing guards
   */
  getCompletionStatus: async (): Promise<{ isComplete: boolean; missingFields: string[] }> => {
    const { data } = await api.get<{ isComplete: boolean; missingFields: string[] }>(
      '/users/me/profile/status'
    );
    return data;
  },

  /**
   * Public Profile Access
   * Used for the internal directory listing and team management
   */
  getPublicProfile: async (userId: string): Promise<UserProfile> => {
    const { data } = await api.get<UserProfile>(`/users/profiles/${userId}`);
    return data;
  }
};

export default profilingService;