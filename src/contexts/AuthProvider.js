import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { httpLogin } from "../services/auth";

const AuthContext = React.createContext({
  user: undefined,
  login: () => {},
  logout: () => {},
  changePassword: () => {},
});

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = React.useState(undefined);
  const navigate = useNavigate();
  const location = useLocation();

  const login = async (username, password, type = "login") => {
    httpLogin(username, password, type)
      .then((res) => {
        localStorage.setItem("Auth-Token", res.data.sesijski_kljuc);
        setCurrentUser(res.data);
      })
      .catch((err) => console.log(err));
  };
  
  const logout = () => {
    setCurrentUser(undefined);
    localStorage.clear("Auth-Token");
    navigate("/login");
  };

  const changePassword = (currentPassword, newPassword) => {};

  React.useEffect(() => {login(localStorage.getItem("Auth-Token"), null, "fetch")}, []);

  React.useEffect(() => {
    if (!currentUser) {
      if (!location.pathname === "/login") navigate("/login");
    } else {
      if (location.pathname === "/login") navigate("/dashboard");
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{ currentUser, login, logout, changePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return React.useContext(AuthContext);
}
