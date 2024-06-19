import React from 'react'
import styled from 'styled-components'

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Button = styled.button`
  margin: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
`;

const LogoutButton = styled(Button)`
  background-color: #151F6D;
  color: white;
`;

const CancelButton = styled(Button)`
  background-color: #9E9E9E;
  color: white;
`;

const ModalLogout = ({ show, onConfirm, onCancel }) => {
  if (!show) return null;

  return (
    <ModalBackground>
      <ModalContainer>
        <h2>Tem certeza que deseja sair do sistema?</h2>
        <LogoutButton onClick={onConfirm}>Sim</LogoutButton>
        <CancelButton onClick={onCancel}>Não</CancelButton>
      </ModalContainer>
    </ModalBackground>
  );
};

export default ModalLogout
