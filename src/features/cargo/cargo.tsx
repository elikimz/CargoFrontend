import React, { useState, useEffect } from "react";
import {
  useGetAllCargoQuery,
  useCreateCargoMutation,
  useUpdateCargoMutation,
  useDeleteCargoMutation,
} from "../cargo/cargoAPI"; // Adjust the import path as necessary

// Define the structure of a cargo item
interface Cargo {
  id?: number;
  tracking_number: string;
  description: string;
  weight: number;
  sender_id?: number;
  receiver_id: number;
  current_location: string;
  status: string;
  created_at?: string;
}

const CargoManagement: React.FC = () => {
  const [cargoList, setCargoList] = useState<Cargo[]>([]);
  const [formData, setFormData] = useState<Cargo>({
    tracking_number: "",
    description: "",
    weight: 0,
    receiver_id: 0,
    current_location: "",
    status: "pending",
  });

  // Fetch all cargo data
  const { data: allCargo, refetch: refetchCargo, isLoading, isError } = useGetAllCargoQuery([]);

  useEffect(() => {
    if (allCargo) {
      setCargoList(allCargo);
      console.log("Fetched cargo data:", allCargo);
    }
  }, [allCargo]);

  // Refresh cargo list every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Refreshing cargo data...");
      refetchCargo();
    }, 3000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [refetchCargo]);

  // Create a new cargo entry
  const [createCargo] = useCreateCargoMutation();
  const handleCreateCargo = async () => {
    try {
      console.log("Creating cargo with data:", formData);
      await createCargo(formData).unwrap();
      console.log("Cargo created successfully");
      refetchCargo();
      setFormData({
        tracking_number: "",
        description: "",
        weight: 0,
        receiver_id: 0,
        current_location: "",
        status: "pending",
      });
    } catch (error) {
      console.error("Failed to create cargo:", error);
    }
  };

  // Update an existing cargo entry
  const [updateCargo] = useUpdateCargoMutation();
  const handleUpdateCargo = async (id: number) => {
    try {
      const updatedData = { id, ...formData };
      console.log("Updating cargo with ID:", id, "and data:", updatedData);
      await updateCargo(updatedData).unwrap();
      console.log("Cargo updated successfully");
      refetchCargo();
    } catch (error) {
      console.error("Failed to update cargo:", error);
    }
  };

  // Delete a cargo entry
  const [deleteCargo] = useDeleteCargoMutation();
  const handleDeleteCargo = async (id: number) => {
    try {
      console.log("Deleting cargo with ID:", id);
      await deleteCargo(id).unwrap();
      console.log("Cargo deleted successfully");
      refetchCargo();
    } catch (error) {
      console.error("Failed to delete cargo:", error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Log loading and error states
  useEffect(() => {
    if (isLoading) {
      console.log("Loading cargo data...");
    }
    if (isError) {
      console.error("Error loading cargo data");
    }
  }, [isLoading, isError]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Cargo Management</h1>

      {/* Form for creating/updating cargo */}
      <form className="mb-6">
        <div className="mb-4">
          <label className="block text-gray-700">Tracking Number</label>
          <input
            type="text"
            name="tracking_number"
            value={formData.tracking_number}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Weight</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Receiver ID</label>
          <input
            type="number"
            name="receiver_id"
            value={formData.receiver_id}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Current Location</label>
          <input
            type="text"
            name="current_location"
            value={formData.current_location}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Status</label>
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button
          type="button"
          onClick={handleCreateCargo}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Create Cargo
        </button>
      </form>

      {/* List of cargo */}
      <div>
        <h2 className="text-xl font-bold mb-2">Cargo List</h2>
        <ul>
          {cargoList.map((cargo) => (
            <li key={cargo.id} className="border p-4 mb-2 rounded">
              <div>
                <strong>Tracking Number:</strong> {cargo.tracking_number}
              </div>
              <div>
                <strong>Description:</strong> {cargo.description}
              </div>
              <div>
                <strong>Weight:</strong> {cargo.weight}
              </div>
              <div>
                <strong>Receiver ID:</strong> {cargo.receiver_id}
              </div>
              <div>
                <strong>Current Location:</strong> {cargo.current_location}
              </div>
              <div>
                <strong>Status:</strong> {cargo.status}
              </div>
              <button
                onClick={() => handleUpdateCargo(cargo.id!)}
                className="mr-2 text-blue-500"
              >
                Update
              </button>
              <button
                onClick={() => handleDeleteCargo(cargo.id!)}
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

export default CargoManagement;
