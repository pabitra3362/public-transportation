import React, { useEffect, useState } from "react";
import { cancelRide, getRides } from "../services/rideManagement.service";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Spinner } from "flowbite-react";

const RideManagement = () => {
  const [rides, setRides] = useState([]);
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRides() {
      try {
        const rides = await getRides({ status });
        setRides(rides);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchRides();
  }, [status]);

  const handleCancelBtn = async (rideId) => {
    try {
      const response = await cancelRide({ rideId });
      toast.success(response.message);
      setRides((prevRides) => prevRides.filter((ride) => ride._id !== rideId));
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleView = async (ride) => {
    localStorage.setItem("rideDetails", JSON.stringify(ride));
    navigate(`/live-direction/${ride?.captain?._id}`);
  };

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

      {loading ? (
        <div className="text-center mt-10">
          <Spinner aria-label="Loading..." size="xl" />
        </div>
      ) : rides.length > 0 ? (
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
            {rides.map((ride) => (
              <tr key={ride._id}>
                <td className="border px-4 py-2">{ride._id}</td>
                <td className="border px-4 py-2">{ride?.captain?.name}</td>
                <td className="border px-4 py-2">{ride?.user?.name}</td>
                <td className="border px-4 py-2">{ride.status}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleView(ride)}
                    className="bg-indigo-600 text-white px-2 w-28 py-2 rounded ml-2"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleCancelBtn(ride._id)}
                    className="bg-red-500 text-white px-2 w-28 py-2 rounded ml-2"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <video
          className="w-full h-96"
          src="https://cdnl.iconscout.com/lottie/premium/preview-watermark/empty-14042396-11352619.mp4"
          autoPlay
          loop
          muted
        ></video>
      )}
    </div>
  );
};

export default RideManagement;
