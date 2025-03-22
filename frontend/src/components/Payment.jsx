/* eslint-disable-next-line no-unused-vars */
import React, { useState } from "react";
import Logo from "../assets/Logo.jpg"; // Import the logo image

function PaymentHistory() {
  // Sample payment history data
  // eslint-disable-next-line no-unused-vars
  const [paymentHistory, setPaymentHistory] = useState([
    {
      id: 1,
      paymentId: "PAY12345",
      pickup: "123 Main St, City A",
      drop: "456 Oak Rd, City B",
      fare: "$50.00",
      date: "2025-03-15",
    },
    {
      id: 2,
      paymentId: "PAY12346",
      pickup: "789 Pine Ave, City C",
      drop: "101 Maple Dr, City D",
      fare: "$30.00",
      date: "2025-03-10",
    },
    {
      id: 3,
      paymentId: "PAY12347",
      pickup: "567 Birch Blvd, City E",
      drop: "890 Cedar Ln, City F",
      fare: "$100.00",
      date: "2025-03-05",
    },
  ]);

  return (
    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-2xl mx-auto mt-4 w-full sm:w-[90%] md:w-[80%] lg:w-[70%] h-auto sm:h-auto md:h-[95%]">
      {/* Logo image */}
      <div className="text-center mb-4">
        <img src={Logo} alt="Logo" className="mx-auto h-24 sm:h-32 rounded-full" />
      </div>

      <h2 className="text-xl sm:text-2xl font-semibold text-center mb-4">Payment History</h2>

      {/* Payment History Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse text-xs sm:text-sm">
          <thead className="bg-yellow-300">
            <tr>
              <th className="px-2 sm:px-4 py-2 border-b text-left font-semibold text-black">Payment ID</th>
              <th className="px-2 sm:px-4 py-2 border-b text-left font-semibold text-black">Pickup Point</th>
              <th className="px-2 sm:px-4 py-2 border-b text-left font-semibold text-black">Drop Point</th>
              <th className="px-2 sm:px-4 py-2 border-b text-left font-semibold text-black">Fare</th>
              <th className="px-2 sm:px-4 py-2 border-b text-left font-semibold text-black">Date</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory.map((payment, index) => (
              <tr
                key={payment.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-gray-200 transition duration-300`}
              >
                <td className="px-2 sm:px-4 py-2 border-b">{payment.paymentId}</td>
                <td className="px-2 sm:px-4 py-2 border-b">{payment.pickup}</td>
                <td className="px-2 sm:px-4 py-2 border-b">{payment.drop}</td>
                <td className="px-2 sm:px-4 py-2 border-b">{payment.fare}</td>
                <td className="px-2 sm:px-4 py-2 border-b">{payment.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PaymentHistory;
