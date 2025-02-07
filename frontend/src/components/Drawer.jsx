import { Button, Drawer } from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function MyDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  const menuArr = [
    { text: "Home", link: "/" },
    { text: "Drive", link: "/drive" },
    { text: "About", link: "/about" },
    { text: "Service", link: "/service" },
    { text: "Team", link: "/team" },
    { text: "News", link: "/news" },
    { text: "Contacts", link: "/contact" },
  ];

  return (
    <>
      <div className="flex items-center justify-center">
        <button onClick={() => setIsOpen(true)}>
          <label className="btn btn-circle swap bg-transparent">
            {/* this hidden checkbox controls the state */}
            <input type="checkbox" className="hidden" />

            {/* hamburger icon */}
            <svg
              className={`${isOpen && "hidden"} fill-current`}
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
            </svg>

            {/* close icon */}
            <svg
              className={`${!isOpen && "hidden"} fill-current`}
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
            </svg>
          </label>
        </button>
      </div>
      <Drawer open={isOpen} onClose={handleClose}>
        <Drawer.Header title="Safar" />
        <Drawer.Items>
          <div className="font-bold grid justify-items-center items-center gap-2 text-lg">
            {menuArr.map((item, index) => (
              <div key={index} onClick={handleClose}>
                <Link to={item.link}>{item.text}</Link>
              </div>
            ))}
            <div className="flex justify-center items-center gap-1 text-lg font-bold">
              <div className="text-yellow-400">+91 123</div>
              <div className="text-black">4567890</div>
            </div>
            <div>
            <Link to="/user-signup">
            <button
            onClick={handleClose}
              className="border border-black border-opacity-60 px-3 py-2 rounded-lg font-bold hover:bg-black hover:text-white duration-200"
            >
              Sign-Up
            </button>
          </Link>
            </div>
          </div>
        </Drawer.Items>
      </Drawer>
    </>
  );
}
