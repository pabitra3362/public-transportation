import bgimg from "../assets/teambg.avif";

const profiles1 = [
  {
    profile: "https://pickme-html.pixelsigns.art/img/team/team_3.png",
    name: "Pabitra Mohanty",
    profession: "Software Engineer",
  },
  {
    profile: "https://pickme-html.pixelsigns.art/img/team/team_3.png",
    name: "Ansari MHOD Sehzad",
    profession: "Web Developer",
  },
  {
    profile: "https://pickme-html.pixelsigns.art/img/team/team_3.png",
    name: "Omkar Pattnaik",
    profession: "Data Scientist",
  },
];

const Team = () => {
  return (
    <>
      <div className="relative h-96 w-full flex flex-col justify-center items-center text-white">
        <img
          className="absolute top-0 left-0 w-full h-full object-cover brightness-50"
          src={bgimg}
          alt="Background"
        />
        <h1 className="relative font-bold text-5xl md:text-6xl lg:text-7xl">
          Team
        </h1>
        <div className="relative breadcrumbs text-lg md:text-xl lg:text-2xl">
          <ul className="flex gap-2">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/Team" className="text-yellow-300">
                Our Team
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="w-full mx-auto my-20 px-4 md:px-10 lg:px-20">
        <h1 className="text-center p-5 text-3xl font-semibold tracking-widest text-yellow-300">
          OUR TEAM
        </h1>
        <h2 className="text-center p-5 text-2xl md:text-4xl  tracking-tight">
          The Best of Professionals
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-center mt-20">
          {profiles1.map((profile, index) => (
            <div
              key={index}
              className="relative w-full max-w-sm mx-auto shadow-xl rounded-lg overflow-hidden group"
            >
              <figure className="w-full h-[25rem] flex justify-center items-center overflow-hidden">
                <img
                  src={profile.profile}
                  alt="Profile Photo"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </figure>
              <div className="absolute inset-3 rounded-xl flex flex-col justify-center items-center bg-yellow-200 bg-opacity-80 text-white opacity-0 group-hover:opacity-100 transition-all">
                <h2 className="text-lg md:text-xl font-bold text-black">
                  {profile.name}
                </h2>
                <p className="text-gray-900 text-sm md:text-base">
                  {profile.profession}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full px-4 md:px-10 lg:px-20 py-16 flex flex-col lg:flex-row gap-16">
        <div className="w-full lg:w-1/2 flex flex-col gap-5">
          <h3 className="uppercase tracking-wide font-medium text-yellow-300 text-2xl">
            Shortly About Us
          </h3>
          <h1 className="uppercase text-2xl md:text-3xl font-bold text-black">
            Our Goal
          </h1>
          <p className="text-lg md:text-xl opacity-70">
            At our core, we strive for excellence, innovation, and unwavering
            commitment to success...
          </p>
        </div>
        <div className="w-full lg:w-1/2 p-5 flex flex-col gap-8">
          {[
            "Maximum Travel-Time",
            "Happy-Passengers",
            "Success Stories",
            "Our Honors",
          ].map((goal, index) => (
            <div key={index} className="flex justify-between border-b-2 py-3">
              <p className="text-xl hover:text-yellow-300 duration-300">{`0${
                index + 1
              }`}</p>
              <p className="uppercase text-xl hover:text-yellow-300 duration-300">
                {goal}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Team;
