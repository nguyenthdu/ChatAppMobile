import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  return (
    <AppContext.Provider value={{ messages, setMessages }}>
      {children}
    </AppContext.Provider>
  );
};

export const useChatContext = () => useContext(AppContext);
