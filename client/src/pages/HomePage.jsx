import { signOut } from "firebase/auth";
import { auth } from "../configs/firebase";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function HomePage() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  async function handleLogout() {
    try {
      await signOut(auth);
      console.log("Logout Success");
      navigate("/auth/login", { replace: true });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {/* <div className="text-lg font-medium text-gray-700 mb-4">Ada Content</div> */}
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out"
      >
        Logout
      </button>
    </>
  );
}
