import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import CrudSimples from './Grid'
import { Container, FormWrapper, FormContainer, LabelContainer, LabelText, StyledInput, StyledSelect, ButtonContainer, SubmitButton, ClearButton, SubHeaderWrapper, HeaderSpacer, ErrorMessageStyled } from './Styles'
import ModalCadastroUsuario from '../../shared/components/modal/ModalCadastroUs'

function CadastroUsuario() {
  const [refreshGrid, setRefreshGrid] = useState(false);
  const [setores, setSetores] = useState([]);
  const [nextId, setNextId] = useState('');
  const [paises, setPaises] = useState([]);
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [bairros, setBairros] = useState([]);
  const [ceps, setCeps] = useState([]);
  const [selectedPais, setSelectedPais] = useState('');
  const [selectedEstado, setSelectedEstado] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:3001/setor'),
      axios.get('http://localhost:3001/lastId'),
      axios.get('http://localhost:3001/cep'),
      axios.get('http://localhost:3001/bairros'),
      axios.get('http://localhost:3001/paises')
    ])
      .then(([setoresResponse, lastIdResponse, cepResponse, bairrosResponse, paisesResponse]) => {
        setSetores(setoresResponse.data);
        setNextId(lastIdResponse.data.lastId + 1);
        setCeps(cepResponse.data);
        setBairros(bairrosResponse.data);
        setPaises(paisesResponse.data);
      })
      .catch(error => {
        console.error("Erro ao buscar dados:", error);
      });
  }, []);

  const handleCidadeChange = (event) => {
  };

  const handleCepChange = (event) => {
  };

  const handleBairroChange = (event) => {
  };

  const handlePaisChange = (event) => {
    const selectedPais = event.target.value;
    setSelectedPais(selectedPais);
    setSelectedEstado('');
    axios.get(`http://localhost:3001/estados/${selectedPais}`)
      .then(response => {
        setEstados(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar estados:", error);
      });
  };

  const handleEstadoChange = (event) => {
    const selectedEstado = event.target.value;
    setSelectedEstado(selectedEstado);
    axios.get(`http://localhost:3001/cidades/${selectedEstado}`)
      .then(response => {
        setCidades(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar cidades:", error);
      });
  };

  useEffect(() => {
    axios.get('http://localhost:3001/setor')
      .then((response) => {
        setSetores(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar setores:", error);
      });

    axios.get('http://localhost:3001/lastId')
      .then((response) => {
        setNextId(response.data.lastId + 1);
      })
      .catch((error) => {
        console.error("Erro ao obter último ID:", error);
      });

    axios.get('http://localhost:3001/cep')
      .then((response) => {
        setCeps(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar ceps:", error);
      });

    axios.get('http://localhost:3001/bairros')
      .then(response => {
        setBairros(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar bairros:", error);
      });

    axios.get('http://localhost:3001/estados')
      .then(response => {
        setEstados(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar estados:", error);
      });

    axios.get('http://localhost:3001/cidades')
      .then(response => {
        setCidades(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar cidades:", error);
      });

    axios.get('http://localhost:3001/paises')
      .then(response => {
        setPaises(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar paises:", error);
      });

  }, []);

  const handleSubmit = (values, { resetForm }) => {
    const { id, ...data } = values;
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
          cep: '',
          bairro: '',
          pais: '',
          cidade: '',
          estado: ''
        }}
        onSubmit={handleSubmit}
        validationSchema={yup.object().shape({
          email: yup.string().required('Email é obrigatório').email('Email inválido'),
          senha: yup.string().required('Senha é obrigatória'),
          nomeCompleto: yup.string().required('Nome é obrigatório'),
          setor: yup.string().required('Setor é obrigatório'),
          liberacoes: yup.string().required('A liberação é obrigatória'),
          contato: yup.string().required('Contato é obrigatório'),
          cep: yup.string().required('Cep é obrigatório'),
          bairro: yup.string().required('Bairro é obrigatório'),
          pais: yup.string().required('Pais é obrigatório'),
          cidade: yup.string().required('Cidade é obrigatória'),
          estado: yup.string().required('Estado é obrigatório')
        })}
      >
        {({ resetForm }) => (
          <Form>
            <FormWrapper>
              <FormContainer>
                <LabelContainer>
                  <LabelText>ID:</LabelText>
                  <StyledInput as="input" type="text" name="id" value={nextId} readOnly />
                </LabelContainer>

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
                  <LabelText>Pais:</LabelText>
                  <Field as={StyledSelect} name="pais" onChange={handlePaisChange}>
                    <option value="">Selecione o pais</option>
                    {paises.map((pais) => (
                      <option key={pais.id} value={pais.pais}>{pais.pais}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="pais" component={ErrorMessageStyled} />
                </LabelContainer>

                <LabelContainer>
                  <LabelText>Estado:</LabelText>
                  <Field as={StyledSelect} name="estado" onChange={handleEstadoChange}>
                    <option value="">Selecione o estado</option>
                    {estados.map((estado) => (
                      <option key={estado.id} value={estado.estado}>{estado.estado}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="estado" component={ErrorMessageStyled} />
                </LabelContainer>

                <LabelContainer>
                  <LabelText>Cidade:</LabelText>
                  <Field as={StyledSelect} name="cidade" onChange={handleCidadeChange}>
                    <option value="">Selecione o estado</option>
                    {cidades.map((cidade) => (
                      <option key={cidade.id} value={cidade.cidade}>{cidade.cidade}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="cidade" component={ErrorMessageStyled} />
                </LabelContainer>

                <LabelContainer>
                  <LabelText>Cep:</LabelText>
                  <Field as={StyledSelect} name="cep" onChange={handleCepChange}>
                    <option value="">Selecione o CEP</option>
                    {ceps.map((cep) => (
                      <option key={cep.id} value={cep.cep}>{cep.cep}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="cep" component={ErrorMessageStyled} />
                </LabelContainer>

                <LabelContainer>
                  <LabelText>Bairro:</LabelText>
                  <Field as={StyledSelect} name="bairro" onChange={handleBairroChange}>
                    <option value="">Selecione o bairro</option>
                    {bairros.map((bairro) => (
                      <option key={bairro.id} value={bairro.bairro}>{bairro.bairro}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="bairro" component={ErrorMessageStyled} />
                </LabelContainer>

              </FormContainer>
              <ButtonContainer>
                <SubmitButton type="submit">Confirmar</SubmitButton>
                <ClearButton type="button" onClick={resetForm}>Limpar</ClearButton>
              </ButtonContainer>
            </FormWrapper>
          </Form>
        )}
      </Formik>
      <ModalCadastroUsuario show={showModal} onClose={() => setShowModal(false)} />
      <div style={{ marginTop: '20px' }}>
        <CrudSimples key={refreshGrid} />
      </div>
      <HeaderSpacer height="50px" />
    </>
  );
}

export default CadastroUsuario
