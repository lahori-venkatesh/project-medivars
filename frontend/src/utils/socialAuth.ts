import { signInWithGoogle, signInWithFacebook } from './firebase';
import { User } from '../types';
import { toast } from 'sonner';

export const handleSocialLogin = async (provider: 'google' | 'facebook'): Promise<User | null> => {
  try {
    // Check if popups are blocked
    const popupTest = window.open('', '_blank');
    if (!popupTest || popupTest.closed || typeof popupTest.closed === 'undefined') {
      toast.error('Please enable popups for this website to sign in');
      return null;
    }
    popupTest.close();

    // Show loading toast
    const loadingToast = toast.loading(`Signing in with ${provider}...`);

    const result = provider === 'google' 
      ? await signInWithGoogle()
      : await signInWithFacebook();

    const user = result.user;
    
    // Create user object from social auth data
    const userData: User = {
      id: user.uid,
      name: user.displayName || '',
      email: user.email || '',
      mobile: user.phoneNumber || '',
      avatar: user.photoURL || undefined,
      favorites: []
    };

    // Store user data
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', await user.getIdToken());

    // Dismiss loading toast and show success
    toast.dismiss(loadingToast);
    toast.success(`Successfully signed in with ${provider}`);
    
    return userData;
  } catch (error: any) {
    // Handle specific error cases
    let errorMessage = `Failed to sign in with ${provider}`;
    
    if (error.code === 'auth/popup-blocked') {
      errorMessage = 'Please enable popups for this website to sign in';
    } else if (error.code === 'auth/popup-closed-by-user') {
      errorMessage = 'Sign in was cancelled';
    } else if (error.code === 'auth/account-exists-with-different-credential') {
      errorMessage = 'An account already exists with this email';
    }

    console.error(`${provider} sign-in error:`, error);
    toast.error(errorMessage);
    return null;
  }
};