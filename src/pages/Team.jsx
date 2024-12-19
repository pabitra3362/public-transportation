/* eslint-disable no-unused-vars */
import React from "react";

const profiles1 = [
  {
    profile: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    name: "Pabitra Mohanty",
    profession: "Software Engineer"
  },
  {
    profile: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    name: "Ansari MHOD Sehzad",
    profession: "Web Developer"
  },
  {
    profile: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    name: "Omkar Pattnaik",
    profession: "Data Scientist"
  }
];

const Team = () => {
  return (
    <div className=" h-[40pc] w-[85%] m-auto mt-20 mb-20">
      <h1 className="text-center p-5 text-3xl font-extrabold tracking-widest text-yellow-400">
        OUR TEAM
      </h1>

      <div className="team p-8 flex gap-5 mt-10">
        {profiles1.map((profile, index) => (
          <div
            key={index}
            className="card bg-base-100 w-96 h-[30pc] shadow-xl ml-5"
          >
            <figure className="px-10 pt-10">
              <img
                src={profile.profile}
                alt="Profile Photo"
                className="rounded-full"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{profile.name}</h2>
              <p>{profile.profession}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
