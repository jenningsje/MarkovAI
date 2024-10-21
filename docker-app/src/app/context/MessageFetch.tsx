import React, { createContext, useState } from "react";
import { MessageType } from "../types/types";

export interface MessageFetch {
  messageFetching: boolean;
  setMessageFetching: React.Dispatch<React.SetStateAction<boolean>>;
  toggleMessageFetching: () => void;
  messages: MessageType[];
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
  disableinput: boolean;
  setDisableinput: React.Dispatch<React.SetStateAction<boolean>>;
  setFetchedMessages: React.Dispatch<React.SetStateAction<string>>;
  fetchedMessages: string;
  stopFetching: (message: string) => void;
}

export const MessageFetchContext = createContext({
  messageFetching: false,
  setMessageFetching: (value: boolean) => {},
  toggleMessageFetching: () => {},
  messages: [] as MessageType[],
  setMessages: (value: MessageType[]) => {},
  disableinput: false,
  setDisableinput: (value: boolean) => {},
  setFetchedMessages: (value: string) => {},
  fetchedMessages: "",
  stopFetching: (message: string) => {},
});

export const useMessageFetching = () => React.useContext(MessageFetchContext);

const MessageFetchProvider = ({ children }: { children: React.ReactNode }) => {
  const [messageFetching, setMessageFetching] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [disableinput, setDisableinput] = useState(false);
  const [fetchedMessages, setFetchedMessages] = useState("");

  const toggleMessageFetching = () => {
    setMessageFetching(!messageFetching);
  };

  const stopFetching = (socket: any) => {
    socket.emit("stopResponding");
    setMessageFetching(false);
    setDisableinput(false);

    setMessages((prev) => {
      prev[prev.length - 1].message = fetchedMessages;
      return [...prev];
    });
  };

  return (
    <MessageFetchContext.Provider
      value={{
        messageFetching,
        setMessageFetching,
        toggleMessageFetching,
        messages,
        setMessages,
        disableinput,
        setDisableinput,
        setFetchedMessages,
        fetchedMessages,
        stopFetching,
      }}
    >
      {children}
    </MessageFetchContext.Provider>
  );
};

export default MessageFetchProvider;
