import { createContext, useContext, useState, useEffect } from "react";

const LoginPopupContext = createContext();

export const useLoginPopup = () => {
  const context = useContext(LoginPopupContext);
  if (!context) {
    throw new Error("useLoginPopup must be used within LoginPopupProvider");
  }
  return context;
};

export const LoginPopupProvider = ({ children }) => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [user, setUser] = useState(null);

  // Check if user is logged in on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    if (stored?.userid) {
      setUser(stored);
    }
  }, []);

  // Auto show popup after 2 seconds if not logged in
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    
    if (!stored?.userid) {
      const timer = setTimeout(() => {
        setShowLoginPopup(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  // Listen for login/logout events
  useEffect(() => {
    const handleStorageChange = () => {
      const stored = JSON.parse(localStorage.getItem("user"));
      if (stored?.userid) {
        setUser(stored);
        setShowLoginPopup(false);
      } else {
        setUser(null);
      }
    };

    window.addEventListener("localStorageUpdated", handleStorageChange);
    return () => window.removeEventListener("localStorageUpdated", handleStorageChange);
  }, []);

  const openLoginPopup = () => setShowLoginPopup(true);
  const closeLoginPopup = () => setShowLoginPopup(false);

  const handleLoginSuccess = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setShowLoginPopup(false);
    window.dispatchEvent(new Event("localStorageUpdated"));
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    setUser(null);
    window.dispatchEvent(new Event("localStorageUpdated"));

    if (window.google) {
      window.google.accounts.id.disableAutoSelect();
    }
  };

  return (
    <LoginPopupContext.Provider
      value={{
        user,
        setUser,
        showLoginPopup,
        openLoginPopup,
        closeLoginPopup,
        handleLoginSuccess,
        handleLogout,
      }}
    >
      {children}
    </LoginPopupContext.Provider>
  );
};