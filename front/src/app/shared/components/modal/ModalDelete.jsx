import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ModalDeletadoSucesso from './ModalDeleteSucess'; // Importa o modal de sucesso na exclusão

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Button = styled.button`
  margin: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
`;

const DeleteButton = styled(Button)`
  background-color: #f44336;
  color: white;
`;

const CancelButton = styled(Button)`
  background-color: #9e9e9e;
  color: white;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ModalDelete = ({ show, onConfirm, onCancel }) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Estado para controlar o modal de sucesso na exclusão

  useEffect(() => {
    if (show) {
      setShowSuccessModal(false); // Garante que o modal de sucesso não está visível ao abrir o modal principal
    }
  }, [show]);

  const handleConfirm = () => {
    onConfirm();
    setShowSuccessModal(true); // Mostra o modal de sucesso ao confirmar a exclusão
  };

  return (
    <>
      {show && (
        <ModalBackground>
          <ModalContent>
            <h2>Tem certeza que deseja deletar?</h2>
            <ButtonContainer>
              <DeleteButton onClick={handleConfirm}>Confirmar</DeleteButton>
              <CancelButton onClick={onCancel}>Cancelar</CancelButton>
            </ButtonContainer>
          </ModalContent>
        </ModalBackground>
      )}
      <ModalDeletadoSucesso show={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
    </>
  );
};

export default ModalDelete;
