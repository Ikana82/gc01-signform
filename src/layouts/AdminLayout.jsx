import { useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Outlet, useNavigate } from "react-router";
import { auth } from "../configs/firebase";
import { AuthContext } from "../contexts/AuthContext";

export default function AdminLayout() {
  const [isLoadPage, setLoadPage] = useState(true);
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  useEffect(() => {
    if (!user) {
      navigate("/auth/login");
    } else if (user) {
      navigate("/");
    }
    setLoadPage(false);
  }, []);

  if (isLoadPage) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {/* <header>Admin Side</header> */}
      <Outlet />
    </>
  );
}
