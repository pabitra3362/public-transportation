import React from 'react';

const SupportComplaints = () => {
    return (
        <div className="p-4">
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
                    {/* Example complaint data */}
                    <tr>
                        <td className="border px-4 py-2">John Doe</td>
                        <td className="border px-4 py-2">Issue with ride</td>
                        <td className="border px-4 py-2">Pending</td>
                        <td className="border px-4 py-2">
                            <button className="bg-green-500 text-white px-2 py-1 rounded">Resolve</button>
                            <button className="bg-red-500 text-white px-2 py-1 rounded ml-2">Delete</button>
                        </td>
                    </tr>
                    {/* Add more complaint rows as needed */}
                </tbody>
            </table>
        </div>
    );
};

export default SupportComplaints;
