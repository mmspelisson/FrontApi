import React from 'react'
import { Container, Content } from './Styles.js'
import { Link } from 'react-router-dom'
import { FaTimes, FaUserAlt, FaIdCardAlt, FaRegFileAlt } from 'react-icons/fa'
import SidebarItem from '../sidebaritem/Index.jsx'

const Sidebar = ({ active }) => {
    const closeSidebar = () => {
    active(false)
  }

  return (
    <Container sidebar={active}>
      <FaTimes onClick={closeSidebar} />
      <Content>
        <Link to="/register">
        <SidebarItem Icon={FaUserAlt} Text="Cadastrar Usuários" />
        </Link>

        <Link to="/demand">
        <SidebarItem Icon={FaRegFileAlt} Text="Cadastrar Demanda" />
        </Link>

        <Link to="/sector">
        <SidebarItem Icon={FaIdCardAlt} Text="Cadastrar Setor" />
        </Link>
        
      </Content>
    </Container>
  )
}

export default Sidebar
