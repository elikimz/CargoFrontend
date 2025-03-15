import React, { useState, useEffect } from "react";
import {
  useGetAllNotificationsQuery,
  
  useCreateNotificationMutation,
  useDeleteNotificationMutation,
} from "../notifications/notificationAPI"; // Adjust the import path as necessary

// Define the structure of a notification item
interface Notification {
  id?: number;
  user_id: number;
  message: string;
  sent_at?: string;
}

const NotificationManagement: React.FC = () => {
  const [notificationList, setNotificationList] = useState<Notification[]>([]);
  const [formData, setFormData] = useState<Omit<Notification, "id" | "sent_at">>({
    user_id: 0,
    message: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  // Fetch all notifications data
  const { data: allNotifications, refetch: refetchNotifications, isLoading, isError } = useGetAllNotificationsQuery([]);

  useEffect(() => {
    if (allNotifications) {
      setNotificationList(allNotifications);
      console.log("Fetched notifications data:", allNotifications);
    }
  }, [allNotifications]);

  // Create a new notification entry
  const [createNotification] = useCreateNotificationMutation();
  const handleCreateNotification = async () => {
    try {
      console.log("Creating notification with data:", formData);
      await createNotification(formData).unwrap();
      console.log("Notification created successfully");
      refetchNotifications();
      setFormData({
        user_id: 0,
        message: "",
      });
      setErrorMessage("");
      setSuccessMessage("Notification created successfully!");
    } catch (error) {
      console.error("Failed to create notification:", error);
      setErrorMessage("Failed to create notification. Please try again.");
    }
  };

  // Delete a notification entry
  const [deleteNotification] = useDeleteNotificationMutation();
  const handleDeleteNotification = async (id: number) => {
    try {
      console.log("Deleting notification with ID:", id);
      await deleteNotification(id).unwrap();
      console.log("Notification deleted successfully");
      refetchNotifications();
    } catch (error) {
      console.error("Failed to delete notification:", error);
      setErrorMessage("Failed to delete notification. Please try again.");
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Log loading and error states
  useEffect(() => {
    if (isLoading) {
      console.log("Loading notifications data...");
    }
    if (isError) {
      console.error("Error loading notifications data");
      setErrorMessage("Error loading notifications data. Please try again.");
    }
  }, [isLoading, isError]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Notification Management</h1>

      {isLoading && <div className="text-center text-gray-500">Loading...</div>}
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
      {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}

      {/* Form for creating notifications */}
      <form className="mb-6">
        <div className="mb-4">
          <label className="block text-gray-700">User ID</label>
          <input
            type="number"
            name="user_id"
            value={formData.user_id}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={handleCreateNotification}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Create Notification
          </button>
        </div>
      </form>

      {/* List of notifications */}
      <div>
        <h2 className="text-xl font-bold mb-2">Notification List</h2>
        <ul>
          {notificationList.map((notification) => (
            <li key={notification.id} className="border p-4 mb-2 rounded">
              <div>
                <strong>User ID:</strong> {notification.user_id}
              </div>
              <div>
                <strong>Message:</strong> {notification.message}
              </div>
              <div>
                <strong>Sent At:</strong> {notification.sent_at}
              </div>
              <button
                onClick={() => handleDeleteNotification(notification.id!)}
                className="text-red-500"
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

export default NotificationManagement;
