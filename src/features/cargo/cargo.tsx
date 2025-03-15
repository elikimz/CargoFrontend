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
    status: "pending", // Default status
  });
  const [selectedCargoId, setSelectedCargoId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  // Fetch all cargo data
  const { data: allCargo, refetch: refetchCargo, isLoading, isError } = useGetAllCargoQuery([]);

  useEffect(() => {
    if (allCargo) {
      setCargoList(allCargo);
      console.log("Fetched cargo data:", allCargo);
    }
  }, [allCargo]);

  // Refresh cargo list every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Refreshing cargo data...");
      refetchCargo();
    }, 30000);

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
      setErrorMessage("");
      setSuccessMessage("Cargo created successfully!");
    } catch (error) {
      console.error("Failed to create cargo:", error);
      setErrorMessage("Failed to create cargo. Please try again.");
    }
  };

  // Update an existing cargo entry
  const [updateCargo] = useUpdateCargoMutation();
  const handleUpdateCargo = async () => {
    if (selectedCargoId === null) return;

    // Log the formData to verify all required fields are present
    console.log("Form data before update:", formData);

    // Check for missing required fields
    const requiredFields = ["tracking_number", "description", "weight", "receiver_id", "current_location", "status"] as const;
    const missingFields = requiredFields.filter(field => !formData[field as keyof Cargo]);

    if (missingFields.length > 0) {
      console.error("Missing required fields:", missingFields);
      setErrorMessage(`Missing required fields: ${missingFields.join(", ")}`);
      return;
    }

    // Ensure correct data types
    const updatedData = {
      id: selectedCargoId,
      tracking_number: formData.tracking_number,
      description: formData.description,
      weight: Number(formData.weight), // Ensure weight is a number
      receiver_id: Number(formData.receiver_id), // Ensure receiver_id is a number
      current_location: formData.current_location,
      status: formData.status,
    };

    try {
      console.log("Updating cargo with ID:", selectedCargoId, "and data:", updatedData);
      await updateCargo({ id: selectedCargoId, cargoData: updatedData }).unwrap();
      console.log("Cargo updated successfully");
      refetchCargo();
      setSelectedCargoId(null);
      setFormData({
        tracking_number: "",
        description: "",
        weight: 0,
        receiver_id: 0,
        current_location: "",
        status: "pending",
      });
      setErrorMessage("");
      setSuccessMessage("Cargo updated successfully!");
    } catch (error) {
      console.error("Failed to update cargo:", error);
      setErrorMessage("Failed to update cargo. Please try again.");
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
      setErrorMessage("Failed to delete cargo. Please try again.");
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
  const handleEditCargo = (cargo: Cargo) => {
    setFormData(cargo);
    setSelectedCargoId(cargo.id!);
  };

  // Log loading and error states
  useEffect(() => {
    if (isLoading) {
      console.log("Loading cargo data...");
    }
    if (isError) {
      console.error("Error loading cargo data");
      setErrorMessage("Error loading cargo data. Please try again.");
    }
  }, [isLoading, isError]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Cargo Management</h1>

      {isLoading && <div className="text-center text-gray-500">Loading...</div>}
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
      {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}

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
            onClick={handleCreateCargo}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Create Cargo
          </button>
          {selectedCargoId !== null && (
            <button
              type="button"
              onClick={handleUpdateCargo}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Update Cargo
            </button>
          )}
        </div>
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
                onClick={() => handleEditCargo(cargo)}
                className="mr-2 text-blue-500"
              >
                Edit
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
