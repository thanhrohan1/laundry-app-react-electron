import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Auth Checker
import store from '../store';
const { isAuthenticated } = store.getState().auth.authData;

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && restricted ? (
          <Redirect to='/dashboard' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
