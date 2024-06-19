import React, { useState } from 'react'
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

const SaveButton = styled(Button)`
  background-color: #4CAF50;
  color: white;
`;

const CancelButton = styled(Button)`
  background-color: #9E9E9E;
  color: white;
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin-bottom: 20px;
`;

const ModalEdit = ({ show, currentText, onSave, onCancel }) => {
  const [text, setText] = useState(currentText);
  const handleSave = () => {
    onSave(text);
  };

  if (!show) return null;

  return (
    <ModalBackground>
      <ModalContainer>
        <h2>Editar</h2>
        <StyledTextarea value={text} onChange={(e) => setText(e.target.value)} />
        <SaveButton onClick={handleSave}>Salvar</SaveButton>
        <CancelButton onClick={onCancel}>Cancelar</CancelButton>
      </ModalContainer>
    </ModalBackground>
  );
};

export default ModalEdit
