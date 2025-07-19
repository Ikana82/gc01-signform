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
      <div>Ada Content</div>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}
