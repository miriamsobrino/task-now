import { createContext, useContext, useState } from 'react';

interface AppContextType {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);

  return (
    <AppContext.Provider value={{ loading, setLoading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('No context');
  }
  return context;
};
