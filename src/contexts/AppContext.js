import React from "react";

const initialState = {
  inputArray: [],
  dataArray: [],
};

const AppContext = React.createContext(initialState);

export const AppProvider = ({ children }) => {
  const [inputArray, setInputArray] = React.useState([]);
  const [dataArray, setDataArray] = React.useState([]);

  return (
    <AppContext.Provider
      value={{ inputArray, setInputArray, dataArray, setDataArray }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
