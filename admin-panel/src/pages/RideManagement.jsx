import React, { useEffect, useState } from "react";
import { cancelRide, getRides } from "../services/rideManagement.service";
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";


const RideManagement = () => {
  const [rides, setRides] = useState([]);
  const [status, setStatus] = useState("all");
  const naivgate = useNavigate();


  useEffect(() => {
    async function fetchRides() {
      try {
        const rides = await getRides({status});
        setRides(rides);
      } catch (error) {
        toast.error(error.message);
      }
    }

    fetchRides();
  }, [status]);


  const handleCancelBtn = async (rideId) => {
      try {

        const response = await cancelRide({rideId});

        toast.success(response.message);

        setRides(rides.filter((ride) => ride._id !== rideId));
        
      } catch (error) {
        toast.error(error.message);
      }
  };


  const handleView = async (ride) => {
    localStorage.setItem('rideDetails', JSON.stringify(ride));
    naivgate(`/live-direction/${ride?.captain?._id}`);
  }
  
  

  return (
    <div className="p-4">
        <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Ride Management</h1>
      <div className="mb-4">
        <label className="mr-2">Filter by Status:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="ongoing">Ongoing</option>
          <option value="cancelled">Cancelled</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Ride ID</th>
            <th className="border px-4 py-2">Driver</th>
            <th className="border px-4 py-2">Passenger</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rides?.map((ride) => (
            <tr key={ride._id}>
              <td className="border px-4 py-2">{ride?._id}</td>
              <td className="border px-4 py-2">{ride?.captain?.name}</td>
              <td className="border px-4 py-2">{ride?.user?.name}</td>
              <td className="border px-4 py-2">{ride.status}</td>
              <td className="border px-4 py-2">
                <button
                onClick={()=> handleView(ride)}
                className="bg-indigo-600 text-white px-2 w-28 py-2 rounded ml-2">
                  View
                </button>
                <button
                onClick={()=> handleCancelBtn(ride._id)}
                className="bg-red-500 text-white px-2 w-28 py-2 rounded ml-2">
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RideManagement;