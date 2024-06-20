
// Modal de edição do usuario

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

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

const FieldLabel = styled.label`
  display: block;
  text-align: left;
  margin-bottom: 5px;
  font-weight: bold;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
`;

const ReadOnlyField = styled.div`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  background-color: #f0f0f0;
  color: #666;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalEdit = ({ show, user, onSave, onCancel }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [setor, setSetor] = useState('');
  const [liberacoes, setLiberacoes] = useState('');
  const [contato, setContato] = useState('');
  const [cidadeUF, setCidadeUF] = useState('');

  useEffect(() => {
    if (user) {
      setEmail(user.email || '');
      setSenha(user.senha || '');
      setNomeCompleto(user.nomeCompleto || '');
      setSetor(user.setor || '');
      setLiberacoes(user.liberacoes || '');
      setContato(user.contato || '');
      setCidadeUF(user.cidadeUF || '');
    }
  }, [user]);

  const handleSave = () => {
    const updatedUser = {
      id: user.id,
      email,
      senha,
      nomeCompleto,
      setor,
      liberacoes,
      contato,
      cidadeUF,
    };
    onSave(updatedUser);
  };

  if (!show) return null;

  return (
    <ModalBackground>
      <ModalContainer>
        <h2>Editar Usuário</h2>
        <FieldLabel>Email:</FieldLabel>
        <StyledInput
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <FieldLabel>Senha:</FieldLabel>
        <StyledInput
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Senha"
        />
        <FieldLabel>Nome Completo:</FieldLabel>
        <StyledInput
          type="text"
          value={nomeCompleto}
          onChange={(e) => setNomeCompleto(e.target.value)}
          placeholder="Nome Completo"
        />
        <FieldLabel>Setor:</FieldLabel>
        {user.setor ? (
          <ReadOnlyField>
            {setor}
            <p>Não é possível editar</p>
          </ReadOnlyField>
        ) : (
          <StyledInput
            type="text"
            value={setor}
            onChange={(e) => setSetor(e.target.value)}
            placeholder="Setor"
          />
        )}
        <FieldLabel>Liberações:</FieldLabel>
        {user.liberacoes ? (
          <ReadOnlyField>
            {liberacoes}
            <p>Não é possível editar</p>
          </ReadOnlyField>
        ) : (
          <StyledInput
            type="text"
            value={liberacoes}
            onChange={(e) => setLiberacoes(e.target.value)}
            placeholder="Liberações"
          />
        )}
        <FieldLabel>Contato:</FieldLabel>
        <StyledInput
          type="text"
          value={contato}
          onChange={(e) => setContato(e.target.value)}
          placeholder="Contato"
        />
        <FieldLabel>Cidade/UF:</FieldLabel>
        <StyledInput
          type="text"
          value={cidadeUF}
          onChange={(e) => setCidadeUF(e.target.value)}
          placeholder="Cidade/UF"
        />
        <SaveButton onClick={handleSave}>Salvar</SaveButton>
        <CancelButton onClick={onCancel}>Cancelar</CancelButton>
      </ModalContainer>
    </ModalBackground>
  );
};

export default ModalEdit;