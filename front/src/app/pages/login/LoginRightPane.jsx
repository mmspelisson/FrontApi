import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (values) => {
    console.log("Tentando logar com valores:", values);

    Axios.post("http://localhost:3001/login", {
      email: values.email,
      senha: values.senha,
    }).then((response) => {
      console.log("Resposta da API:", response.data);
      setMessage(response.data.msg);
      if (response.data.msg === "Usuário logado") {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/kanban');  
      }
    }).catch(error => {
      console.error("Erro ao fazer login:", error);
      setMessage(error.response?.data?.msg || "Erro ao fazer login");
    });
  };

  const validations = yup.object().shape({
    email: yup.string().email("Email inválido").required("O email é obrigatório"),
    senha: yup.string().required("A senha é obrigatória"),
  });

  return (
    <RightPaneContainer>
      <Title>Login</Title>
      <Formik
        initialValues={{ email: '', senha: '' }}
        onSubmit={handleLogin}
        validationSchema={validations}
      >
        <Form>
          <LoginForm>
            <InputWrapper>
              <AccountCircleIcon style={{ position: 'absolute', marginLeft: '10px', marginTop: '12px' }} />
              <Field type="text" name="email" className="form-field" placeholder="Email" as={Input} />
              <ErrorMessage component="span" name="email" className="form-error" />
            </InputWrapper>
            <InputWrapper>
              <LockIcon style={{ position: 'absolute', marginLeft: '10px', marginTop: '12px' }} />
              <Field type={showPassword ? "text" : "password"} name="senha" className="form-field" placeholder="Senha" as={Input} />
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
              <ErrorMessage component="span" name="senha" className="form-error" />
            </InputWrapper>
            <Button type="submit">Entrar</Button>
          </LoginForm>
        </Form>
      </Formik>
      {message && <Message>{message}</Message>}
    </RightPaneContainer>
  );
};

const RightPaneContainer = styled.div`
  width: 50%;
  height: 100vh;
  background-color: #E3DDA1;
  flex: 1;
`;

const Title = styled.h1`
  color: #151F6D;
  font-family: 'Roboto', sans-serif;
  font-weight: 600;
  font-size: 22px;
  text-align: center;
  margin: auto;
  margin-top: 180px;
`;

const LoginForm = styled.div`
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

const Input = styled(Field)`
  background-color: #E3DDA1;
  width: 100%;
  height: 40px;
  padding: 10px;
  padding-left: 40px; 
  border: 1px solid #747474;
  border-radius: 5px;
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

export default Login;
