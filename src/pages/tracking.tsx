// import React, { useState, useEffect } from 'react';
// import { useGetTrackingByCargoQuery } from '../features/tracking/trackingAPi';
// import { Loader, XCircle } from 'lucide-react';

// const Tracking: React.FC = () => {
//   const [cargoId, setCargoId] = useState('');
//   const [notification, setNotification] = useState<string | null>(null);
//   const { data: trackingData, isLoading: isTrackingLoading, error: trackingError } = useGetTrackingByCargoQuery(cargoId, {
//     skip: !cargoId, // Skip the query if cargoId is not provided
//   });

//   useEffect(() => {
//     if (cargoId && trackingError) {
//       setNotification('Error fetching tracking data. Please try again.');
//     } else {
//       setNotification(null); // Clear any previous notifications
//     }
//   }, [cargoId, trackingError]);

//   if (isTrackingLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <Loader size={48} className="text-gray-700" />
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-md">
//       <h2 className="text-2xl font-semibold text-gray-800 mb-4">Track Cargo</h2>

//       {notification && (
//         <div className="mb-4 text-red-600 flex items-center">
//           <XCircle size={20} className="mr-2" />
//           {notification}
//         </div>
//       )}

//       <div className="flex items-center space-x-4">
//         <input
//           type="text"
//           placeholder="Enter Cargo ID"
//           value={cargoId}
//           onChange={(e) => setCargoId(e.target.value)}
//           className="w-full p-3 mt-2 border border-gray-300 rounded-md"
//         />
//       </div>

//       {trackingData && trackingData.length > 0 && (
//         <div className="mt-4">
//           <h3 className="text-xl font-semibold text-gray-700 mb-2">Tracking Information</h3>
//           {trackingData.map((track) => (
//             <div key={track.id}>
//               <div><strong>Cargo ID:</strong> {track.cargo_id}</div>
//               <div><strong>Location:</strong> {track.location}</div>
//               <div><strong>Status:</strong> {track.status}</div>
//               <div><strong>Timestamp:</strong> {new Date(track.timestamp).toLocaleString()}</div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Tracking;


import React, { useState, useEffect } from 'react';
import { useGetTrackingByCargoQuery } from '../features/tracking/trackingAPi';
import { Loader, XCircle } from 'lucide-react';

// Define the type for the track object
interface Track {
  id: string;
  cargo_id: string;
  location: string;
  status: string;
  timestamp: string;
}

const Tracking: React.FC = () => {
  const [cargoId, setCargoId] = useState('');
  const [notification, setNotification] = useState<string | null>(null);
  const { data: trackingData, isLoading: isTrackingLoading, error: trackingError } = useGetTrackingByCargoQuery(cargoId, {
    skip: !cargoId, // Skip the query if cargoId is not provided
  });

  useEffect(() => {
    if (cargoId && trackingError) {
      setNotification('Error fetching tracking data. Please try again.');
    } else {
      setNotification(null); // Clear any previous notifications
    }
  }, [cargoId, trackingError]);

  if (isTrackingLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader size={48} className="text-gray-700" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Track Cargo</h2>

      {notification && (
        <div className="mb-4 text-red-600 flex items-center">
          <XCircle size={20} className="mr-2" />
          {notification}
        </div>
      )}

      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Enter Cargo ID"
          value={cargoId}
          onChange={(e) => setCargoId(e.target.value)}
          className="w-full p-3 mt-2 border border-gray-300 rounded-md"
        />
      </div>

      {trackingData && trackingData.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Tracking Information</h3>
          {trackingData.map((track: Track) => (
            <div key={track.id}>
              <div><strong>Cargo ID:</strong> {track.cargo_id}</div>
              <div><strong>Location:</strong> {track.location}</div>
              <div><strong>Status:</strong> {track.status}</div>
              <div><strong>Timestamp:</strong> {new Date(track.timestamp).toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tracking;
