import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/AuthContext";

export default function MainLayout() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      navigate("/auth/login", { replace: true });
    }
  }, []);

  return (
    <>
      <Navbar />
      <header>-- Home Side --</header>
      <Outlet />
    </>
  );
}
