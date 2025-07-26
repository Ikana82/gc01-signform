import React from "react";
import { IoIosSearch, IoIosNotifications, IoMdSettings } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

export default function Navbar({ isSidebarOpen }) {
  return (
    <nav
      className={`fixed top-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 transition-all duration-300 ease-in-out z-10 ${
        isSidebarOpen ? "left-64" : "left-20"
      }`}
    >
      <div className="relative flex items-center flex-grow max-w-md ml-4">
        <IoIosSearch className="absolute left-3 text-neutral-400 text-xl" />
        <input
          type="text"
          placeholder="Search anything..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-red-500"
        />
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors text-neutral-500">
          <IoIosNotifications className="text-2xl" />
        </button>

        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors text-neutral-500">
          <IoMdSettings className="text-2xl" />
        </button>

        <div className="flex items-center gap-2 cursor-pointer">
          <img
            className="w-9 h-9 rounded-full object-cover"
            src="https://placehold.co/40x40"
            alt="User Profile"
          />
          <span className="text-neutral-800 text-base font-medium whitespace-nowrap hidden md:block">
            John Doe
          </span>
        </div>
      </div>
    </nav>
  );
}
