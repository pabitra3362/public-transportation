
import Logo from "../assets/Logo.jpg"; // Ensure the logo path is correct

const DriverEarnings = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
      {/* Earnings Card with Increased Width */}
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl text-center">
        {/* Larger Logo */}
        <div className="mb-6">
          <img src={Logo} alt="Logo" className="h-40  rounded-full mx-auto" /> {/* Increased size */}
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Driver Earnings</h2>

        {/* Earnings Display */}
        <div className="bg-gray-200 p-6 rounded-lg shadow-md">
          <p className="text-2xl font-semibold text-gray-900">Total Earnings</p>
          <p className="text-4xl font-bold text-black mt-2">$800</p>
        </div>

        <div className="bg-gray-200 p-6 rounded-lg shadow-md mt-6">
          <p className="text-2xl font-semibold text-gray-900">Daily Earnings</p>
          <p className="text-4xl font-bold text-black mt-2">$120</p>
        </div>
      </div>
    </div>
  );
};

export default DriverEarnings;
