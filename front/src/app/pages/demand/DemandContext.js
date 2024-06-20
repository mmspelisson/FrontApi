// import React, { createContext, useContext, useState } from 'react';

// const DemandContext = createContext();

// export const useDemandContext = () => useContext(DemandContext);

// export const DemandProvider = ({ children }) => {
//     const [demands, setDemands] = useState([]);

//     const addDemand = (newDemand) => {
//         setDemands(prevDemands => [...prevDemands, newDemand]);
//     };

//     return (
//         <DemandContext.Provider value={{ demands, addDemand }}>
//             {children}
//         </DemandContext.Provider>
//     );
// };

// export default DemandContext;
