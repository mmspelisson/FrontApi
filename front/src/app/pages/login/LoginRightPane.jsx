import React, { useState } from 'react';
import styled from 'styled-components';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';

const RightPane = () => {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/auth/login', {
        login,
        senha
      });

      setMessage(response.data.message);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Erro ao conectar ao servidor');
      }
    }
  };

  return (
    <RightPaneContainer>
      <Title>Login</Title>
      <LoginForm onSubmit={handleSubmit}>
        <InputWrapper>
          <AccountCircleIcon style={{ position: 'absolute', marginLeft: '10px', marginTop: '12px' }} />
          <UserInput
            type="text"
            placeholder="Nome de usuário"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <LockIcon style={{ position: 'absolute', marginLeft: '10px', marginTop: '12px' }} />
          <PasswordInputWithShow
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          {showPassword ? (
            <VisibilityIcon
              style={{ position: 'absolute', right: '10px', top: '12px', cursor: 'pointer' }}
              onClick={handleTogglePasswordVisibility}
            />
          ) : (
            <VisibilityOffIcon
              style={{ position: 'absolute', right: '10px', top: '12px', cursor: 'pointer' }}
              onClick={handleTogglePasswordVisibility}
            />
          )}
        </InputWrapper>
        <Button type="submit">ENTRAR</Button>
      </LoginForm>
      {message && <Message>{message}</Message>}
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

const InputWrapper = styled.div`
  position: relative;
  width: 445px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  background-color: #E3DDA1;
  width: 100%;
  height: 40px;
  padding: 10px;
  padding-left: 40px; /* Espaço para os ícones */
  border: 1px solid #747474;
  border-radius: 5px;
`;

const UserInput = styled(Input)`
  padding-left: 40px; /* Espaço para o ícone do usuário */
`;

const PasswordInputWithShow = styled(Input)`
  padding-left: 40px; /* Espaço para o ícone da senha */
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

const Message = styled.p`
  color: #151F6D;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  margin-top: 20px;
  text-align: center;
`;

export default RightPane;
