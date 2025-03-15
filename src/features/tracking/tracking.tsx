import React, { useState, useEffect } from "react";
import {
  useGetAllTrackingsQuery, // New hook for fetching all trackings
  useGetTrackingByCargoQuery,
  useCreateTrackingMutation,
  useUpdateTrackingMutation,
  useDeleteTrackingMutation,
} from "../tracking/trackingAPi"; // Adjust the import path as necessary

// Define the structure of a tracking item
interface Tracking {
  id?: number;
  cargo_id: number;
  location: string;
  status: string;
  timestamp?: string;
}

const TrackingManagement: React.FC = () => {
  const [trackingList, setTrackingList] = useState<Tracking[]>([]);
  const [formData, setFormData] = useState<Tracking>({
    cargo_id: 0, // Initialize as number
    location: "",
    status: "in transit", // Default status
  });
  const [selectedTrackingId, setSelectedTrackingId] = useState<number | null>(null);
  const [cargoId, setCargoId] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoadingAction, setIsLoadingAction] = useState<boolean>(false);

  // Fetch all tracking data
  const { data: allTrackings, refetch: refetchAllTrackings, isLoading: isLoadingAll, isError: isErrorAll } = useGetAllTrackingsQuery({});

  // Fetch tracking data for a specific cargo
  const { data: trackingData, refetch: refetchTracking, isLoading, isError } = useGetTrackingByCargoQuery(cargoId);

  useEffect(() => {
    if (trackingData) {
      setTrackingList(trackingData);
      console.log("Fetched tracking data for cargo:", trackingData);
    }
  }, [trackingData]);

  useEffect(() => {
    if (allTrackings) {
      setTrackingList(allTrackings);
      console.log("Fetched all tracking data:", allTrackings);
    }
  }, [allTrackings]);

  // Create a new tracking entry
  const [createTracking] = useCreateTrackingMutation();
  const handleCreateTracking = async () => {
    setIsLoadingAction(true);
    try {
      console.log("Creating tracking with data:", formData);
      await createTracking(formData).unwrap();
      console.log("Tracking created successfully");
      refetchAllTrackings();
      setFormData({
        cargo_id: 0,
        location: "",
        status: "in transit",
      });
      setErrorMessage("");
    } catch (error) {
      console.error("Failed to create tracking:", error);
      setErrorMessage("Failed to create tracking. Please try again.");
    } finally {
      setIsLoadingAction(false);
    }
  };

  // Update an existing tracking entry
  const [updateTracking] = useUpdateTrackingMutation();
  const handleUpdateTracking = async () => {
    if (selectedTrackingId === null) {
      setErrorMessage("No tracking selected for update.");
      return;
    }

    setIsLoadingAction(true);

    // Log the formData to verify all required fields are present
    console.log("Form data before update:", formData);

    // Check for missing required fields
    const requiredFields = ["cargo_id", "location", "status"] as const;
    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      console.error("Missing required fields:", missingFields);
      setErrorMessage(`Missing required fields: ${missingFields.join(", ")}`);
      setIsLoadingAction(false);
      return;
    }

    const updatedData = {
      cargo_id: formData.cargo_id,
      location: formData.location,
      status: formData.status,
    };

    try {
      console.log("Updating tracking with ID:", selectedTrackingId, "and data:", updatedData);
      await updateTracking({ trackingId: selectedTrackingId, trackingData: updatedData }).unwrap();
      console.log("Tracking updated successfully");
      refetchAllTrackings();
      setSelectedTrackingId(null);
      setErrorMessage("");
    } catch (error) {
      console.error("Failed to update tracking:", error);
      setErrorMessage("Failed to update tracking. Please try again.");
    } finally {
      setIsLoadingAction(false);
    }
  };

  // Delete a tracking entry
  const [deleteTracking] = useDeleteTrackingMutation();
  const handleDeleteTracking = async (id: number) => {
    setIsLoadingAction(true);
    try {
      console.log("Deleting tracking with ID:", id);
      await deleteTracking(id).unwrap();
      console.log("Tracking deleted successfully");
      refetchAllTrackings();
    } catch (error) {
      console.error("Failed to delete tracking:", error);
      setErrorMessage("Failed to delete tracking. Please try again.");
    } finally {
      setIsLoadingAction(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Pre-fill form for update
  const handleEditTracking = (tracking: Tracking) => {
    setFormData(tracking);
    setSelectedTrackingId(tracking.id!);
    console.log("Selected tracking ID for update:", tracking.id);
  };

  // Log loading and error states
  useEffect(() => {
    if (isLoading || isLoadingAll) {
      console.log("Loading tracking data...");
    }
    if (isError && !trackingData) {
      console.error("Error loading tracking data");
      setErrorMessage("Error loading tracking data. Please try again.");
    }
    if (isErrorAll && !allTrackings) {
      console.error("Error loading all tracking data");
      setErrorMessage("Error loading all tracking data. Please try again.");
    }
  }, [isLoading, isError, isLoadingAll, isErrorAll, trackingData, allTrackings]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tracking Management</h1>

      {(isLoading || isLoadingAll) && <div className="text-center text-gray-500">Loading...</div>}
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

      {isLoadingAction && <div className="text-center text-gray-500">Processing...</div>}

      {/* Form for creating/updating tracking */}
      <form className="mb-6">
        <div className="mb-4">
          <label className="block text-gray-700">Cargo ID</label>
          <input
            type="number"
            name="cargo_id"
            value={formData.cargo_id}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="pending">Pending</option>
            <option value="in transit">In Transit</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={handleCreateTracking}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Create Tracking
          </button>
          {selectedTrackingId !== null && (
            <button
              type="button"
              onClick={handleUpdateTracking}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Update Tracking
            </button>
          )}
        </div>
      </form>

      {/* List of tracking */}
      <div>
        <h2 className="text-xl font-bold mb-2">Tracking List</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Enter Cargo ID to fetch tracking history</label>
          <input
            type="number"
            value={cargoId}
            onChange={(e) => setCargoId(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
          <button
            type="button"
            onClick={() => refetchTracking()}
            className="px-4 py-2 bg-gray-600 text-white rounded mt-2"
          >
            Fetch Tracking History
          </button>
        </div>
        <ul>
          {trackingList.map((tracking) => (
            <li key={tracking.id} className="border p-4 mb-2 rounded">
              <div>
                <strong>Cargo ID:</strong> {tracking.cargo_id}
              </div>
              <div>
                <strong>Location:</strong> {tracking.location}
              </div>
              <div>
                <strong>Status:</strong> {tracking.status}
              </div>
              <div>
                <strong>Timestamp:</strong> {tracking.timestamp}
              </div>
              <button
                onClick={() => handleEditTracking(tracking)}
                className="mr-2 text-blue-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteTracking(tracking.id!)}
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

export default TrackingManagement;
