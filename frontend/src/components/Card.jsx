/* eslint-disable no-unused-vars */
import React from "react";

const cards = [
  {
    logo: "🌟",
    title: "Card One",
    paragraph: "We are using cookies for no reason.",
  },
  {
    logo: "🚀",
    title: "Card Two",
    paragraph: "Explore new possibilities with us.",
  },
  {
    logo: "🔥",
    title: "Card Three",
    paragraph: "Stay ahead with blazing-fast performance.",
  },
  {
    logo: "💡",
    title: "Card Four",
    paragraph: "Innovative solutions for a brighter future.",
  },
  {
    logo: "🌐",
    title: "Card Five",
    paragraph: "Connecting the world, one step at a time.",
  },

  {
    logo: "🌐",
    title: "Card six",
    paragraph: "Connecting the world, one step at a time.",
  },
];


const Card = () => {
  return (
    <div
      id="maindiv"
      className="w-screen grid grid-cols-1 mt-20 items-center justify-items-center gap-5 md:grid-cols-2 lg:grid-cols-3 "
    >
      {cards.map((card, index) => (
        <div
          key={index}
          id="card"
          className="card bg-neutral text-neutral-content w-80 h-60 flex-shrink-0 p-5 rounded-lg shadow-lg"
        >
          <div className="card-body flex flex-col items-center text-center">
            <h1 className="card-title text-4xl mb-2">{card.logo}</h1>
            <h2 className="text-2xl font-semibold mb-2">{card.title}</h2>
            <p className="text-base">{card.paragraph}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
