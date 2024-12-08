
import { Button, Drawer } from "flowbite-react";
import { useState } from "react";

export function MyDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <div className="flex min-h-[50vh] items-center justify-center">
        <button onClick={() => setIsOpen(true)}>
        <label className="btn btn-circle swap">
              {/* this hidden checkbox controls the state */}
              <input type="checkbox" className="hidden"/>

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
                className={`${!isOpen && "hidden" } fill-current`}
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
        <Drawer.Header title="Drawer" />
        <Drawer.Items>
          start writing from here
        </Drawer.Items>
      </Drawer>
    </>
  );
}
