import React from 'react';

const EarningsPayments = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Earnings & Payments</h1>
            <table className="min-w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border px-4 py-2">Driver</th>
                        <th className="border px-4 py-2">Total Earnings</th>
                        <th className="border px-4 py-2">Commission</th>
                        <th className="border px-4 py-2">Net Earnings</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Example earnings data */}
                    <tr>
                        <td className="border px-4 py-2">Jane Smith</td>
                        <td className="border px-4 py-2">$500</td>
                        <td className="border px-4 py-2">$50</td>
                        <td className="border px-4 py-2">$450</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">John Doe</td>
                        <td className="border px-4 py-2">$600</td>
                        <td className="border px-4 py-2">$60</td>
                        <td className="border px-4 py-2">$540</td>
                    </tr>
                    {/* Add more earnings rows as needed */}
                </tbody>
            </table>
        </div>
    );
};

export default EarningsPayments;
