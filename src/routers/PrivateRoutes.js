import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useStoreState((state) => state.auth.authData);
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );
};

export default PrivateRoute;
