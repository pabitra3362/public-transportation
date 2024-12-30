import React from "react";
import bgimg from "../assets/contactBg.jpg";
import { IoLocationOutline } from "react-icons/io5";
import { MdPhoneAndroid, MdOutlineMailOutline } from "react-icons/md";
import { RiFacebookLine } from "react-icons/ri";

const Contacts = () => {
  return (
    <div>
      <img
        className="h-screen w-[100%] fixed top-0 left-0 -z-50 brightness-50"
        src={bgimg}
        alt={bgimg}
      />

      {/* Hero Section */}
      <div className="bg-transparent h-96 w-full text-white grid justify-items-center content-center items-center gap-3 md:gap-7">
        <h1 className="font-bold text-5xl md:text-6xl lg:text-7xl">Contact</h1>
        <div className="breadcrumbs text-lg md:text-xl lg:text-2xl">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/contact" className="text-yellow-400">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Content Section */}
      <div className="contact-content bg-white min-h-screen w-full">

        {/* form and address */}
        <div className="form-address">
          {/* left */}
          <div className="left grid justify-items-center items-center px-3 gap-4">
            <p className="text-black font-bold text-xl">We Are Always Open For You!!!</p>
            <p>At Safar, we are always open for you, offering 24/7 taxi bookings whenever you need a ride. Whether it&apos;s day or night, our reliable service ensures you're never left stranded. With easy online booking, punctual drivers, and a fleet of well-maintained vehicles, we make your travel experience smooth and stress-free. No matter the time or destination, we&apos;re here to get you where you need to go, anytime, anywhere. Your convenience is our priority!</p>

            <div className="address grid gap-5">
              <div className="first-item flex justify-start items-start gap-3">
                <div className="icon">
                  <IoLocationOutline className="size-10 text-yellow-400" />
                </div>
                <div className="details grid gap-2">
                  <p className="font-bold text-black text-xl">Address:</p>
                  <p className="text-lg">214, Navsari Main Road, opp. Swami Narayan Temple, Ranchhod Nagar, Harinagar-2, Harinagar, Bhestan, Surat, Gujarat 394210</p>
                </div>
              </div>
              <div className="second-item flex justify-start items-start gap-3">
                <div className="icon">
                  <MdPhoneAndroid className="size-10 text-yellow-400" />
                </div>
                <div className="details grid gap-2">
                  <p className="font-bold text-black text-xl">Phone:</p>
                  <p className="text-lg hover:text-yellow-400 duration-200"><a href="tel:1234567890">+91 1234567890</a></p>
                </div>
              </div>
              <div className="third-item flex justify-start items-start gap-3">
                <div className="icon">
                  <MdOutlineMailOutline className="size-10 text-yellow-400" />
                </div>
                <div className="details grid gap-3">
                  <p className="font-bold text-black text-xl">Email:</p>
                  <p className="text-lg hover:text-yellow-400 duration-200"><a href="mailto:safar24@gmail.com">Safar24@gmail.com</a></p>
                </div>
              </div>
            </div>

            <div className="icons">
              <div className=" group border border-black p-2 rounded-full hover:bg-yellow-400 hover:border-none duration-300">
              <a href="#" >
              <RiFacebookLine className="size-6 group-hover:text-white duration-200" />
              </a>
              </div>
            </div>
          </div>


          {/* right */}
          <div className="right">

          </div>  
        </div>
      </div>  
    </div>
  );
};

export default Contacts;
