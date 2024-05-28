import React, { useState, useEffect } from 'react';
import { FormWrapper, FormContainer, LabelContainer, LabelText, StyledInput, ButtonContainer, SubmitButton, ClearButton, SubHeaderWrapper, HeaderSpacer, ErrorMessageStyled } from './Styles';
import axios from 'axios';
import CrudSimples2 from "../sector/Grid.jsx"; 

function CadastroSetor() {
    const [id, setId] = useState(1);
    const [nome, setNome] = useState('');
    const [setores, setSetores] = useState([]);

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
        axios.post('http://localhost:3001/registerSetor', { nome })
            .then((response) => {
                if (response.status === 200) {
                    console.log('Setor cadastrado com sucesso');
                    setNome('');
                    setId(id + 1);
                    fetchSetores();
                } else {
                    console.error('Erro ao cadastrar setor!', response.data);
                }
            })
            .catch((error) => {
                console.error('Erro ao cadastrar setor:', error);
            });
    };
    

    const handleLimpar = () => {
        setNome('');
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
                        <SubmitButton type="submit">Confirmar</SubmitButton>
                        <ClearButton type="button" onClick={handleLimpar}>Limpar</ClearButton>
                    </ButtonContainer>
                </FormContainer>
            </FormWrapper>
            <HeaderSpacer height="50px" />
            <div style={{ marginTop: '30px' }}>
                <CrudSimples2 setores={setores} />
            </div>
        </>
    );
}

export default CadastroSetor;
