import React from 'react';

const RideManagement = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Ride Management</h1>
            <div className="mb-4">
                <label className="mr-2">Filter by Status:</label>
                <select className="border p-2">
                    <option value="all">All</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                    <option value="canceled">Canceled</option>
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
                    {/* Example ride data */}
                    <tr>
                        <td className="border px-4 py-2">101</td>
                        <td className="border px-4 py-2">Jane Smith</td>
                        <td className="border px-4 py-2">John Doe</td>
                        <td className="border px-4 py-2">Ongoing</td>
                        <td className="border px-4 py-2">
                            <button className="bg-blue-500 text-white px-2 py-1 rounded">View</button>
                            <button className="bg-red-500 text-white px-2 py-1 rounded ml-2">Cancel</button>
                        </td>
                    </tr>
                    {/* Add more ride rows as needed */}
                </tbody>
            </table>
        </div>
    );
};

export default RideManagement;
