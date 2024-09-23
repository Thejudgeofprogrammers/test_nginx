import { Navigate, Outlet } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const PrivateRoute = () => {
  const [cookies] = useCookies(['authToken']);
  return cookies.authToken ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;