import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white my-10">
      <section className="w-full px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 lg:gap-36 md:w-[90vw] lg:w-[70vw] rounded-lg mx-auto md:bg-yellow-300">
        <div>
          <span className="block mb-4 text-slate-700 font-medium">
            Be on time
          </span>
          <motion.h3
      className="text-4xl md:text-6xl font-semibold md:text-custom-white"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 2.5, ease: "easeOut" }}
    >
      Ride with Ease, Wherever You Need to Be!
    </motion.h3>
          <p className="text-base md:text-lg text-slate-700 my-4 md:my-6">
            Book a ride in seconds and get to your destination with ease. Our
            reliable drivers are ready to take you wherever you need to go,
            anytime, anywhere.
          </p>
          <div>
            <Button
              onClick={() => navigate("/taxi")}
              className="px-4 py-2 border-black rounded-sm"
              bgColor="bg-black"
            >
              Get Taxi
            </Button>
          </div>
        </div>
        <ShuffleGrid />
      </section>
    </div>
  );
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  {
    id: 1,
    src: "https://images.pexels.com/photos/1521580/pexels-photo-1521580.jpeg",
  },
  {
    id: 2,
    src: "https://images.pexels.com/photos/8247/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    src: "https://images.pexels.com/photos/462867/pexels-photo-462867.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 4,
    src: "https://images.pexels.com/photos/7405/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 5,
    src: "https://images.pexels.com/photos/314374/pexels-photo-314374.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 6,
    src: "https://images.pexels.com/photos/1324990/pexels-photo-1324990.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 7,
    src: "https://images.pexels.com/photos/2399254/pexels-photo-2399254.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 8,
    src: "https://images.pexels.com/photos/876228/pexels-photo-876228.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 9,
    src: "https://images.pexels.com/photos/2570216/pexels-photo-2570216.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 10,
    src: "https://images.pexels.com/photos/1705075/pexels-photo-1705075.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 11,
    src: "https://images.pexels.com/photos/1310781/pexels-photo-1310781.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 12,
    src: "https://images.pexels.com/photos/1662160/pexels-photo-1662160.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 13,
    src: "https://images.pexels.com/photos/296492/pexels-photo-296492.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 14,
    src: "https://images.pexels.com/photos/2360562/pexels-photo-2360562.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 15,
    src: "https://images.pexels.com/photos/69206/pexels-photo-69206.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 16,
    src: "https://images.pexels.com/photos/3652766/pexels-photo-3652766.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
};

export default Hero;
