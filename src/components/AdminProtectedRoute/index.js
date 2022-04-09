import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const AdminProtectedRoute = ({ component: Component, ...rest }) => {
  const { user } = useSelector((state) => state.global);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (user && user.isAdmin) {
          return <Component {...props} />;
        }

        return (
          <Navigate
            to={{
              pathname: '/account/login',
              state: {
                // eslint-disable-next-line react/prop-types
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
};

export default AdminProtectedRoute;
