import React, { createContext, useState } from "react";

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState("");

  const updateMessage = (newMessage) => {
    setMessage(newMessage);
  };

  const deleteMessage = () => {
    setMessage("");
  };

  return (
    <MessageContext.Provider value={{ message, updateMessage, deleteMessage }}>
      {children}
    </MessageContext.Provider>
  );
};
