import { IoCartOutline, IoSearchSharp } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import LogoKanara from "../assets/logokanara.png";
import { signOut } from "firebase/auth";
import { auth } from "../configs/firebase";
import { useNavigate } from "react-router";

export default function Navbar() {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await signOut(auth);
      console.log("Logout Success");
      navigate("/auth/login", { replace: true });
    } catch (error) {
      console.error("Logout Failed:", error);
    }
  }

  return (
    <>
      <div className="w-full bg-white border-b border-zinc-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <img
              src={LogoKanara}
              alt="Kanara Logo"
              className="w-12 h-12 object-contain rounded-sm"
            />
            <span className="text-red-600 text-xl font-bold font-poppins">
              Kanara Fashion
            </span>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex w-full max-w-md items-center gap-3 px-4 py-2 border border-zinc-300 rounded-md shadow-sm">
            <IoSearchSharp className="text-zinc-500 text-xl" />
            <input
              type="text"
              placeholder="Search"
              className="w-full outline-none font-poppins text-zinc-700"
            />
          </div>

          {/* Cart & Logout */}
          <div className="flex items-center gap-6">
            <IoCartOutline className="text-2xl text-zinc-700 cursor-pointer hover:text-red-600 transition" />
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-all"
            >
              <FiLogOut className="text-lg" />
              <span className="font-poppins text-base">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
