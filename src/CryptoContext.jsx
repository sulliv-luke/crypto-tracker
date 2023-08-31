import { createContext, useContext, useEffect, useState } from "react";

const Crypto = createContext();

// eslint-disable-next-line react/prop-types
const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("EUR");
  const [symbol, setSymbol] = useState("€");

  useEffect(() => {
    if (currency === "EUR") setSymbol("€");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);

  return (
    <Crypto.Provider value={{ currency, setCurrency, symbol }}>
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
