import { signOut } from "firebase/auth";
import { auth } from "../configs/firebase";
import { useNavigate } from "react-router";

export default function HomePage() {
  const navigate = useNavigate();
  async function handleLogout() {
    try {
      const result = await signOut(auth);
      console.log(result);
      navigate("/auth/login");
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
