import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/auth";

//if logged in and manually going to i.e. '/login' the user will be redirected to the homepage
const AuthRoute = ({ component: Component, ...rest }) => {
  const context = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) => (context.user ? <Redirect to='/' /> : <Component {...props} />)}
    />
  );
};

export default AuthRoute;