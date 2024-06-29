import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import CrudSimples from './Grid';
import { Container, FormWrapper, FormContainer, LabelContainer, LabelText, StyledInput, StyledSelect, ButtonContainer, SubmitButton, ClearButton, SubHeaderWrapper, HeaderSpacer, ErrorMessageStyled } from './Styles';
import ModalCadastroUsuario from '../../shared/components/modal/ModalCadastroUs';
import ModalAtualizacaoSucesso from '../../shared/components/modal/ModalAtualizacao';

function CadastroUsuario() {
  const [refreshGrid, setRefreshGrid] = useState(false);
  const [setores, setSetores] = useState([]);
  const [nextId, setNextId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null); 
  const [showUpdateSuccessModal, setShowUpdateSuccessModal] = useState(false);

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:3001/setor'),
      axios.get('http://localhost:3001/lastId'),
    ])
      .then(([setoresResponse, lastIdResponse]) => {
        setSetores(setoresResponse.data);
        setNextId(lastIdResponse.data.nextId);
      })
      .catch(error => {
        console.error("Erro ao buscar dados:", error);
      });
  }, []);

  const handleSubmit = (values, { resetForm }) => {
    const { id, ...data } = values;  

    if (editingUser) {
      axios.put(`http://localhost:3001/users/${editingUser.id}`, data)
        .then((response) => {
          if (response.status === 200) {
            console.log('Usuário atualizado com sucesso!');
            setRefreshGrid(!refreshGrid);
            setShowUpdateSuccessModal(true);
            setEditingUser(null);
          } else {
            console.error('Erro ao atualizar usuário:', response.data);
          }
        })
        .catch((error) => {
          console.error('Erro ao atualizar usuário:', error);
        });
    } else {
      axios.post('http://localhost:3001/register', data)
        .then((response) => {
          if (response.status === 200) {
            console.log('Usuário cadastrado com sucesso!');
            setShowModal(true);
            setRefreshGrid(!refreshGrid);
            resetForm();
            setNextId(nextId + 1);
          } else {
            console.error('Erro ao cadastrar usuário:', response.data);
            setShowModal(true);
          }
        })
        .catch((error) => {
          console.error('Erro ao cadastrar usuário:', error);
          setShowModal(true);
        });
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user); // Define o usuário a ser editado
  };

  return (
    <>
      <HeaderSpacer />
      <SubHeaderWrapper>Cadastro de Usuário</SubHeaderWrapper>
      <Formik
        initialValues={{
          email: '',
          senha: '',
          nomeCompleto: '',
          setor: '',
          liberacoes: '',
          contato: '',
          cidadeUF: '', // Mantendo cidadeUF
        }}
        enableReinitialize 
        onSubmit={handleSubmit}
        validationSchema={yup.object().shape({
          email: yup.string().required('Email é obrigatório').email('Email inválido'),
          senha: yup.string().required('Senha é obrigatória'),
          nomeCompleto: yup.string().required('Nome é obrigatório'),
          setor: yup.string().required('Setor é obrigatório'),
          liberacoes: yup.string().required('A liberação é obrigatória'),
          contato: yup.string().required('Contato é obrigatório'),
          cidadeUF: yup.string().required('Cidade/UF é obrigatória'),
        })}
      >
        {({ resetForm, setValues }) => (
          <Form>
            <FormWrapper>
              <FormContainer>
                {editingUser && <StyledInput type="hidden" name="id" value={editingUser.id} />}
                <LabelContainer>
                  <LabelText>Email:</LabelText>
                  <Field as={StyledInput} type="text" name="email" placeholder="Email" />
                  <ErrorMessage name="email" component={ErrorMessageStyled} />
                </LabelContainer>

                <LabelContainer>
                  <LabelText>Senha:</LabelText>
                  <Field as={StyledInput} type="password" name="senha" placeholder="Senha" />
                  <ErrorMessage name="senha" component={ErrorMessageStyled} />
                </LabelContainer>

                <LabelContainer>
                  <LabelText>Nome Completo:</LabelText>
                  <Field as={StyledInput} type="text" name="nomeCompleto" placeholder="Nome completo" />
                  <ErrorMessage name="nomeCompleto" component={ErrorMessageStyled} />
                </LabelContainer>

                <LabelContainer>
                  <LabelText>Setor:</LabelText>
                  <Field as={StyledSelect} name="setor">
                    <option value="">Selecione o setor</option>
                    {setores.map((setor) => (
                      <option key={setor.id} value={setor.setor}>{setor.setor}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="setor" component={ErrorMessageStyled} />
                </LabelContainer>

                <LabelContainer>
                  <LabelText>Liberações:</LabelText>
                  <Field as={StyledSelect} name="liberacoes">
                    <option value="">Selecione as liberações</option>
                    <option value="administrador">Administrador</option>
                    <option value="usuario">Usuário</option>
                  </Field>
                  <ErrorMessage name="liberacoes" component={ErrorMessageStyled} />
                </LabelContainer>

                <LabelContainer>
                  <LabelText>Contato:</LabelText>
                  <Field as={StyledInput} type="text" name="contato" placeholder="Contato" />
                  <ErrorMessage name="contato" component={ErrorMessageStyled} />
                </LabelContainer>

                <LabelContainer>
                  <LabelText>Cidade/UF:</LabelText>
                  <Field as={StyledInput} type="text" name="cidadeUF" placeholder="Cidade/UF" />
                  <ErrorMessage name="cidadeUF" component={ErrorMessageStyled} />
                </LabelContainer>
              </FormContainer>
              <ButtonContainer>
                <SubmitButton type="submit">{editingUser ? 'Atualizar' : 'Confirmar'}</SubmitButton>
                {!editingUser && <ClearButton type="button" onClick={resetForm}>Limpar</ClearButton>}
              </ButtonContainer>
            </FormWrapper>
          </Form>
        )}
      </Formik>
      {showModal && <ModalCadastroUsuario show={showModal} onClose={() => setShowModal(false)} />}
      {showUpdateSuccessModal && <ModalAtualizacaoSucesso onClose={() => setShowUpdateSuccessModal(false)} />}
      <CrudSimples refreshGrid={refreshGrid} handleEdit={handleEdit} />
    </>
  );
}

export default CadastroUsuario;
