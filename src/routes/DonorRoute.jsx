import { Navigate } from "react-router-dom";

import useRole from "../hook/useRole";
import PropTypes from "prop-types";
const HostRoute = ({ children }) => {
  const [data] = useRole();
  const role = data.role;

  if (role === "donor" || role === "admin") return children;
  return <Navigate to="/dashboard" />;
};

export default HostRoute;

HostRoute.propTypes = {
  children: PropTypes.element,
};
