import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, GraduationCap, Award, Camera, Save } from 'lucide-react';

export function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@medivars.com',
    phone: '+1 (555) 123-4567',
    specialization: 'Cardiology',
    licenseNumber: 'MD123456789',
    experience: 12,
    bio: 'Experienced cardiologist with over 12 years of practice. Specialized in interventional cardiology and heart disease prevention.',
    education: [
      { degree: 'MD', institution: 'Harvard Medical School', year: 2010 },
      { degree: 'Residency', institution: 'Johns Hopkins Hospital', year: 2014 }
    ],
    certifications: ['Board Certified Cardiologist', 'ACLS Certified', 'BLS Certified'],
    languages: ['English', 'Spanish'],
    address: {
      street: '123 Medical Center Drive',
      city: 'Boston',
      state: 'MA',
      zipCode: '02115',
      country: 'USA'
    }
  });

  const handleInputChange = (field: string, value: any) => {
    setProfileData({ ...profileData, [field]: value });
  };

  const handleAddressChange = (field: string, value: string) => {
    setProfileData({
      ...profileData,
      address: { ...profileData.address, [field]: value }
    });
  };

  const handleSave = () => {
    // API call to save profile data
    console.log('Saving profile:', profileData);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          My Profile
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Manage your professional profile and account settings
        </p>
      </div>

      <div className="space-y-8">
        {/* Profile Picture & Basic Info */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-300 font-semibold text-2xl">
                  {profileData.firstName[0]}{profileData.lastName[0]}
                </span>
              </div>
              <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Dr. {profileData.firstName} {profileData.lastName}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">{profileData.specialization}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {profileData.experience} years of experience
              </p>
            </div>
            <div>
              {isEditing ? (
                <div className="flex space-x-3">
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                First Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              ) : (
                <p className="text-gray-900 dark:text-white">{profileData.firstName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Last Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              ) : (
                <p className="text-gray-900 dark:text-white">{profileData.lastName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <p className="text-gray-900 dark:text-white">{profileData.email}</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              ) : (
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <p className="text-gray-900 dark:text-white">{profileData.phone}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Professional Information */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Professional Information
          </h3>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Specialization
                </label>
                <div className="flex items-center space-x-2">
                  <GraduationCap className="h-4 w-4 text-gray-400" />
                  <p className="text-gray-900 dark:text-white">{profileData.specialization}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  License Number
                </label>
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4 text-gray-400" />
                  <p className="text-gray-900 dark:text-white">{profileData.licenseNumber}</p>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Bio
              </label>
              {isEditing ? (
                <textarea
                  value={profileData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              ) : (
                <p className="text-gray-900 dark:text-white">{profileData.bio}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Education
              </label>
              <div className="space-y-2">
                {profileData.education.map((edu, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <GraduationCap className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-900 dark:text-white">
                      {edu.degree} - {edu.institution} ({edu.year})
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Certifications
              </label>
              <div className="flex flex-wrap gap-2">
                {profileData.certifications.map((cert, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full text-sm"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Address
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Street Address
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.address.street}
                  onChange={(e) => handleAddressChange('street', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              ) : (
                <p className="text-gray-900 dark:text-white">{profileData.address.street}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                City
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.address.city}
                  onChange={(e) => handleAddressChange('city', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              ) : (
                <p className="text-gray-900 dark:text-white">{profileData.address.city}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                State
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.address.state}
                  onChange={(e) => handleAddressChange('state', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              ) : (
                <p className="text-gray-900 dark:text-white">{profileData.address.state}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}