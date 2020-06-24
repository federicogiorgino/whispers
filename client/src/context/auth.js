import React, { useReducer, createContext } from "react";
import jwtDecode from "jwt-decode";

// sets the initial user to be null prior to login/register
const initialState = { user: null };

if (localStorage.getItem("token")) {
  //gets the token
  const decodedToken = jwtDecode(localStorage.getItem("token"));
  //checks if is expired and then removes it
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("token");
  }
  // if not expired sets the user to decodedToken
  else {
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext({ user: null, login: (userData) => {}, logout: () => {} });

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        //spread the existing state
        ...state,
        //sets the user to the existing data
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        //sets the user back to null
        user: null,
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const login = (userData) => {
    //keep us logged in after page refresh
    localStorage.setItem("token", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };

  const logout = () => {
    //removes token on logout
    localStorage.removeItem("token");

    dispatch({
      type: "LOGOUT",
    });
  };

  return <AuthContext.Provider value={{ user: state.user, login, logout }} {...props} />;
}

export { AuthContext, AuthProvider };
