import { getUser, updateUser } from './auth';
import { toast } from 'sonner';

export const toggleFavoriteDoctor = (doctorId: string): boolean => {
  const user = getUser();
  if (!user) {
    toast.error('Please sign in to like doctors');
    return false;
  }

  const favorites = user.favorites || [];
  const isLiked = favorites.includes(doctorId);
  
  const updatedFavorites = isLiked
    ? favorites.filter(id => id !== doctorId)
    : [...favorites, doctorId];

  const updatedUser = updateUser({ favorites: updatedFavorites });
  
  if (updatedUser) {
    toast.success(isLiked ? 'Removed from liked doctors' : 'Added to liked doctors');
    return !isLiked;
  }

  return isLiked;
};

export const isDocktorLiked = (doctorId: string): boolean => {
  try {
    const user = getUser();
    if (!user?.favorites) return false;
    return user.favorites.includes(doctorId);
  } catch (error) {
    console.error('Error checking if doctor is liked:', error);
    return false;
  }
};