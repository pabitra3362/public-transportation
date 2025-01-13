/* eslint-disable react/prop-types */
import MapIcon from '@mui/icons-material/Map';
import ApartmentIcon from '@mui/icons-material/Apartment';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

const cards = [
  {
    icon: <MapIcon className="text-yellow-300" sx={{ fontSize: 90 }} />,
    title: "Fast And Easy Transport",
    description:
      "Experience fast, easy, and reliable transport with our taxi booking service, ensuring comfort and convenience anytime, anywhere.",
  },
  {
    icon: <ApartmentIcon className="text-yellow-300" sx={{ fontSize: 90 }} />,
    title: "Move Anywhere You Want",
    description:
      "Move anywhere you want with our seamless taxi booking service, offering flexibility, comfort, and reliability for every journey.",
  },
  {
    icon: <DirectionsCarIcon className="text-yellow-300" sx={{ fontSize: 90 }} />,
    title: "Your Ride, Your Way",
    description:
      "Customize your travel experience with our taxi service, offering safe, affordable, and convenient rides tailored to your needs.",
  },
];

const Card = ({ icon, title, description }) => {
  return (
    <div className="group w-full max-w-xs bg-white rounded-lg h-72 hover:bg-slate-100 hover:shadow-2xl hover:-translate-y-5 transition duration-300 relative items-center gap-5 px-3 p-5 flex flex-col justify-center py-5">
      <div className="absolute w-full top-0 left-0 h-1 bg-yellow-300 hidden group-hover:block transition duration-200"></div>
      <div className="icon flex justify-center items-center text-3xl md:text-5xl">
        {icon}
      </div>
      <div className="title text-black text-xl text-center font-bold">
        {title}
      </div>
      <div className="description text-center text-slate-500 text-sm md:text-base">
        {description}
      </div>
    </div>
  );
};

const CardList = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center w-full mx-auto mt-20 gap-6 md:gap-10 lg:gap-20">
      {cards.map((card, index) => (
        <Card
          key={index}
          icon={card.icon}
          title={card.title}
          description={card.description}
        />
      ))}
    </div>
  );
};

export default CardList;
