import Logo from "../assets/Logo.jpg"; // Ensure the logo path is correct

const RideRequest = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
      {/* Ride Request Card with Reduced Height */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl text-center">
        {/* Larger Logo */}
        <div className="mb-4">
          <img src={Logo} alt="Logo" className="h-32 mx-auto rounded-full" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Ride Request</h2>

        {/* Ride Details */}

        <div className="bg-gray-200 p-4 rounded-lg shadow-md mt-4">
          <p className="text-xl font-semibold text-gray-900">User Name</p>
          <p className="text-lg text-gray-700 mt-1">John Doe</p>
        </div>
        <div className="bg-gray-200 p-4 rounded-lg shadow-md mt-4">
          <p className="text-xl font-semibold text-gray-900">
            Trip Destination{" "}
          </p>
          <p className="text-lg text-gray-700 mt-1">Destination</p>
        </div>

        <div className="bg-gray-200 p-4 rounded-lg shadow-md mt-4">
          <p className="text-xl font-semibold text-gray-900">Pickup Location</p>
          <p className="text-lg text-gray-700 mt-1">Location A</p>
        </div>

        <div className="bg-gray-200 p-4 rounded-lg shadow-md mt-4">
          <p className="text-xl font-semibold text-gray-900">
            Drop Location
          </p>
          <p className="text-lg text-gray-700 mt-1">Location B</p>
        </div>

        <div className="bg-gray-200 p-4 rounded-lg shadow-md mt-4">
          <p className="text-xl font-semibold text-gray-900">Estimated Fare</p>
          <p className="text-3xl font-bold text-black mt-2">$25</p>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex flex-col gap-4">
          <button className="bg-green-500 text-black text-xl px-6 py-2 rounded-md font-semibold hover:bg-black hover:text-white duration-500">
            Accept
          </button>
          <button className="bg-red-600 text-white text-xl px-6 py-2 rounded-md font-semibold hover:bg-black hover:text-white duration-500">
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default RideRequest;
