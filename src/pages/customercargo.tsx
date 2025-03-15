


// // import React, { useState, useEffect } from 'react';
// // import {
// //   useGetAllCargoQuery,
// //   useCreateCargoMutation
// // } from '../features/cargo/cargoAPI';
// // import { Loader, Save, Edit, CheckCircle } from 'lucide-react';

// // const CustomerCargo: React.FC = () => {
// //   const { data: allCargo, error: cargoError, isLoading: isCargoLoading, refetch: refetchCargo } = useGetAllCargoQuery([]);
// //   const [createCargo, { isLoading: isCreating, isSuccess: isCreateSuccess }] = useCreateCargoMutation();

// //   const [formData, setFormData] = useState({
// //     tracking_number: '',
// //     description: '',
// //     weight: '',
// //     receiver_id: '',
// //     current_location: '',
// //     status: 'pending', // Default status
// //   });

// //   const [isEditing, setIsEditing] = useState(false);

// //   useEffect(() => {
// //     // Retrieve the receiver ID from local storage when the component mounts
// //     const userId = localStorage.getItem('userId');
// //     if (userId) {
// //       setFormData((prevData) => ({
// //         ...prevData,
// //         receiver_id: userId,
// //       }));
// //     }
// //   }, []);

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const { name, value } = e.target;
// //     setFormData((prevData) => ({
// //       ...prevData,
// //       [name]: value,
// //     }));
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (Object.values(formData).some(value => value === '')) {
// //       alert('Please fill in all fields before submitting.');
// //       return;
// //     }
// //     try {
// //       await createCargo(formData);
// //       setIsEditing(false);
// //       setFormData({
// //         tracking_number: '',
// //         description: '',
// //         weight: '',
// //         receiver_id: '',
// //         current_location: '',
// //         status: 'pending',
// //       });
// //       refetchCargo();
// //     } catch (err) {
// //       console.error('Error creating cargo:', err);
// //     }
// //   };

// //   if (isCargoLoading) {
// //     return (
// //       <div className="flex justify-center items-center min-h-screen">
// //         <Loader size={48} className="text-gray-700" />
// //       </div>
// //     );
// //   }

// //   if (cargoError) {
// //     return <div className="text-red-500">Failed to load cargo.</div>;
// //   }

// //   return (
// //     <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-md">
// //       <h2 className="text-2xl font-semibold text-gray-800 mb-4">Customer Cargo</h2>

// //       <form onSubmit={handleSubmit}>
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //           <div>
// //             <label className="text-gray-700">Tracking Number</label>
// //             <input
// //               type="text"
// //               name="tracking_number"
// //               value={formData.tracking_number}
// //               onChange={handleChange}
// //               className="w-full p-3 mt-2 border border-gray-300 rounded-md"
// //               disabled={!isEditing}
// //             />
// //           </div>

// //           <div>
// //             <label className="text-gray-700">Description</label>
// //             <input
// //               type="text"
// //               name="description"
// //               value={formData.description}
// //               onChange={handleChange}
// //               className="w-full p-3 mt-2 border border-gray-300 rounded-md"
// //               disabled={!isEditing}
// //             />
// //           </div>

// //           <div>
// //             <label className="text-gray-700">Weight (kg)</label>
// //             <input
// //               type="text"
// //               name="weight"
// //               value={formData.weight}
// //               onChange={handleChange}
// //               className="w-full p-3 mt-2 border border-gray-300 rounded-md"
// //               disabled={!isEditing}
// //             />
// //           </div>

// //           <div>
// //             <label className="text-gray-700">Current Location</label>
// //             <input
// //               type="text"
// //               name="current_location"
// //               value={formData.current_location}
// //               onChange={handleChange}
// //               className="w-full p-3 mt-2 border border-gray-300 rounded-md"
// //               disabled={!isEditing}
// //             />
// //           </div>
// //         </div>

// //         <div className="mt-6 flex justify-end space-x-4">
// //           {!isEditing ? (
// //             <button
// //               type="button"
// //               onClick={() => setIsEditing(true)}
// //               className="flex items-center justify-center bg-yellow-500 text-white p-3 rounded-md hover:bg-yellow-600 focus:outline-none"
// //             >
// //               <Edit size={18} className="mr-2" />
// //               Add New Cargo
// //             </button>
// //           ) : (
// //             <>
// //               <button
// //                 type="button"
// //                 onClick={() => setIsEditing(false)}
// //                 className="flex items-center justify-center bg-red-500 text-white p-3 rounded-md hover:bg-red-600 focus:outline-none"
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 type="submit"
// //                 disabled={isCreating}
// //                 className="flex items-center justify-center bg-green-600 text-white p-3 rounded-md hover:bg-green-700 focus:outline-none"
// //               >
// //                 {isCreating ? (
// //                   <span>Creating...</span>
// //                 ) : (
// //                   <>
// //                     <Save size={18} className="mr-2" />
// //                     Save Cargo
// //                   </>
// //                 )}
// //               </button>
// //             </>
// //           )}
// //         </div>

// //         {isCreateSuccess && (
// //           <div className="mt-4 text-green-600 flex items-center">
// //             <CheckCircle size={20} className="mr-2" />
// //             Cargo created successfully!
// //           </div>
// //         )}
// //       </form>

// //       <div className="mt-6">
// //         <h3 className="text-xl font-semibold text-gray-700 mb-2">Cargo List</h3>
// //         <ul>
// //           {allCargo?.map((cargo: any) => (
// //             <li key={cargo.id} className="border-b border-gray-200 py-2">
// //               <div><strong>ID:</strong> {cargo.id}</div>
// //               <div><strong>Tracking Number:</strong> {cargo.tracking_number}</div>
// //               <div><strong>Description:</strong> {cargo.description}</div>
// //               <div><strong>Weight:</strong> {cargo.weight} kg</div>
// //               <div><strong>Sender ID:</strong> {cargo.sender_id}</div>
// //               <div><strong>Receiver ID:</strong> {cargo.receiver_id}</div>
// //               <div><strong>Current Location:</strong> {cargo.current_location}</div>
// //               <div><strong>Status:</strong> {cargo.status}</div>
// //               <div><strong>Created At:</strong> {new Date(cargo.created_at).toLocaleString()}</div>
// //             </li>
// //           ))}
// //         </ul>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CustomerCargo;


// import React, { useState, useEffect } from 'react';
// import {
//   useGetAllCargoQuery,
//   useCreateCargoMutation
// } from '../features/cargo/cargoAPI';
// import { Loader, Save, Edit, CheckCircle } from 'lucide-react';

// // Define the function before using it in the state initialization
// const generateRandomTrackingNumber = (): string => {
//   // Generate a random alphanumeric string for the tracking number
//   return Math.random().toString(36).substr(2, 10).toUpperCase();
// };

// const CustomerCargo: React.FC = () => {
//   const { data: allCargo, error: cargoError, isLoading: isCargoLoading, refetch: refetchCargo } = useGetAllCargoQuery([]);
//   const [createCargo, { isLoading: isCreating, isSuccess: isCreateSuccess }] = useCreateCargoMutation();

//   const [formData, setFormData] = useState({
//     tracking_number: generateRandomTrackingNumber(),
//     description: '',
//     weight: '',
//     receiver_id: '',
//     current_location: '',
//     status: 'pending', // Default status
//   });

//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     // Retrieve the receiver ID from local storage when the component mounts
//     const userId = localStorage.getItem('userId');
//     if (userId) {
//       setFormData((prevData) => ({
//         ...prevData,
//         receiver_id: userId,
//       }));
//     }
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (Object.values(formData).some(value => value === '')) {
//       alert('Please fill in all fields before submitting.');
//       return;
//     }
//     try {
//       await createCargo(formData);
//       setIsEditing(false);
//       setFormData({
//         tracking_number: generateRandomTrackingNumber(),
//         description: '',
//         weight: '',
//         receiver_id: '',
//         current_location: '',
//         status: 'pending',
//       });
//       refetchCargo();
//     } catch (err) {
//       console.error('Error creating cargo:', err);
//     }
//   };

//   if (isCargoLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <Loader size={48} className="text-gray-700" />
//       </div>
//     );
//   }

//   if (cargoError) {
//     return <div className="text-red-500">Failed to load cargo.</div>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-md">
//       <h2 className="text-2xl font-semibold text-gray-800 mb-4">Customer Cargo</h2>

//       <form onSubmit={handleSubmit}>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="text-gray-700">Tracking Number</label>
//             <input
//               type="text"
//               name="tracking_number"
//               value={formData.tracking_number}
//               onChange={handleChange}
//               className="w-full p-3 mt-2 border border-gray-300 rounded-md"
//               disabled
//             />
//           </div>

//           <div>
//             <label className="text-gray-700">Description</label>
//             <input
//               type="text"
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               className="w-full p-3 mt-2 border border-gray-300 rounded-md"
//               disabled={!isEditing}
//             />
//           </div>

//           <div>
//             <label className="text-gray-700">Weight (kg)</label>
//             <input
//               type="text"
//               name="weight"
//               value={formData.weight}
//               onChange={handleChange}
//               className="w-full p-3 mt-2 border border-gray-300 rounded-md"
//               disabled={!isEditing}
//             />
//           </div>

//           <div>
//             <label className="text-gray-700">Current Location</label>
//             <input
//               type="text"
//               name="current_location"
//               value={formData.current_location}
//               onChange={handleChange}
//               className="w-full p-3 mt-2 border border-gray-300 rounded-md"
//               disabled={!isEditing}
//             />
//           </div>
//         </div>

//         <div className="mt-6 flex justify-end space-x-4">
//           {!isEditing ? (
//             <button
//               type="button"
//               onClick={() => setIsEditing(true)}
//               className="flex items-center justify-center bg-yellow-500 text-white p-3 rounded-md hover:bg-yellow-600 focus:outline-none"
//             >
//               <Edit size={18} className="mr-2" />
//               Add New Cargo
//             </button>
//           ) : (
//             <>
//               <button
//                 type="button"
//                 onClick={() => setIsEditing(false)}
//                 className="flex items-center justify-center bg-red-500 text-white p-3 rounded-md hover:bg-red-600 focus:outline-none"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={isCreating}
//                 className="flex items-center justify-center bg-green-600 text-white p-3 rounded-md hover:bg-green-700 focus:outline-none"
//               >
//                 {isCreating ? (
//                   <span>Creating...</span>
//                 ) : (
//                   <>
//                     <Save size={18} className="mr-2" />
//                     Save Cargo
//                   </>
//                 )}
//               </button>
//             </>
//           )}
//         </div>

//         {isCreateSuccess && (
//           <div className="mt-4 text-green-600 flex items-center">
//             <CheckCircle size={20} className="mr-2" />
//             Cargo created successfully!
//           </div>
//         )}
//       </form>

//       <div className="mt-6">
//         <h3 className="text-xl font-semibold text-gray-700 mb-2">Cargo List</h3>
//         <ul>
//           {allCargo?.map((cargo: any) => (
//             <li key={cargo.id} className="border-b border-gray-200 py-2">
//               <div><strong>ID:</strong> {cargo.id}</div>
//               <div><strong>Tracking Number:</strong> {cargo.tracking_number}</div>
//               <div><strong>Description:</strong> {cargo.description}</div>
//               <div><strong>Weight:</strong> {cargo.weight} kg</div>
//               <div><strong>Sender ID:</strong> {cargo.sender_id}</div>
//               <div><strong>Receiver ID:</strong> {cargo.receiver_id}</div>
//               <div><strong>Current Location:</strong> {cargo.current_location}</div>
//               <div><strong>Status:</strong> {cargo.status}</div>
//               <div><strong>Created At:</strong> {new Date(cargo.created_at).toLocaleString()}</div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default CustomerCargo;


import React, { useState, useEffect } from 'react';
import {
  useGetAllCargoQuery,
  useCreateCargoMutation
} from '../features/cargo/cargoAPI';
import { Loader, Save, Edit, CheckCircle } from 'lucide-react';

// Generate random tracking number
const generateRandomTrackingNumber = (): string => {
  return Math.random().toString(36).substr(2, 10).toUpperCase();
};

const CustomerCargo: React.FC = () => {
  const { data: allCargo, error: cargoError, isLoading: isCargoLoading, refetch: refetchCargo } = useGetAllCargoQuery([]);
  const [createCargo, { isLoading: isCreating, isSuccess: isCreateSuccess }] = useCreateCargoMutation();

  const [formData, setFormData] = useState({
    tracking_number: generateRandomTrackingNumber(),
    description: '',
    weight: '',
    receiver_id: '',
    current_location: '',
    status: 'pending', // Default status
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setFormData((prevData) => ({
        ...prevData,
        receiver_id: userId,
      }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(formData).some(value => value === '')) {
      alert('Please fill in all fields before submitting.');
      return;
    }
    try {
      await createCargo(formData);
      setIsEditing(false);
      setFormData({
        tracking_number: generateRandomTrackingNumber(),
        description: '',
        weight: '',
        receiver_id: '',
        current_location: '',
        status: 'pending',
      });
      refetchCargo();
    } catch (err) {
      console.error('Error creating cargo:', err);
    }
  };

  if (isCargoLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Loader size={48} className="text-primary-500" />
      </div>
    );
  }

  if (cargoError) {
    return <div className="text-red-500">Failed to load cargo.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-xl">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Customer Cargo</h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-gray-700">Tracking Number</label>
            <input
              type="text"
              name="tracking_number"
              value={formData.tracking_number}
              onChange={handleChange}
              className="w-full p-4 mt-2 border border-gray-300 rounded-md bg-gray-50"
              disabled
            />
          </div>

          <div>
            <label className="text-gray-700">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-4 mt-2 border border-gray-300 rounded-md bg-gray-50"
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="text-gray-700">Weight (kg)</label>
            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="w-full p-4 mt-2 border border-gray-300 rounded-md bg-gray-50"
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="text-gray-700">Current Location</label>
            <input
              type="text"
              name="current_location"
              value={formData.current_location}
              onChange={handleChange}
              className="w-full p-4 mt-2 border border-gray-300 rounded-md bg-gray-50"
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="flex items-center justify-center bg-yellow-500 text-white p-4 rounded-lg hover:bg-yellow-600 focus:outline-none"
            >
              <Edit size={20} className="mr-2" />
              Add New Cargo
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex items-center justify-center bg-red-500 text-white p-4 rounded-lg hover:bg-red-600 focus:outline-none"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isCreating}
                className="flex items-center justify-center bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 focus:outline-none"
              >
                {isCreating ? (
                  <span>Creating...</span>
                ) : (
                  <>
                    <Save size={20} className="mr-2" />
                    Save Cargo
                  </>
                )}
              </button>
            </>
          )}
        </div>

        {isCreateSuccess && (
          <div className="mt-4 text-green-600 flex items-center">
            <CheckCircle size={20} className="mr-2" />
            Cargo created successfully!
          </div>
        )}
      </form>

      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Cargo List</h3>
        <ul className="space-y-4">
          {allCargo?.map((cargo: any) => (
            <li key={cargo.id} className="border-b border-gray-200 py-4">
              <div><strong>ID:</strong> {cargo.id}</div>
              <div><strong>Tracking Number:</strong> {cargo.tracking_number}</div>
              <div><strong>Description:</strong> {cargo.description}</div>
              <div><strong>Weight:</strong> {cargo.weight} kg</div>
              <div><strong>Sender ID:</strong> {cargo.sender_id}</div>
              <div><strong>Receiver ID:</strong> {cargo.receiver_id}</div>
              <div><strong>Current Location:</strong> {cargo.current_location}</div>
              <div><strong>Status:</strong> {cargo.status}</div>
              <div><strong>Created At:</strong> {new Date(cargo.created_at).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomerCargo;
