import useAuth from '../hooks/useAuth';
import { css } from '@emotion/react';
import RingLoader from 'react-spinners/RingLoader';
import { Navigate, useLocation } from 'react-router-dom';

const override = css`
  margin: 35vh auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AdminRoute = ({ children }) => {
  let location = useLocation();
  const { user, admin, isLoading } = useAuth();

  if (isLoading) {
    return (
      <RingLoader
        css={override}
        size={150}
        color={'#f59e0b'}
        loading={isLoading}
      />
    );
  }

  if (user.email && admin) {
    return children;
  }

  return <Navigate to="/dashboard" state={{ from: location }} replace />;
};

export default AdminRoute;
