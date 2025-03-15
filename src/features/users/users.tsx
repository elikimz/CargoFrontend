import React, { useState, useEffect } from 'react';
import {
  useGetAllUsersQuery,
  useUpdateUserByIdMutation,
  useDeleteUserByIdMutation,
} from '../users/usersAPI';

// Define the structure of a user
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  phone_number: string;
  address: string;
  preferred_language: string;
  company_name: string;
  is_active: boolean;
}

const UserManagement: React.FC = () => {
  const { data: allUsers, error: usersError, isLoading: isUsersLoading, refetch } = useGetAllUsersQuery([]);
  const [updateUserById] = useUpdateUserByIdMutation();
  const [deleteUserById] = useDeleteUserByIdMutation();

  const [userUpdate, setUserUpdate] = useState({
    phone_number: '',
    address: '',
    preferred_language: '',
    company_name: '',
  });

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  useEffect(() => {
    if (selectedUserId !== null && allUsers) {
      const selectedUser = allUsers.find((user: User) => user.id === selectedUserId);
      if (selectedUser) {
        setUserUpdate({
          phone_number: selectedUser.phone_number || '',
          address: selectedUser.address || '',
          preferred_language: selectedUser.preferred_language || '',
          company_name: selectedUser.company_name || '',
        });
      }
    }
  }, [selectedUserId, allUsers]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserUpdate((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateUser = async () => {
    if (selectedUserId !== null) {
      try {
        console.log('Updating user with ID:', selectedUserId, 'and data:', userUpdate);
        const result = await updateUserById({ userId: selectedUserId, userUpdate }).unwrap();
        console.log('User update result:', result);
        setNotification('User updated successfully!');
        setSelectedUserId(null); // Clear selection after update

        // Clear the form fields
        setUserUpdate({
          phone_number: '',
          address: '',
          preferred_language: '',
          company_name: '',
        });

        // Refetch data immediately to reflect changes
        refetch();
      } catch (error) {
        console.error('Failed to update user:', error);
        setNotification('Failed to update user.');
      }
    }
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      console.log('Deleting user with ID:', userId);
      const result = await deleteUserById(userId).unwrap();
      console.log('User delete result:', result);
      setNotification('User deleted successfully!');

      // Refetch data immediately to reflect changes
      refetch();
    } catch (error) {
      console.error('Failed to delete user:', error);
      setNotification('Failed to delete user.');
    }
  };

  if (isUsersLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (usersError) {
    return <div className="text-red-500">Error loading data</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      {notification && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{notification}</span>
        </div>
      )}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Update User</h2>
        <input
          type="text"
          name="phone_number"
          placeholder="Phone Number"
          value={userUpdate.phone_number}
          onChange={handleInputChange}
          className="border rounded px-3 py-2 w-full mb-2"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={userUpdate.address}
          onChange={handleInputChange}
          className="border rounded px-3 py-2 w-full mb-2"
        />
        <input
          type="text"
          name="preferred_language"
          placeholder="Preferred Language"
          value={userUpdate.preferred_language}
          onChange={handleInputChange}
          className="border rounded px-3 py-2 w-full mb-2"
        />
        <input
          type="text"
          name="company_name"
          placeholder="Company Name"
          value={userUpdate.company_name}
          onChange={handleInputChange}
          className="border rounded px-3 py-2 w-full mb-2"
        />
        <button
          onClick={handleUpdateUser}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update User
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">All Users</h2>
        <ul>
          {allUsers?.map((user: User) => (
            <li key={user.id} className="border-b py-2">
              <div>
                <strong>ID:</strong> {user.id}
              </div>
              <div>
                <strong>Name:</strong> {user.name}
              </div>
              <div>
                <strong>Email:</strong> {user.email}
              </div>
              <div>
                <strong>Role:</strong> {user.role}
              </div>
              <div>
                <strong>Phone Number:</strong> {user.phone_number}
              </div>
              <div>
                <strong>Address:</strong> {user.address}
              </div>
              <div>
                <strong>Preferred Language:</strong> {user.preferred_language}
              </div>
              <div>
                <strong>Company Name:</strong> {user.company_name}
              </div>
              <div>
                <strong>Active:</strong> {user.is_active ? 'Yes' : 'No'}
              </div>
              <button
                onClick={() => setSelectedUserId(user.id)}
                className="bg-yellow-500 text-white px-2 py-1 rounded ml-2 hover:bg-yellow-600"
              >
                Update
              </button>
              <button
                onClick={() => handleDeleteUser(user.id)}
                className="bg-red-500 text-white px-2 py-1 rounded ml-2 hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserManagement;
