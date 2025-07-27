import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

export default function AdminLayout() {
  const [isLoadPage, setLoadPage] = useState(true);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (!user) {
      navigate("/auth/login");
    } else if (user) {
      navigate("/");
    }
    setLoadPage(false);
  }, []);

  if (isLoadPage) {
    return <div>Loading Admin Layout...</div>;
  }
  return (
    <>
      {/* <header>Admin Side</header> */}
      <Outlet />
    </>
  );
}
