/* eslint-disable no-unused-vars */
import React from "react";

const cards = [
  {
    logo: "🌟",
    title: "Card One",
    paragraph: "We are using cookies for no reason."
  },
  {
    logo: "🚀",
    title: "Card Two",
    paragraph: "Explore new possibilities with us."
  },
  {
    logo: "🔥",
    title: "Card Three",
    paragraph: "Stay ahead with blazing-fast performance."
  },
  {
    logo: "💡",
    title: "Card Four",
    paragraph: "Innovative solutions for a brighter future."
  },
  {
    logo: "🌐",
    title: "Card Five",
    paragraph: "Connecting the world, one step at a time."
  }
];

const Card = () => {
  return (
    <div
      id="maindiv"
      className="cards p-5 flex gap-4 w-[60%] h-[85%] mx-auto my-auto overflow-x-auto whitespace-nowrap">
      {cards.map((card, index) => (
        <div
          key={index}
          id="card"
          className="card bg-neutral text-neutral-content w-96 h-60 inline-block m-2"
        >
          <div className="card-body items-center text-center">
            <h1 className="card-title">{card.logo}</h1>
            <h1>{card.title}</h1>
            <p>{card.paragraph}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
