import React from "react";
import bgimg from "../assets/contactBg.jpg";
import { IoLocationOutline } from "react-icons/io5";
import { MdPhoneAndroid, MdOutlineMailOutline } from "react-icons/md";
import { RiFacebookLine, RiTwitterXFill } from "react-icons/ri";
import { FiInstagram } from "react-icons/fi";
import { FaPinterestP } from "react-icons/fa";
import ContactForm from "../components/ContactForm";

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
      <div className="contact-content grid gap-16 bg-slate-200 min-h-screen w-full py-10">
        {/* form and address */}
        <div className="form-address grid gap-10 lg:gap-2 lg:w-[80vw] mx-auto md:flex justify-around items-start px-5 md:px-10 lg:px-20 py-10">
          {/* left */}
          <div className="left grid items-center px-3 gap-4 rounded-lg">
            <p className="text-black font-custom font-bold text-xl lg:text-2xl">
              We Are Always Open For You!!!
            </p>
            <p className="lg:w-[30vw]">
              At Safar, we are always open for you, offering 24/7 taxi bookings
              whenever you need a ride. Whether it&apos;s day or night, our
              reliable service ensures you're never left stranded. With easy
              online booking, punctual drivers, and a fleet of well-maintained
              vehicles, we make your travel experience smooth and stress-free.
              No matter the time or destination, we&apos;re here to get you
              where you need to go, anytime, anywhere. Your convenience is our
              priority!
            </p>

            <div className="address grid gap-5">
              <div className="first-item flex justify-start items-start gap-3">
                <div className="icon">
                  <IoLocationOutline className="size-10 text-yellow-400" />
                </div>
                <div className="details grid gap-2">
                  <p className="font-bold text-black text-xl">Address:</p>
                  <p className="text-lg lg:w-[25vw]">
                    214, Navsari Main Road, opp. Swami Narayan Temple, Ranchhod
                    Nagar, Harinagar-2, Harinagar, Bhestan, Surat, Gujarat
                    394210
                  </p>
                </div>
              </div>

              <div className="second-item flex justify-start items-start gap-3">
                <div className="icon">
                  <MdPhoneAndroid className="size-10 text-yellow-400" />
                </div>
                <div className="details grid gap-2">
                  <p className="font-bold text-black text-xl">Phone:</p>
                  <p className="text-lg hover:text-yellow-400 duration-200">
                    <a href="tel:+911234567890">+91 1234567890</a>
                  </p>
                </div>
              </div>

              <div className="third-item flex justify-start items-start gap-3">
                <div className="icon">
                  <MdOutlineMailOutline className="size-10 text-yellow-400" />
                </div>
                <div className="details grid gap-3">
                  <p className="font-bold text-black text-xl">Email:</p>
                  <p className="text-lg hover:text-yellow-400 duration-200">
                    <a href="mailto:safar24@gmail.com">Safar24@gmail.com</a>
                  </p>
                </div>
              </div>
            </div>

            <p className="font-bold text-lg pl-1">Conect With Us</p>

            <div className="icons flex justify-start items-center gap-3">

              {/* facebook */}
              <div className=" w-fit group border border-black border-opacity-60 p-3 rounded-full hover:bg-yellow-400 hover:border-opacity-0 duration-300">
                <a href="#">
                  <RiFacebookLine className="size-5 group-hover:text-white duration-200" />
                </a>
              </div>

              {/* twitter */}
              <div className=" w-fit group border border-black border-opacity-60 p-3 rounded-full hover:bg-yellow-400 hover:border-opacity-0 duration-300">
                <a href="#">
                  <RiTwitterXFill className="size-5 group-hover:text-white duration-200" />
                </a>
              </div>

              {/* instagram */}
              <div className=" w-fit group border border-black border-opacity-60 p-3 rounded-full hover:bg-yellow-400 hover:border-opacity-0 duration-300">
                <a href="#">
                  <FiInstagram className="size-5 group-hover:text-white duration-200" />
                </a>
              </div>

              {/* pininterest */}
              <div className=" w-fit group border border-black border-opacity-60 p-3 rounded-full hover:bg-yellow-400 hover:border-opacity-0 duration-300">
                <a href="#">
                  <FaPinterestP className="size-5 group-hover:text-white duration-200" />
                </a>
              </div>
            </div>
          </div>

          {/* right */}
          <div className="right">
            <ContactForm />
          </div>
        </div>

        {/* map */}
        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.815203677499!2d72.83883427597932!3d21.15975128326525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e2fe47b1ee1%3A0x504c1d61b4e6e422!2sudhna%20college!5e0!3m2!1sen!2sin!4v1735398344280!5m2!1sen!2sin"
            className="border-0 w-80 md:w-full h-[70vh] md:h-[50vh] lg:h-[70vh] mx-auto rounded-lg"
            allowFullScreen={true}
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
