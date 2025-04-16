import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const DoctorPrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  // Check if user is logged in and is an admin
  const isManager = userInfo && userInfo.role === "Management";

  // Render the protected routes only if the user is logged in and is an admin
  return isManager ? <Outlet /> : <Navigate to="/login" replace />;
};

export default DoctorPrivateRoute;
