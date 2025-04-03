import React, { useEffect, useState } from "react";
import {
  getPendingComplaints,
  updateComplaintStatus,
} from "../services/complaintManagement.service";
import { toast, ToastContainer } from "react-toastify";
import { Spinner } from "flowbite-react";

const SupportComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getComplaints() {
      try {
        const response = await getPendingComplaints();
        setComplaints(response);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }
    getComplaints();
  }, []);

  const handleComplaint = async (id, status) => {
    try {
      await updateComplaintStatus({ complaintId: id, status });
      setComplaints((prevComplaints) =>
        prevComplaints.filter((complaint) => complaint._id !== id)
      );
      toast.success("Complaint status updated successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Support & Complaints</h1>
      {loading ? (
        <div className="text-center mt-10">
          <Spinner aria-label="Loading..." size="xl" />
        </div>
      ) : complaints.length > 0 ? (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">User</th>
              <th className="border px-4 py-2">Complaint</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints?.map((complaint) => (
              <tr key={complaint._id}>
                <td className="border px-4 py-2">{complaint.name}</td>
                <td className="border px-4 py-2">{complaint.subject}</td>
                <td className="border px-4 py-2">{complaint.status}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleComplaint(complaint._id, "resolved")}
                    className="bg-green-500 text-white px-2 w-28 py-2 rounded ml-2"
                  >
                    Resolve
                  </button>
                  <button
                    onClick={() => handleComplaint(complaint._id, "rejected")}
                    className="bg-red-500 text-white px-2 w-28 py-2 rounded ml-2"
                  >
                    Reject
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

export default SupportComplaints;
