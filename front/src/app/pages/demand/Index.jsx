import React from "react";
import Header from "../../shared/components/header/Index.jsx"
import Sidebar from "../../shared/components/sidebar/Index.jsx"
import CadastroDemanda from "./CadastroDemanda.jsx"
import { DemandProvider } from "./DemandContext.js";

function Register() {
  return (
    <DemandProvider> 
      <div>
        <Header />
        <Sidebar />
        <CadastroDemanda />
      </div>
    </DemandProvider>
  );
}
export default Register;