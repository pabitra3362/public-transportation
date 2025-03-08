import React from 'react';

const DriverManagement = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Driver Management</h1>
            <input
                type="text"
                placeholder="Search drivers..."
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
                    {/* Example driver data */}
                    <tr>
                        <td className="border px-4 py-2">1</td>
                        <td className="border px-4 py-2">Alice Johnson</td>
                        <td className="border px-4 py-2">alice@example.com</td>
                        <td className="border px-4 py-2">
                            <button className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                            <button className="bg-red-500 text-white px-2 py-1 rounded ml-2">Ban</button>
                        </td>
                    </tr>
                    {/* Add more driver rows as needed */}
                </tbody>
            </table>
        </div>
    );
};

export default DriverManagement;
