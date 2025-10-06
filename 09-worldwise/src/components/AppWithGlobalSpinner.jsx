import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SpinnerFullPage from "./SpinnerFullPage";


export default function AppWithGlobalSpinner({ children }) {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true); // بدء التحميل
    const timer = setTimeout(() => setLoading(false), 300); // مدة spinner
    return () => clearTimeout(timer);
  }, [location]);

  return loading ? <SpinnerFullPage /> : children;
}
