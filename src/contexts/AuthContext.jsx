import { useEffect, useState, createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../configs/firebase";

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
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoadPage(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (isLoadPage) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-3">
          <span className="loading loading-spinner text-[#ff0000] w-12 h-12"></span>
          <p className="text-[#ff0000] text-lg font-normal">
            Authenticating...
          </p>
        </div>
      </div>
    );
  }

  return <AuthContext value={value}>{children}</AuthContext>;
}
