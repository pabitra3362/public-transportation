const DriverRideHistory = () => {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Ride History
        </h2>
        <div className="border-t border-gray-300 py-4 max-h-[500px] overflow-auto scrollbar-hidden">
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-4 bg-gray-100 rounded-lg mb-3"
            >
              <div>
                <p className="text-lg font-semibold">Ride ID: {12345 + index}</p>
                <p className="text-sm text-gray-600">User: User {index + 1}</p>
                <p className="text-sm text-gray-600">Pickup: Location A</p>
                <p className="text-sm text-gray-600">Drop-off: Location B</p>
              </div>
              <div className="text-right">
                <p className="text-green-600 font-bold text-lg">₹{300 + index * 50}</p>
                <p className="text-xs text-gray-500">Date: 2024-03-{25 + index}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default DriverRideHistory;
  