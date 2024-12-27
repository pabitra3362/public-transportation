/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SlidingTestimonials = () => {
  const testimonials = [
    {
      text: "“This service is phenomenal! It has truly exceeded my expectations and transformed the way I work.”",
      name: "Alexandra Green",
      role: "Marketing Specialist",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      text: "“An amazing experience! The team is extremely professional, and the results speak for themselves.”",
      name: "James Carter",
      role: "Creative Director",
      image:
        "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      text: "“A highly recommended platform for anyone looking to elevate their business to the next level.”",
      name: "Sarah Miller",
      role: "Entrepreneur",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  useEffect(() => {
    
    gsap.to(".hero", {
      backgroundPosition: "center bottom",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    
    gsap.fromTo(
      ".testimonial-block",
      {
        opacity: 0,
        y: 50, 
      },
      {
        opacity: 1,
        y: 0, 
        duration: 1.5,
        scrollTrigger: {
          trigger: ".testimonial-block",
          start: "top 80%",
          end: "top 30%",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <div
      className="hero h-screen flex items-center justify-center"
      style={{
        backgroundImage:
          "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed", 
      }}
    >
      <div className="hero-overlay absolute w-full"></div>
      <div className="hero-content text-neutral-content text-center relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full">
          <h1 className="mb-8 text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            What Our Clients Say
          </h1>
          <Slider {...settings}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-block text-center px-4">
                <img
                  alt={`${testimonial.name}'s Profile`}
                  src={testimonial.image}
                  className="mx-auto h-20 w-20 md:h-28 md:w-28 rounded-full mb-5"
                />
                <blockquote className="lg:text-lg leading-relaxed text-white lg:px-8 max-w-full sm:text-sm text-sm">
                  {testimonial.text}
                </blockquote>
                <p className="mt-4 text-sm md:text-base lg:text-lg text-gray-300">
                  <strong>{testimonial.name}</strong>, {testimonial.role}
                </p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default SlidingTestimonials;
