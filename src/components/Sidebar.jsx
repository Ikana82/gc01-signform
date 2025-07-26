import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { signOut } from "firebase/auth";
import { auth } from "../configs/firebase";
import LogoKanara from "../assets/logokanara.png";

import {
  IoIosAddCircle,
  IoIosCard,
  IoIosHome,
  IoMdPerson,
} from "react-icons/io";
import { FaBoxOpen } from "react-icons/fa";
import { TbCategoryFilled } from "react-icons/tb";
import { FiLogOut } from "react-icons/fi";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  async function handleLogout() {
    try {
      await signOut(auth);
      console.log("Logout Success");
      navigate("/auth/login", { replace: true });
    } catch (error) {
      console.error("Logout Failed:", error);
    }
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const iconSize = "text-xl";

  const menuSections = [
    {
      label: "Main Menu",
      items: [
        {
          label: "Dashboard",
          path: "/dashboard",
          icon: IoIosHome,
        },
        {
          label: "Categories",
          path: "/categories",
          icon: TbCategoryFilled,
        },
        {
          label: "Transaction",
          path: "/transactions",
          icon: IoIosCard,
        },
      ],
    },
    {
      label: "Products",
      items: [
        {
          label: "Product List",
          path: "/",
          icon: FaBoxOpen,
        },
        {
          label: "Add Products",
          path: "/add",
          icon: IoIosAddCircle,
        },
      ],
    },
    {
      label: "Admin",
      items: [
        {
          label: "Admin Role",
          path: "/admin-role",
          icon: IoMdPerson,
        },
      ],
    },
  ];

  return (
    <div
      className={`relative h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out ${
        isOpen ? "w-64" : "w-25"
      }`}
    >
      <div className="p-5 flex justify-between items-center">
        <div
          className={`flex items-center gap-3 ${
            !isOpen ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto"
          }`}
        >
          <img
            className="w-8 h-10 object-contain"
            src={LogoKanara}
            alt="Kanara Logo"
          />
          <span className="text-red-600 text-xl font-bold whitespace-nowrap">
            Kanara
          </span>
        </div>

        <button
          onClick={toggleSidebar}
          className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
            isOpen ? "ml-auto" : "mx-auto"
          }`}
          aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isOpen ? (
            <GrFormPrevious className="text-2xl text-neutral-500" />
          ) : (
            <MdNavigateNext className="text-2xl text-neutral-500" />
          )}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-2">
        {menuSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-4">
            {section.label && isOpen && (
              <p className="text-neutral-500 text-xs font-semibold uppercase tracking-wider px-3.5 py-2">
                {section.label}
              </p>
            )}
            <nav className="flex flex-col">
              {section.items.map((item) => {
                const IconComponent = item.icon;
                const active = isActive(item.path);
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`
                      relative flex items-center gap-3 py-2.5 rounded-md text-left
                      transition-colors duration-200
                      ${active ? "bg-red-600" : "hover:bg-gray-100"}
                      ${
                        isOpen ? "px-3.5" : "justify-center w-auto mx-auto"
                      } /* Centered for closed state */
                    `}
                    aria-current={active ? "page" : undefined}
                  >
                    <IconComponent
                      className={`${iconSize} ${
                        active ? "text-white" : "text-neutral-500"
                      }`}
                    />
                    <span
                      className={`
                        flex-1 whitespace-nowrap text-sm
                        ${
                          active
                            ? "text-white font-semibold"
                            : "text-neutral-700 font-normal"
                        }
                        ${!isOpen ? "hidden" : ""}
                      `}
                    >
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      <div className="pb-5 pt-3 border-t border-gray-200">
        <div
          className={`
            mx-auto w-full max-w-[calc(100%-1rem)] px-3.5 py-3 mb-3
            bg-white rounded-lg shadow-sm border border-neutral-200
            flex items-center gap-4 transition-all duration-200
            ${!isOpen ? "justify-center" : ""}
          `}
        >
          <img
            className="w-10 h-10 rounded-full object-cover"
            src="https://placehold.co/40x40"
            alt="User Profile"
          />
          <div className={`flex flex-col ${!isOpen ? "hidden" : ""}`}>
            <span className="text-neutral-800 text-sm font-semibold whitespace-nowrap">
              Dealport
            </span>
            <span className="text-neutral-500 text-sm font-normal whitespace-nowrap overflow-hidden text-ellipsis">
              Mark@thedesigner...
            </span>
          </div>

          {isOpen && (
            <CgProfile className={`${iconSize} text-neutral-500 ml-auto`} />
          )}
        </div>

        <button
          onClick={handleLogout}
          className={`
            mx-auto w-full max-w-[calc(100%-1rem)] px-3.5 py-3
            bg-white rounded-md shadow-sm flex items-center gap-3
            hover:bg-gray-100 transition-colors duration-200
            ${isOpen ? "justify-start" : "justify-center"}
          `}
        >
          <FiLogOut className={`${iconSize} text-teal-950`} />
          <span
            className={`
              flex-1 text-teal-950 text-base font-medium whitespace-nowrap
              ${!isOpen ? "hidden" : ""}
            `}
          >
            Logout
          </span>
        </button>
      </div>
    </div>
  );
}
