



// import React, { useState, useEffect } from 'react';
// import { useGetTrackingByCargoQuery } from '../features/tracking/trackingAPi';
// import { Loader, XCircle, CheckCircle } from 'lucide-react';

// interface Track {
//   id: string;
//   cargo_id: string;
//   location: string;
//   status: string;
//   timestamp: string;
// }

// const Tracking: React.FC = () => {
//   const [cargoId, setCargoId] = useState('');
//   const [notification, setNotification] = useState<string | null>(null);
//   const [triggerFetch, setTriggerFetch] = useState(false);

//   const { data: trackingData, isLoading: isTrackingLoading, error: trackingError } = useGetTrackingByCargoQuery(cargoId, {
//     skip: !cargoId || !triggerFetch, // Skip the query if cargoId is not provided or triggerFetch is false
//   });

//   useEffect(() => {
//     if (triggerFetch && trackingError) {
//       setNotification('Error fetching tracking data. Please check the cargo ID and try again.');
//     } else {
//       setNotification(null);
//     }
//   }, [triggerFetch, trackingError]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setCargoId(e.target.value);
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter') {
//       setTriggerFetch(true);
//     }
//   };

//   if (isTrackingLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <Loader size={48} className="text-gray-700" />
//         <p className="ml-4">Fetching tracking data...</p>
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
//           onChange={handleInputChange}
//           onKeyDown={handleKeyDown}
//           className="w-full p-3 mt-2 border border-gray-300 rounded-md"
//         />
//       </div>

//       {trackingData && trackingData.length > 0 && (
//         <div className="mt-4">
//           <h3 className="text-xl font-semibold text-gray-700 mb-2">Tracking Information</h3>
//           {trackingData.map((track: Track) => (
//             <div key={track.id} className="mb-4 p-4 border rounded-md shadow-sm">
//               <div><strong>Cargo ID:</strong> {track.cargo_id}</div>
//               <div><strong>Location:</strong> {track.location}</div>
//               <div><strong>Status:</strong> {track.status} {track.status === 'Delivered' ? <CheckCircle size={16} className="text-green-500 ml-2" /> : null}</div>
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
  const [triggerFetch, setTriggerFetch] = useState(false);

  const { data: trackingData, isLoading: isTrackingLoading, error: trackingError } = useGetTrackingByCargoQuery(cargoId, {
    skip: !cargoId || !triggerFetch, // Skip the query if cargoId is not provided or triggerFetch is false
  });

  useEffect(() => {
    if (triggerFetch && trackingError) {
      setNotification('Error fetching tracking data. Please check the cargo ID and try again.');
    } else {
      setNotification(null);
    }
  }, [triggerFetch, trackingError]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCargoId(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setTriggerFetch(true);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500';
      case 'in transit':
        return 'bg-blue-500';
      case 'delivered':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusPercentage = (status: string) => {
    switch (status) {
      case 'pending':
        return 25;
      case 'in transit':
        return 75;
      case 'delivered':
        return 100;
      default:
        return 0;
    }
  };

  if (isTrackingLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader size={48} className="text-gray-700" />
        <p className="ml-4">Fetching tracking data...</p>
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
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="w-full p-3 mt-2 border border-gray-300 rounded-md"
        />
      </div>

      {trackingData && trackingData.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Tracking Information</h3>
          {trackingData.map((track: Track) => (
            <div key={track.id} className="mb-4 p-4 border rounded-md shadow-sm">
              <div><strong>Cargo ID:</strong> {track.cargo_id}</div>
              <div><strong>Location:</strong> {track.location}</div>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className={`text-xs font-semibold inline-block ${getStatusColor(track.status)} py-1 px-2 rounded-full text-white`}>
                      {track.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-gray-600">
                      {getStatusPercentage(track.status)}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                  <div
                    style={{ width: `${getStatusPercentage(track.status)}%` }}
                    className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${getStatusColor(track.status)}`}
                  ></div>
                </div>
              </div>
              <div><strong>Timestamp:</strong> {new Date(track.timestamp).toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tracking;
