import React, { useState, useEffect } from 'react'
import { FaBars } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import Sidebar from '../sidebar/Index.jsx'
import Logo from "../../../assets/our-plan-logo.svg"
import { IoIosLogOut } from "react-icons/io"
import { Container, UserInfoContainer, UserEmail, LogoutContainer } from './Styles.js'
import ModalLogout from '../modal/ModalSaidaSist.jsx'


const Header = () => {
  const [userEmail, setUserEmail] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserEmail(user.email);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const confirmLogout = () => {
    handleLogout();
    setShowLogoutModal(false);
  };

  return (
    <>
      <Container>
        <FaBars onClick={toggleSidebar} />
        <Link to="/kanban">
          <img src={Logo} alt="Logo" />
        </Link>
        {sidebarOpen && <Sidebar active={setSidebarOpen} />}
        <UserInfoContainer>
          <UserEmail>
            {userEmail}
            <hr style={{ width: '100%', borderTop: '1px solid white', margin: '4px 0 0 0' }} />
          </UserEmail>
          <IoIosLogOut size={32} style={{ color: 'white', cursor: 'pointer' }} onClick={() => setShowLogoutModal(true)} />
        </UserInfoContainer>
      </Container>
      <div style={{ height: '70px' }}></div>
      <ModalLogout 
        show={showLogoutModal} 
        onConfirm={confirmLogout} 
        onCancel={() => setShowLogoutModal(false)} 
      />
    </>
  );
};

export default Header
