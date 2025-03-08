import React from 'react';

const PromotionsDiscounts = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Promotions & Discounts</h1>
            <form className="mb-4">
                <input
                    type="text"
                    placeholder="Promo Code"
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="number"
                    placeholder="Discount Amount"
                    className="border p-2 mb-2 w-full"
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded">Add Promotion</button>
            </form>
            <table className="min-w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border px-4 py-2">Promo Code</th>
                        <th className="border px-4 py-2">Discount</th>
                        <th className="border px-4 py-2">Expiration Date</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Example promotion data */}
                    <tr>
                        <td className="border px-4 py-2">SAVE20</td>
                        <td className="border px-4 py-2">20%</td>
                        <td className="border px-4 py-2">2023-12-31</td>
                        <td className="border px-4 py-2">
                            <button className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                            <button className="bg-red-500 text-white px-2 py-1 rounded ml-2">Delete</button>
                        </td>
                    </tr>
                    {/* Add more promotion rows as needed */}
                </tbody>
            </table>
        </div>
    );
};

export default PromotionsDiscounts;
