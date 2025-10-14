import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // or "auto" if you don’t want animation
    });
  }, [pathname, search]); // runs on every route or query change

  return null;
};

export default ScrollToTop;
