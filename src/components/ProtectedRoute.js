import React from "react";
import { Route, Navigate } from "react-router-dom";
const ProtectedRoute = (props) => {
  const { component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={(renderProps) => {
        if (localStorage.getItem("token")) {
          return <Component {...renderProps} />;
        } else {
          return <Navigate to="/" />;
        }
      }}
    />
  );
};
export default ProtectedRoute;
