import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { getUserBalance } from "../../../services/api";

interface BalanceContextType {
  userID: number | null;
  balance: number;
  loading: boolean;
  setUserID: React.Dispatch<React.SetStateAction<number | null>>;
}

const BalanceContext = createContext<BalanceContextType | undefined>(undefined);

interface BalanceProviderProps {
  children: ReactNode;
}

export const BalanceProvider = ({ children }: BalanceProviderProps) => {
  const [userID, setUserID] = useState<number | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchBalance = async () => {
      if (userID !== null) {
        setLoading(true);
        try {
          const userBalance = await getUserBalance(userID);
          setBalance(userBalance);
        } catch (error) {
          console.error("Error fetching balance", error);
          setBalance(0);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchBalance();
  }, [userID]);
  return <BalanceContext.Provider value={{ userID, balance, loading, setUserID }}>{children}</BalanceContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useBalance = () => {
  const context = useContext(BalanceContext);
  if (context === undefined) {
    throw new Error("useBalance must be used within a balanceprovider");
  }
  return context;
};
