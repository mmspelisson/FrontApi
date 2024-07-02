import React from 'react';
import { Container, Content } from './Styles.js';
import { Link } from 'react-router-dom';
import { FaTimes, FaUserAlt, FaIdCardAlt, FaRegFileAlt } from 'react-icons/fa';
import SidebarItem from '../sidebaritem/Index.jsx';

const Sidebar = ({ active, isAdmin }) => {
  const closeSidebar = () => {
    active(false);
  };

  return (
    <Container sidebar={active}>
      <FaTimes onClick={closeSidebar} />
      <Content>
        <Link to="/register">
          <SidebarItem Icon={FaUserAlt} Text="Cadastrar Usuários" visible={!isAdmin} />
        </Link>

        <Link to="/demand">
          <SidebarItem Icon={FaRegFileAlt} Text="Cadastrar Demanda" visible={!isAdmin} />
        </Link>

        <Link to="/sector">
          <SidebarItem Icon={FaIdCardAlt} Text="Cadastrar Setor" visible={!isAdmin} />
        </Link>
      </Content>
    </Container>
  );
};

export default Sidebar;