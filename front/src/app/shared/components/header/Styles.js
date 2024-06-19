import styled from 'styled-components'
import { IoIosLogOut } from "react-icons/io"

export const Container = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  background-color: #151F6D; 
  box-shadow: 0 0 20px 3px;
  padding-left: 10px; 
  padding-right: 20px; 

  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;

  > svg {
    color: white;
    width: 30px;
    height: 30px;
    margin-left: 20px;
    cursor: pointer;
  }

  > img {
    width: 65px;
    height: auto; 
    margin-right: 20px; 
    margin-left: 20px; 
  }

  .sidebar-open {
    overflow-x: hidden; 
  }

  .sidebar-open main {
    transform: translateX(250px); 
    transition: transform 0.3s ease; 
  }
`;

export const UserInfoContainer = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  color: white;
`;

export const UserEmail = styled.span`
  margin-right: 10px;
  font-size: 16px;
`;

export const LogoutContainer = styled.div`
  display: flex;
  align-items: center;

  a {
    display: flex;
    align-items: center;
    color: white;
    text-decoration: none;
  }
`;


export const LogoutIcon = styled(IoIosLogOut)`
  cursor: pointer;
  width: 35px; 
  height: 35px;
  color: white; 
`;
