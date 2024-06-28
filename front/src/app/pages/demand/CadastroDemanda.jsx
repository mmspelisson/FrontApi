import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import {
    HeaderSpacer, SubHeaderWrapper, FormWrapper, FormContainer, LabelContainer, LabelText,
    StyledInput, StyledSelect, ButtonContainer, SubmitButton, ClearButton, ErrorMessageStyled, StyledTextarea
} from './Styles';
import ModalCadastroDemanda from '../../shared/components/modal/ModalCadastroDem';

function CadastroDemanda({ onDemandAdded = () => { } }) {
    const [id, setId] = useState('');
    const [solicitante, setSolicitante] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3001/lastDemandId')
            .then((response) => {
                setId(response.data.nextId);
            })
            .catch((error) => {
                console.error('Erro ao obter o próximo ID de demanda:', error);
            });

        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setSolicitante(user.email);
        }
    }, []);

    const handleSubmit = (data, { resetForm }) => {
        const novaDemanda = {
            tipo: data.tipo,
            descricao: data.descricao,
            prioridade: data.prioridade,
            solicitante: solicitante,
            coluna: "Solicitados"
        };

        Promise.all([
            axios.post('http://localhost/enviar.php', novaDemanda),
            axios.post('http://localhost:3001/demanda', novaDemanda)
        ])
        .then(([kanbanizeResponse, localResponse]) => {
            if (kanbanizeResponse.status === 200 && localResponse.status === 200) {
                console.log('Demanda cadastrada com sucesso!');
                resetForm();
                onDemandAdded(novaDemanda);
                setShowModal(true);
            } else {
                console.error('Erro ao cadastrar demanda:', kanbanizeResponse.data, localResponse.data);
            }
        })
        .catch((error) => {
            console.error('Erro ao cadastrar demanda:', error);
        });
    };


    return (
        <>
            <HeaderSpacer />
            <SubHeaderWrapper>Cadastro de Demanda</SubHeaderWrapper>
            <Formik
                initialValues={{
                    solicitante: solicitante,
                    tipo: '',
                    descricao: '',
                    prioridade: ''
                }}
                onSubmit={handleSubmit}
                validationSchema={yup.object().shape({
                    tipo: yup.string().required('Tipo é obrigatório'),
                    descricao: yup.string().required('Descrição é obrigatória'),
                    prioridade: yup.string().required('Prioridade é obrigatória')
                })}
                enableReinitialize={true}
            >
                {({ resetForm }) => (
                    <Form>
                        <FormWrapper>
                            <FormContainer>
                                <LabelContainer>
                                    <LabelText>ID:</LabelText>
                                    <StyledInput type="text" name="id" value={id} readOnly />
                                </LabelContainer>
                                <LabelContainer>
                                    <LabelText>Solicitante:</LabelText>
                                    <StyledInput type="text" name="solicitante" value={solicitante} readOnly />
                                </LabelContainer>
                                <LabelContainer>
                                    <LabelText>Tipo:</LabelText>
                                    <Field as={StyledSelect} name="tipo">
                                        <option value="">Selecione o tipo</option>
                                        <option value="Hotfix">Hotfix</option>
                                        <option value="Suporte">Suporte</option>
                                        <option value="Banco">Banco</option>
                                        <option value="Reconfiguração">Reconfiguração</option>
                                        <option value="Feature">Feature</option>
                                        <option value="Demanda Simples">Demanda Simples</option>
                                        <option value="Bug">Bug</option>
                                    </Field>
                                    <ErrorMessage name="tipo" component={ErrorMessageStyled} />
                                </LabelContainer>
                                <LabelContainer>
                                    <LabelText>Descrição:</LabelText>
                                    <Field as={StyledTextarea} name="descricao" placeholder="Descrição" />
                                    <ErrorMessage name="descricao" component={ErrorMessageStyled} />
                                </LabelContainer>
                                <LabelContainer>
                                    <LabelText>Prioridade:</LabelText>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <label>
                                            Baixa
                                            <Field type="radio" name="prioridade" value="Baixa" style={{ marginLeft: '5px' }} />
                                        </label>
                                        <label>
                                            Média
                                            <Field type="radio" name="prioridade" value="Média" style={{ marginLeft: '5px' }} />
                                        </label>
                                        <label>
                                            Alta
                                            <Field type="radio" name="prioridade" value="Alta" style={{ marginLeft: '5px' }} />
                                        </label>
                                        <label>
                                            Crítica
                                            <Field type="radio" name="prioridade" value="Crítica" style={{ marginLeft: '5px' }} />
                                        </label>
                                    </div>
                                    <ErrorMessage name="prioridade" component={ErrorMessageStyled} />
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
            <HeaderSpacer height="50px" />
            <ModalCadastroDemanda show={showModal} onClose={() => setShowModal(false)} />
        </>
    );
}

export default CadastroDemanda;