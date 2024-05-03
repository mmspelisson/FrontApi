import React, { useState } from 'react'
import { FaBars } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Sidebar from '../sidebar/Index.jsx'
import Logo from "../../../assets/our-plan-logo.svg"
import { Container } from './Styles.js'

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    document.body.classList.toggle('sidebar-open');
  }

  return (
    <Container>
      <FaBars onClick={toggleSidebar} />
      <Link to="/kanban">
        <img src={Logo} alt="Logo" />
      </Link>
      {sidebarOpen && <Sidebar active={setSidebarOpen} />}
    </Container>
  )
}

export default Header
