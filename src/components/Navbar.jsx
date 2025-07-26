import React from "react";
import { IoIosSearch, IoIosNotifications, IoMdSettings } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

export default function Navbar() {
  return (
    <nav className="h-full bg-white flex items-center justify-between px-8">
      <div className="flex items-center flex-grow max-w-md">
        {/* <IoIosSearch className="left-3 text-neutral-400 text-xl" /> */}
        <input
          type="text"
          placeholder="Search anything..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-red-500"
        />
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <button
          className="p-2 rounded-full hover:bg-gray-100 transition-colors text-neutral-500"
          aria-label="Notifications"
        >
          <IoIosNotifications className="text-2xl" />
        </button>

        <button
          className="p-2 rounded-full hover:bg-gray-100 transition-colors text-neutral-500"
          aria-label="Settings"
        >
          <IoMdSettings className="text-2xl" />
        </button>

        <div className="flex items-center gap-2 cursor-pointer">
          <img
            className="w-9 h-9 rounded-full object-cover"
            src="https://placehold.co/40x40"
            alt="User Profile"
          />
          <span className="text-neutral-800 text-base font-medium whitespace-nowrap hidden md:block">
            Ika Nuraisma
          </span>
        </div>
      </div>
    </nav>
  );
}
