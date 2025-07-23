import { useEffect } from "react";
import { auth } from "../configs/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Outlet, useNavigate } from "react-router";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (!user) {
        navigate("/auth/login", { replace: true });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Navbar />
      <header>-- Home Side --</header>
      <Outlet />
    </>
  );
}
