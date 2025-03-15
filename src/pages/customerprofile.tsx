



import React, { useState, useEffect } from 'react';
import { useGetUserProfileQuery, useUpdateUserByIdMutation } from '../features/users/usersAPI';
import { Loader, Save, Edit, CheckCircle } from 'lucide-react';
import { jwtDecode as jwt_decode, JwtPayload } from 'jwt-decode';

// Extend the JwtPayload type to include user_id
interface CustomJwtPayload extends JwtPayload {
  user_id?: number; // Adjust the type based on your actual user ID type
}

const UserProfile: React.FC = () => {
  const { data, error, isLoading, refetch } = useGetUserProfileQuery([]);
  const [updateUserById, { isLoading: isUpdating, isSuccess }] = useUpdateUserByIdMutation();

  const [formData, setFormData] = useState({
    phone_number: '',
    address: '',
    preferred_language: '',
    company_name: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (data) {
      console.log('Fetched user data:', data); // Log the fetched user data
      setFormData({
        phone_number: data.phone_number || '',
        address: data.address || '',
        preferred_language: data.preferred_language || '',
        company_name: data.company_name || '',
      });
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      console.log('Form data updated:', updatedData); // Log the updated form data
      return updatedData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(formData).some(value => value === '')) {
      alert('Please fill in all fields before submitting.');
      return;
    }
    try {
      let userId = localStorage.getItem('userId');
      if (!userId) {
        const token = localStorage.getItem('token');
        if (token) {
          const decodedToken: CustomJwtPayload = jwt_decode(token);
          userId = decodedToken.user_id !== undefined ? decodedToken.user_id.toString() : null;

          if (userId) {
            localStorage.setItem('userId', userId);
          } else {
            console.error('User ID is undefined');
            return;
          }
        } else {
          console.error('Token not found in local storage');
          return;
        }
      }

      // Ensure the id is correctly passed in the payload
      await updateUserById({ userId: parseInt(userId), userUpdate: formData });
      console.log('Update payload:', { userId, userUpdate: formData }); // Log the payload
      setIsEditing(false);

      // Refetch the data after 2 seconds
      setTimeout(() => {
        refetch();
      }, 2000);
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader size={48} className="text-gray-700" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Failed to load profile.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Profile</h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-gray-700">Name</label>
            <input
              type="text"
              value={data?.name}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md bg-gray-100"
              disabled
            />
          </div>

          <div>
            <label className="text-gray-700">Email</label>
            <input
              type="email"
              value={data?.email}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md bg-gray-100"
              disabled
            />
          </div>

          <div>
            <label className="text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md"
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md"
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="text-gray-700">Preferred Language</label>
            <input
              type="text"
              name="preferred_language"
              value={formData.preferred_language}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md"
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="text-gray-700">Company Name</label>
            <input
              type="text"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md"
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="flex items-center justify-center bg-yellow-500 text-white p-3 rounded-md hover:bg-yellow-600 focus:outline-none"
            >
              <Edit size={18} className="mr-2" />
              Edit Profile
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex items-center justify-center bg-red-500 text-white p-3 rounded-md hover:bg-red-600 focus:outline-none"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isUpdating}
                className="flex items-center justify-center bg-green-600 text-white p-3 rounded-md hover:bg-green-700 focus:outline-none"
              >
                {isUpdating ? (
                  <span>Saving...</span>
                ) : (
                  <>
                    <Save size={18} className="mr-2" />
                    Save Changes
                  </>
                )}
              </button>
            </>
          )}
        </div>

        {isSuccess && (
          <div className="mt-4 text-green-600 flex items-center">
            <CheckCircle size={20} className="mr-2" />
            Profile updated successfully!
          </div>
        )}
      </form>
    </div>
  );
};

export default UserProfile;
