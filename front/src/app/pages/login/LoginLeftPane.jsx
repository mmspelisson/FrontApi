import React from 'react';
import styled from 'styled-components';
import LogoImage from '../../assets/our-plan-logo2.svg';

const LeftPane = () => {
  return (
    <LeftPaneContainer>
      <Title>Bem-vindo</Title>
      <Subtitle>Você pode acessar com uma conta existente.</Subtitle>
      <StyledLogo src={LogoImage} alt="Logo" />
    </LeftPaneContainer>
  );
};

const LeftPaneContainer = styled.div`
  width: 50%;
  height: 100vh;
  background-color: #151F6D;
  flex: 1;
`;

const StyledLogo = styled.img`
  width: 800px;
  height: 580px;
  margin-left: 20px;
  margin-top: 180px; 
`;

const Title = styled.h1`
  color: #E3DDA1;
  font-family: 'Roboto Serif', serif;
  font-size: 55px;
  font-weight: 700;
  line-height: 64.41px;
  text-align: center;
  width: 470px;
  height: 43px;
  position: absolute;
  top: 50px;
  left: 201px;
  margin: auto;
`;

const Subtitle = styled.h2`
  color:#E3DDA1;
  font-family: 'Roboto', sans-serif;
  font-size: 25px;
  font-weight: 300;
  line-height: 29.3px;
  text-align: left;
  position: absolute;
  top: 130px;
  left: 180px;
  margin: auto;
  white-space: nowrap;
`;

export default LeftPane;
