// // navigation/context/UserContext.js
// import { createContext, useContext, useState } from "react";

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const login = (userData) => setUser(userData);
//   const logout = () => setUser(null);

//   return (
//     <UserContext.Provider value={{ user, login, logout }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => useContext(UserContext);
// navigation/context/UserContext.js
import { createContext, useContext, useEffect, useState } from "react";
import users from "../../data/users.json"; // 👈 importa tu lista local

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 🔹 Auto login (usuario por defecto)
  useEffect(() => {
    const defaultUser = users.find((u) => u.correo === "cliente@gmail.com");
    if (defaultUser) {
      setUser(defaultUser);
    }
  }, []);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
