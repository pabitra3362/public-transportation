/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import bgimg from "../assets/newsbg.avif";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  const fetchdata = async () => {
    setLoading(true); // Start loading
    let response = await fetch(
      "https://newsapi.org/v2/top-headlines?country=us&apiKey=691c85765b6d4ea9b398a08c93f9171b"
    );
    let data = await response.json();
    setNews(shuffleArray(data.articles)); // Shuffle the articles
    setTimeout(() => setLoading(false), 3000); // Stop loading after 3 seconds
  };

  // Function to shuffle an array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    fetchdata();
  }, []);

  if (loading) {
    // Display loading animation
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-yellow-300"></div>
      </div>
    );
  }

  return (
    <>
      <div className="relative h-96 w-full flex flex-col justify-center items-center text-white">
        <img
          className="absolute top-0 left-0 w-full h-full object-cover brightness-50"
          src={bgimg}
          alt="Background"
        />
        <h1 className="relative font-bold text-5xl md:text-6xl lg:text-7xl">
          News
        </h1>
        <div className="relative breadcrumbs text-lg md:text-xl lg:text-2xl">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/News" className="text-yellow-300">
                Top Headlines Here Over The Glob
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="p-10 mb-10">
        {news.map((e, index) => (
          <div className="mb-5" key={index}>
            <div className="card flex flex-col md:flex-row mb-10 p-8 bg-base-100 xl:w-5/6 mx-auto max-w-full md:max-w-4xl shadow-xl">
              {/* Image Section */}
              <figure className="w-full md:w-1/3">
                <img
                  src={
                    e.urlToImage == null
                      ? "https://salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png"
                      : e.urlToImage
                  }
                  alt="Album"
                  className="w-full h-48 md:h-full object-cover"
                />
              </figure>
              {/* Text Section */}
              <div className="card-body w-full md:w-2/3 p-5">
                <h2 className="card-title text-lg md:text-2xl">{e.title}</h2>
                <p className="text-sm md:text-base">{e.description}</p>
                <div className="card-actions lg:justify-end justify-center my-4">
                  <button className="btn bg-yellow-300 duration-500 hover:text-white text-black hover:bg-black ">
                    <a href={e.url} target="_blank" rel="noopener noreferrer">
                      Read More
                    </a>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default News;
