import React, { useState, useEffect } from 'react';
import { FormWrapper, FormContainer, LabelContainer, LabelText, StyledInput, ButtonContainer, SubmitButton, ClearButton, SubHeaderWrapper, HeaderSpacer } from './Styles';
import axios from 'axios';
import CrudSimples2 from '../sector/Grid';
import ModalCadastroSetor from '../../shared/components/modal/ModalCadastroSet';
import ModalAtualizacaoSucesso from '../../shared/components/modal/ModalAtualizacao';

function CadastroSetor() {
  const [id, setId] = useState(1);
  const [nome, setNome] = useState('');
  const [setores, setSetores] = useState([]);
  const [editing, setEditing] = useState(false);
  const [showModalCadastro, setShowModalCadastro] = useState(false);
  const [showModalAtualizacao, setShowModalAtualizacao] = useState(false);

  const fetchSetores = () => {
    axios.get('http://localhost:3001/setor')
      .then((response) => {
        setSetores(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar setores:', error);
      });
  };

  useEffect(() => {
    axios.get('http://localhost:3001/lastSectorId')
      .then((response) => {
        setId(response.data.nextId);
      })
      .catch((error) => {
        console.error('Erro ao obter o próximo ID de setor:', error);
      });

    fetchSetores();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editing) {
      axios.put(`http://localhost:3001/updateSetor/${id}`, { nome })
        .then((response) => {
          if (response.status === 200) {
            console.log('Setor atualizado com sucesso');
            setNome('');
            setId(id + 1);
            setEditing(false);
            fetchSetores();
            setShowModalAtualizacao(true);
          } else {
            console.error('Erro ao atualizar setor!', response.data);
          }
        })
        .catch((error) => {
          console.error('Erro ao atualizar setor:', error);
        });
    } else {
      axios.post('http://localhost:3001/registerSetor', { nome })
        .then((response) => {
          if (response.status === 200) {
            console.log('Setor cadastrado com sucesso');
            setNome('');
            setId(id + 1);
            fetchSetores();
            setShowModalCadastro(true);
          } else {
            console.error('Erro ao cadastrar setor!', response.data);
          }
        })
        .catch((error) => {
          console.error('Erro ao cadastrar setor:', error);
        });
    }
  };

  const handleLimpar = () => {
    setNome('');
    setEditing(false);
  };

  const handleEdit = (setor) => {
    setId(setor.id);
    setNome(setor.setor);
    setEditing(true);
  };

  const handleDelete = (setorId) => {
    axios.delete(`http://localhost:3001/setor/${setorId}`)
      .then((response) => {
        if (response.status === 200) {
          console.log('Setor deletado com sucesso');
          fetchSetores();
        } else {
          console.error('Erro ao deletar setor!', response.data);
        }
      })
      .catch((error) => {
        console.error('Erro ao deletar setor:', error);
      });
  };

  return (
    <>
      <HeaderSpacer />
      <SubHeaderWrapper>Cadastro de Setor</SubHeaderWrapper>
      <FormWrapper>
        <FormContainer onSubmit={handleSubmit}>
          <LabelContainer>
            <LabelText>ID:</LabelText>
            <StyledInput type="text" value={id} readOnly />
          </LabelContainer>
          <LabelContainer>
            <LabelText>Nome do Setor:</LabelText>
            <StyledInput type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome do Setor" required />
          </LabelContainer>
          <ButtonContainer>
            <SubmitButton type="submit">{editing ? 'Atualizar' : 'Confirmar'}</SubmitButton>
            <ClearButton type="button" onClick={handleLimpar}>Limpar</ClearButton>
          </ButtonContainer>
        </FormContainer>
      </FormWrapper>
      <ModalCadastroSetor show={showModalCadastro} onClose={() => setShowModalCadastro(false)} />
      <ModalAtualizacaoSucesso show={showModalAtualizacao} onClose={() => setShowModalAtualizacao(false)} />
      <HeaderSpacer height="50px" />
      <div style={{ marginTop: '30px' }}>
        <CrudSimples2 setores={setores} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </>
  );
}

export default CadastroSetor;
