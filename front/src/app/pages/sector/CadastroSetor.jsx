import React, { useState } from 'react'
import { FormWrapper, FormContainer, Label, Input, ButtonContainer, SubmitButton, ClearButton, SubHeaderWrapper, HeaderSpacer } from './Styles'

function CadastroSetor() {
    const [codigo, setCodigo] = useState('101');
    const [nome, setNome] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Dados do setor cadastrado:', { codigo, nome });
    }

    const handleLimpar = () => {
        setCodigo('');
        setNome('');
    }

    return (
        <>
            <HeaderSpacer />
            <SubHeaderWrapper>Cadastro de Setor</SubHeaderWrapper>
            <FormWrapper>
                <FormContainer onSubmit={handleSubmit}>
                    <Label>
                        <div>ID:</div>
                        <Input type="text" value={codigo} readOnly />
                    </Label>
                    <Label>
                        <div></div>
                        <Input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome do Setor" required />
                    </Label>
                </FormContainer>
                <ButtonContainer>
                    <SubmitButton type="submit">Confirmar</SubmitButton>
                    <ClearButton type="button" onClick={handleLimpar}>Limpar</ClearButton>
                </ButtonContainer>
            </FormWrapper>
            <HeaderSpacer height="50px" />
        </>
    )
}

export default CadastroSetor
