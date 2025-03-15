import React, { useEffect, useState } from "react";
import { getPendingComplaints } from "../services/complaintManagement.service";
import { toast, ToastContainer } from "react-toastify";

const SupportComplaints = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    async function getComplaints() {
      try {
        const response = await getPendingComplaints();

        setComplaints(response);
      } catch (error) {
        toast.error(error.message);
      }
    }

    getComplaints();
  }, []);
  console.log("complaints: ",complaints);
  
  return (
    <div className="p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Support & Complaints</h1>
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
                <button className="bg-green-500 text-white px-2 py-1 rounded">
                  Resolve
                </button>
                <button className="bg-red-500 text-white px-2 py-1 rounded ml-2">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SupportComplaints;
