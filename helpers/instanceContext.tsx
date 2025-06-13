import React, { createContext, useState, useContext, ReactNode } from 'react';

export type InstanceContext = {
  cod_mesa: string | null
  cod_comanda: string | null
  [key: string]: any
};

type InstanceContextType = {
  instance: InstanceContext | null;
  setInstance: (instance: InstanceContext | null) => void;
};

const InstanceContext = createContext<InstanceContextType>({
    instance: null,
    setInstance: () => {},
});

export const useInstance = () => useContext(InstanceContext);

export const InstanceProvider = ({ children }: { children: ReactNode }) => {
  const [instance, setInstance] = useState<InstanceContext | null>(null);

  return (
    <InstanceContext.Provider value={{ instance, setInstance }}>
      {children}
    </InstanceContext.Provider>
  );
};
