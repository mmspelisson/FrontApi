import React, { useEffect } from 'react';
import styled from 'styled-components';

const ModalBackground = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  background-color: #f44336;
  color: white;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1100; 
`;

const ModalDeletadoSucesso = ({ show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <ModalBackground>
      Deletado com sucesso!
    </ModalBackground>
  );
};

export default ModalDeletadoSucesso;
