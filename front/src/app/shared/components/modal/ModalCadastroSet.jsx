import React, { useEffect } from 'react'
import styled from 'styled-components'

const ModalBackground = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  background-color: #4CAF50;
  color: white;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

const ModalCadastroSetor = ({ show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <ModalBackground>
      Você cadastrou esse setor com sucesso!
    </ModalBackground>
  );
};

export default ModalCadastroSetor
