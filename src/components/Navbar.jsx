import React from "react";
import { useEffect, useState } from "react";
import { IoMdSearch, IoMdSettings } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import { BsEnvelopeFill } from "react-icons/bs";

export default function Navbar() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <nav className="h-full bg-white flex items-center justify-between px-8 shadow-md py-3">
      <div className="flex items-center flex-grow max-w-md gap-2 bg-white border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-1 focus-within:ring-red-500">
        <IoMdSearch className="text-neutral-400 text-xl" />
        <input
          type="text"
          placeholder="Search anything..."
          className="w-full outline-none"
        />
      </div>

      <div className="flex items-center gap-3 ml-auto">
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
          <BsEnvelopeFill className="text-2xl" />
        </button>

        <div className="flex items-center gap-2 cursor-pointer">
          <img
            className="w-9 h-9 rounded-full object-cover"
            src="https://placehold.co/40x40"
            alt="User Profile"
          />
          <span className="text-neutral-800 text-base font-medium whitespace-nowrap hidden md:block">
            {username || "Guest"}
          </span>
        </div>
      </div>
    </nav>
  );
}
