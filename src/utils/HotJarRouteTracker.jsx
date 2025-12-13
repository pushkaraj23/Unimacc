import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const HotjarRouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (window.hj) {
      // For HashRouter, send full hash-based path
      const path = location.pathname + location.search + location.hash;
      window.hj("stateChange", path);
    }
  }, [location]);

  return null;
};

export default HotjarRouteTracker;
