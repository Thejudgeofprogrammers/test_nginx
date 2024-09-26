import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

const Logout = () => {
  const [, , removeCookie] = useCookies(['authToken', 'userEmail']);

  useEffect(() => {
    removeCookie('authToken');
    removeCookie('userEmail');
    window.location.href = '/login';
  }, [removeCookie]);

  return <h1>Logging out...</h1>;
};

export default Logout;
