import React, { useState, useRef } from 'react';
import { getUser, updateUser } from '../utils/auth';
import { toast } from 'sonner';
import { Camera, Pencil, User, Upload, FileText, X, MapPin } from 'lucide-react';

const healthInterestOptions = [
  'Diabetes',
  'Heart Disease',
  'Hypertension',
  'Asthma',
  'Arthritis',
  'Skin Issues',
  'Mental Health',
  'Weight Management',
  'Women\'s Health',
  'Men\'s Health',
  'Child Health',
  'Elder Care'
];

export function ProfileSettingsPage() {
  const user = getUser();
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const medicalFileInputRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    mobile: user?.mobile || '',
    avatar: user?.avatar || '',
    age: user?.age || '',
    gender: user?.gender || 'male',
    address: user?.address || '',
    healthInterests: user?.healthInterests || [],
    medicalHistory: user?.medicalHistory || []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      updateUser({ ...user, ...profile });
      setIsEditing(false);
      toast.success('Profile updated successfully');
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfile({ ...profile, avatar: reader.result as string });
        };
        reader.readAsDataURL(file);
      } else {
        toast.error('Please select an image file');
      }
    }
  };

  const handleMedicalFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setProfile(prev => ({
      ...prev,
      medicalHistory: [...prev.medicalHistory, ...files]
    }));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Profile Settings</h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
        >
          <Pencil className="w-4 h-4" />
          {isEditing ? 'Cancel Editing' : 'Edit Profile'}
        </button>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        {/* Profile Header with Avatar */}
        <div className="relative h-32 bg-gradient-to-r from-blue-500 to-blue-600">
          <div className="absolute -bottom-12 left-8">
            <div className="relative">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  <User className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                </div>
              )}
              {isEditing && (
                <button
                  onClick={handleAvatarClick}
                  className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors"
                >
                  <Camera className="w-4 h-4" />
                </button>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>
        </div>

        <div className="pt-16 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 dark:disabled:bg-gray-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Age
                </label>
                <input
                  type="number"
                  value={profile.age}
                  onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 dark:disabled:bg-gray-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Gender
              </label>
              <div className="flex gap-4">
                {['male', 'female', 'other'].map((gender) => (
                  <label key={gender} className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value={gender}
                      checked={profile.gender === gender}
                      onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                      disabled={!isEditing}
                      className="mr-2"
                    />
                    <span className="capitalize">{gender}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 dark:disabled:bg-gray-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  value={profile.mobile}
                  onChange={(e) => setProfile({ ...profile, mobile: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 dark:disabled:bg-gray-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Address
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400" />
                <textarea
                  value={profile.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  disabled={!isEditing}
                  rows={3}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 dark:disabled:bg-gray-800"
                />
              </div>
            </div>

            {/* Health Interests */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Health Interests
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {healthInterestOptions.map((interest) => (
                  <label
                    key={interest}
                    className={`
                      flex items-center p-3 border rounded-lg cursor-pointer transition-colors
                      ${!isEditing && 'cursor-default'}
                      ${profile.healthInterests.includes(interest)
                        ? 'bg-blue-50 border-blue-500 dark:bg-blue-900/50 dark:border-blue-400'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                      }
                    `}
                  >
                    <input
                      type="checkbox"
                      checked={profile.healthInterests.includes(interest)}
                      onChange={(e) => {
                        if (!isEditing) return;
                        if (e.target.checked) {
                          setProfile({
                            ...profile,
                            healthInterests: [...profile.healthInterests, interest]
                          });
                        } else {
                          setProfile({
                            ...profile,
                            healthInterests: profile.healthInterests.filter(i => i !== interest)
                          });
                        }
                      }}
                      disabled={!isEditing}
                      className="hidden"
                    />
                    <span className="text-sm">{interest}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Medical History */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Medical History
              </label>
              {isEditing && (
                <div className="border-2 border-dashed rounded-lg p-6 text-center mb-4">
                  <input
                    type="file"
                    ref={medicalFileInputRef}
                    className="hidden"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleMedicalFileUpload}
                  />
                  <button
                    type="button"
                    onClick={() => medicalFileInputRef.current?.click()}
                    className="flex flex-col items-center cursor-pointer w-full"
                  >
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      Upload medical records
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      PDF, JPG, PNG up to 10MB each
                    </span>
                  </button>
                </div>
              )}

              {profile.medicalHistory.length > 0 && (
                <div className="space-y-2">
                  {profile.medicalHistory.map((file: any, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="text-sm">{file.name}</span>
                      </div>
                      {isEditing && (
                        <button
                          type="button"
                          onClick={() => {
                            setProfile({
                              ...profile,
                              medicalHistory: profile.medicalHistory.filter((_, i) => i !== index)
                            });
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {isEditing && (
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}