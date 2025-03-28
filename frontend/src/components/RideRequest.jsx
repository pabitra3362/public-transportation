
import Logo from "../assets/Logo.jpg"; // Ensure the logo path is correct

const RideRequest = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
      {/* Ride Request Card with Increased Width */}
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl text-center">
        {/* Larger Logo */}
        <div className="mb-6">
          <img src={Logo} alt="Logo" className="h-40 mx-auto rounded-full" />
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Ride Request</h2>

        {/* Ride Details */}
        <div className="bg-gray-200 p-6 rounded-lg shadow-md">
          <p className="text-2xl font-semibold text-gray-900">Pickup Location</p>
          <p className="text-lg text-gray-700 mt-1">Location A</p>
        </div>

        <div className="bg-gray-200 p-6 rounded-lg shadow-md mt-6">
          <p className="text-2xl font-semibold text-gray-900">Dropoff Location</p>
          <p className="text-lg text-gray-700 mt-1">Location B</p>
        </div>

        <div className="bg-gray-200 p-6 rounded-lg shadow-md mt-6">
          <p className="text-2xl font-semibold text-gray-900">Estimated Fare</p>
          <p className="text-4xl font-bold text-black mt-2">$25</p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col gap-5">
          <button className="bg-green-500 text-black text-xl px-6 py-3 rounded-md font-semibold hover:bg-black hover:text-white duration-500">
            Accept
          </button>
          <button className="bg-red-600 text-white text-xl px-6 py-3 rounded-md font-semibold hover:bg-black hover:text-white duration-500">
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default RideRequest;
