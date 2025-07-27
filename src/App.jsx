import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import AuthContextProvider from "./contexts/AuthContext";
import AdminLayout from "./layouts/AdminLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import EditproductPage from "./pages/EditProductPage";
import AddproductPage from "./pages/AddProductPage";
import Navbar from "./components/Navbar";
import AddCategoryPage from "./pages/AddCategoryPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "add",
        element: <AddproductPage />,
      },
      {
        path: "edit/:id",
        element: <EditproductPage />,
      },
      {
        path: "add-category",
        element: <AddCategoryPage />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AdminLayout />,
    children: [
      {
        path: "login", // Hindari memberikan / pada children yang berada di page yang sama
        element: <LoginPage />,
      },
      {
        path: "register", // Hindari memberikan / pada children
        element: <RegisterPage />,
      },
    ],
  },
]);

function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;
