import React from 'react'
import { CiFacebook } from "react-icons/ci";
import { CiInstagram } from "react-icons/ci";
import { ImPinterest2 } from "react-icons/im";

const Footer = () => {
  return (
    <div className='bg-slate-900 text-white py-12 px-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-start lg:justify-items-center md:px-8 items-start gap-12'>

        {/* logo */}
      <div className='logo grid justify-items-start items-center gap-7'>
        <div className='logo text-3xl'>LOGO</div>
        <div className='social-links flex justify-start items-center gap-5'>
            <a href="#">
            <CiFacebook className='size-9 hover:text-yellow-400 transition duration-200'/>
            </a>
            <a href="#">
            <CiInstagram className='size-9 hover:text-yellow-400 transition duration-200'/>
            </a>
            <a href="#">
            <ImPinterest2 className='size-8 hover:text-yellow-400 transition duration-200'/>
            </a>
        </div>
        <div className='copyright'>Copyright @ { new Date().getFullYear() } Develop by <span className='text-yellow-400'>3DEVS</span></div>
      </div>

      {/* explore */}
      <div className='explore grid justify-items-start items-center gap-4'>
        <h3 className='font-bold text-white text-2xl font-mono'>Explore</h3>
        <div className='grid justify-items-start items-center gap-2'>
        <a href="#" className='hover:text-yellow-400 transition duration-200 text text-lg'>Company</a>
        <a href="#" className='hover:text-yellow-400 transition duration-200 text text-lg'>Android App</a>
        <a href="#" className='hover:text-yellow-400 transition duration-200 text text-lg'>logo name</a>
        <a href="#" className='hover:text-yellow-400 transition duration-200 text text-lg'>Our News</a>
        <a href="#" className='hover:text-yellow-400 transition duration-200 text text-lg'>Get Taxi</a>
        </div>
      </div>
      
      {/* Usefull Links */}
      <div className='explore grid justify-items-start items-center gap-4'>
        <h3 className='font-bold text-white text-2xl font-mono'>Usefull links</h3>
        <div className='grid justify-items-start items-center gap-2'>
        <a href="/about" className='hover:text-yellow-400 transition duration-200 text text-lg'>About Us</a>
        <a href="#" className='hover:text-yellow-400 transition duration-200 text text-lg'>Reviews</a>
        <a href="/service" className='hover:text-yellow-400 transition duration-200 text text-lg'>Service</a>
        <a href="/taxi" className='hover:text-yellow-400 transition duration-200 text text-lg'>Hire Taxi In Your City</a>
        <a href="/contact" className='hover:text-yellow-400 transition duration-200 text text-lg'>Contacts</a>
        </div>
      </div>
      
      {/* Help */}
      <div className='explore grid justify-items-start items-center gap-4'>
        <h3 className='font-bold text-white text-2xl font-mono'>Help?</h3>
        <div className='grid justify-items-start items-center gap-2'>
        <a href="#" className='hover:text-yellow-400 transition duration-200 text text-lg'>FAQ</a>
        <a href="#" className='hover:text-yellow-400 transition duration-200 text text-lg'>Privacy</a>
        <a href="#" className='hover:text-yellow-400 transition duration-200 text text-lg'>Terms & Conditions</a>
        <a href="#" className='hover:text-yellow-400 transition duration-200 text text-lg'>Feedback</a>
        <a href="#" className='hover:text-yellow-400 transition duration-200 text text-lg'>Reporting</a>
        </div>
      </div>
    </div>
  )
}

export default Footer