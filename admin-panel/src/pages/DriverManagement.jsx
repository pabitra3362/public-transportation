import React, { useEffect, useState } from "react";
import { getDrivers } from "../services/driverManagement.service";
import { toast, ToastContainer } from "react-toastify";

const DriverManagement = () => {
  const [drivers, setDrivers] = useState([]);
  const [searchDriver, setSearchDriver] = useState("");

  useEffect(() => {
    async function fetchDrivers() {
      try {
        const drivers = await getDrivers();

        setDrivers(drivers);
      } catch (error) {
        toast.error(error.message);
      }
    }

    fetchDrivers();
  }, []);

  const filteredDrivers = searchDriver
    ? drivers.filter(
        (driver) =>
          driver.name.toLowerCase().includes(searchDriver.toLowerCase()) ||
          driver.email.toLowerCase().includes(searchDriver.toLowerCase())
      )
    : drivers;

  const handleSearch = (e) => {
    setSearchDriver(e.target.value);
  };

  return (
    <div className="p-4">
        <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Driver Management</h1>
      <input
        type="text"
        placeholder="Search drivers..."
        value={searchDriver}
        onChange={handleSearch}
        className="border p-2 mb-4 w-full"
      />
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Driver ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredDrivers.map((driver) => (
            <tr key={driver._id}>
              <td className="border px-4 py-2">{driver._id}</td>
              <td className="border px-4 py-2">{driver.name}</td>
              <td className="border px-4 py-2">{driver.email}</td>
              <td className="border px-4 py-2">
                <button className="bg-blue-500 text-white px-2 py-1 rounded">
                  Edit
                </button>
                <button className="bg-red-500 text-white px-2 py-1 rounded ml-2">
                  Ban
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DriverManagement;
