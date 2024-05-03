import React from "react"
import Header from "../../shared/components/header/Index.jsx"
import Sidebar from "../../shared/components/sidebar/Index.jsx"
import CadastroUsuario from "./CadastroUsuario.jsx"

function Register() {
  return (
    <div>
      <Header />
      <Sidebar />
      <CadastroUsuario />
    </div>
  )
}

export default Register
