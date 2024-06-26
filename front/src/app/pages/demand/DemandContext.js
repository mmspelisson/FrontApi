import React, { createContext, useContext, useState } from 'react';

const DemandContext = createContext();

export function useDemandContext() {
  return useContext(DemandContext);
}

export function DemandProvider({ children }) {
  const [demands, setDemands] = useState([]);

  const addDemand = (demand) => {
    setDemands((prevDemands) => [...prevDemands, demand]);
  };

  return (
    <DemandContext.Provider value={{ demands, addDemand }}>
      {children}
    </DemandContext.Provider>
  );
}
