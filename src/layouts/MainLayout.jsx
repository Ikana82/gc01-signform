import { useContext, useEffect, useState } from "react"; // Tambahkan useState
import { Outlet, useNavigate } from "react-router"; // Pastikan dari 'react-router-dom'
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/AuthContext";
import Sidebar from "../components/Sidebar";

export default function MainLayout() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State untuk mengontrol sidebar

  // Fungsi untuk mengontrol buka/tutup sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    console.log("pengecekan user di MainLayout");
    if (!user) {
      navigate("/auth/login", { replace: true });
    }
  }, [user, navigate]); // Tambahkan user dan navigate ke dependency array

  return (
    <div className="flex min-h-screen bg-gray-50">
      {" "}
      {/* Container utama flex */}
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      {/* Konten Utama (Navbar + Outlet) */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "ml-6" : "ml-6" // Sesuaikan margin kiri sesuai lebar sidebar
        }`}
      >
        {/* Navbar */}
        <Navbar isSidebarOpen={isSidebarOpen} className="p-6 pb-2" />

        {/* Outlet (Konten Halaman Spesifik) */}
        <main className="flex-1 p-6 pt-12">
          {" "}
          {/* Tambahkan padding atas untuk menghindari tumpang tindih dengan navbar */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
