import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import AuthContextProvider, { ProtectedRoute } from "./contexts/AuthContext"; // tambahan untuk context
import AdminLayout from "./layouts/AdminLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
      // ditambah dengan "ProtectedRoute"
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
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
