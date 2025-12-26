import { createContext, useContext, useEffect, useState } from "react";


export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [itemDetails, setItemDetails] = useState([]);
  const authorizationToken = `Bearer ${token}`;

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  let isLoggedIn = !!token;
  console.log("bbbbbb: ", token);
  

  // tackling the logout functionality 
  const LogoutUser = () => {
    setToken("");
    isLoggedIn = false;
    return localStorage.removeItem("token");
  }

  // JWT AUTHENTICATION - to get the currently loggedIn user data

  const userAuthentication = async () => {
    // Only try to fetch user data if a token exists
    if (!token) {
      setUser(""); // Clear user data if not logged in
      return;
    }
    try {
      const response = await fetch("https://lost-found-app-api.vercel.app/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: authorizationToken
        }
      });
      console.log("skjjbv", response);


      if (response.ok) {
        const data = await response.json();
        console.log("user data", data.userData);

        setUser(data.userData);
      }
    } catch (error) {
      console.error("Error fetching user data");

    }
  };

  // to fetch the card/item details from the database

  const getItemDetails = async () => {
    try {
      const response = await fetch("https://lost-found-app-api.vercel.app/api/data/", {
        method: "GET"
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.msg);
        setItemDetails((data.msg).reverse());
      }
    } catch (error) {
      console.log(`Item details frontend error: ${error}`);
    }
  }

  useEffect(() => {
    getItemDetails();
    userAuthentication();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, user, itemDetails, getItemDetails, authorizationToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};