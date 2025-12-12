import { useEffect, useState } from "react";
import { useIsLoggedIn } from "../api/hook/auth";
import { Outlet, useNavigate } from "react-router-dom";

export default function ProtectedRoute() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { mutate, isSuccess, isError } = useIsLoggedIn();

  useEffect(() => {
    mutate();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setLoading(false);
    }

    if (isError) {
      navigate("/login", { replace: true });
    }
  }, [isSuccess, isError, navigate]);

  if (loading) {
    return (
      <div className="loaderContainer">
        <div className="loaderWrapper">
          <div className="loader"></div>
          <p className="shimmer-text">Processing...</p>
        </div>
      </div>
    ); // render nothing until auth is checked
  }
  return <Outlet />;
}
