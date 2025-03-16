import { useState } from "react";
import {
  useGetUserNotificationsQuery,
  useMarkNotificationAsReadMutation,
  useDeleteNotificationMutation
} from "../features/notifications/notificationAPI";
import { formatDistanceToNow } from "date-fns";

const NotificationsPage = () => {
  const { data: notifications, error, isLoading } = useGetUserNotificationsQuery([]);
  const [markAsRead] = useMarkNotificationAsReadMutation();
  const [deleteNotification] = useDeleteNotificationMutation();
  const [expandedNotificationId, setExpandedNotificationId] = useState<number | null>(null);

  const handleToggleNotification = async (notificationId: number) => {
    if (expandedNotificationId === notificationId) {
      // If already expanded, just collapse it
      setExpandedNotificationId(null);
    } else {
      // Otherwise, expand it and mark as read
      setExpandedNotificationId(notificationId);
      await markAsRead(notificationId);
    }
  };

  const handleDeleteNotification = async (notificationId: number) => {
    await deleteNotification(notificationId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Loading...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Error loading notifications</h2>
          {'message' in error && <p className="text-red-500">{error.message}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 py-8">
      <div className="w-full max-w-2xl p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Notifications</h2>
        {notifications && notifications.length > 0 ? (
          <ul className="space-y-4">
            {notifications.map((notification: any) => {
              const notificationDate = notification.sent_at ? new Date(notification.sent_at) : null;
              const isValidDate = notificationDate instanceof Date && !Number.isNaN(notificationDate.getTime());
              const isRead = notification.read;
              const isExpanded = expandedNotificationId === notification.id;

              return (
                <li
                  key={notification.id}
                  className={`p-4 border rounded shadow-sm ${isRead ? "bg-gray-100 border-gray-300" : "bg-blue-100 border-blue-300"}`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex-1" onClick={() => handleToggleNotification(notification.id)}>
                      <h3 className="text-lg font-semibold">ID: {notification.id}</h3>
                      <p className="text-gray-700">User ID: {notification.user_id}</p>
                      {!isRead && <span className="text-red-500 font-bold ml-2">New!</span>}
                    </div>
                    <div className="flex items-center space-x-4">
                      <p className="text-sm text-gray-500 mt-2">
                        {isValidDate
                          ? formatDistanceToNow(notificationDate, { addSuffix: true })
                          : "Invalid date"}
                      </p>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDeleteNotification(notification.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  {isExpanded && (
                    <div className="mt-4">
                      <p className="text-gray-700">Message: {notification.message}</p>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No notifications available.</p>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
