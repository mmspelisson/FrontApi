import React, { useState } from 'react';
import styled from 'styled-components';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const RightPane = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <RightPaneContainer>
      <Title>Login</Title>
      <LoginForm>
        <UserInput type="text" placeholder="Nome de usuário" />
        <PasswordInputWithShow
          type={showPassword ? "text" : "password"}
          placeholder="Senha"
        />
        <Button>ENTRAR</Button>
      </LoginForm>
    </RightPaneContainer>
  );
};

const Title = styled.h1`
  color: #151F6D;
  font-family: 'Roboto', sans-serif;
  font-weight: 600;
  font-size: 22px;
  text-align: center;
  margin: auto;
  margin-top: 180px;
`;

const RightPaneContainer = styled.div`
  width: 50%;
  height: 100vh;
  background-color: #E3DDA1;
  flex: 1;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

const Input = styled.input`
  background-color: #E3DDA1;
  width: 445px;
  height: 40px;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #747474;
  border-radius: 5px;
`;

const UserInput = styled(Input)`
  background-image: url(${AccountCircleIcon});
  background-position: 10px center;
  padding-left: 40px;
`;

const PasswordInputWithShow = styled(Input)`
  background-image: url(${LockIcon});
  background-position: 10px center;
  padding-left: 40px;
  color: #151F6D;
  position: relative;

  &:after {
    content: url(${VisibilityOffIcon});
    position: absolute;
    color: #151F6D;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;

const Button = styled.button`
  width: 445px;
  height: 40px;
  background-color: #151F6D;
  color: #E3DDA1;
  font-family: 'Roboto', sans-serif;
  font-weight: 600;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1E2D94;
  }
`;

export default RightPane;
