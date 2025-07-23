import { useEffect, useState, createContext, useContext } from "react"; // 1 tambahkan usecontext untuk memanggil
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../configs/firebase";
import { Navigate } from "react-router";

export const AuthContext = createContext({
  user: null,
  setUser: () => {},
});

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoadPage, setLoadPage] = useState(true);
  const value = { user, setUser };

  useEffect(() => {
    setLoadPage(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // if (user) {
      setUser(user || null);
      // } else {
      //   setUser(null);
      // }
      setLoadPage(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (isLoadPage) {
    return <div>Loading.....</div>;
  }

  return <AuthContext value={value}>{children}</AuthContext>;
}

// Ini bagian untuk membuat protectedroutenya nanti ya...
export function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  //yang diatas dipindah disini ya
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
}
