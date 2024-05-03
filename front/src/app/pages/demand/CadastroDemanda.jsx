import React, { useState } from 'react'
import { Container, FormWrapper, FormContainer, Label, Input, Select, LargeInput, ButtonContainer, SubmitButton, ClearButton, SubHeaderWrapper, HeaderSpacer } from './Styles'

function CadastroDemanda() {
    const [demanda, setDemanda] = useState('1085');
    const [solicitante, setSolicitante] = useState('Solicitante Exemplo');
    const [tipo, setTipo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [baixa, setBaixa] = useState(false);
    const [media, setMedia] = useState(false);
    const [alta, setAlta] = useState(false);
    const [critica, setCritica] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Dados da demanda cadastrada:', { demanda, solicitante, tipo, descricao, baixa, media, alta, critica })
    }

    const handleLimpar = () => {
        setDemanda('');
        setSolicitante('');
        setTipo('');
        setDescricao('');
        setBaixa(false);
        setMedia(false);
        setAlta(false);
        setCritica(false);
    }

    return (
        <>
            <HeaderSpacer />
            <SubHeaderWrapper>Cadastro de Demanda</SubHeaderWrapper>
            <FormWrapper>
                <FormContainer onSubmit={handleSubmit}>
                    <Label>
                        <Input type="text" value={demanda} readOnly />
                    </Label>
                    <Label>
                        <Input type="text" value={solicitante} readOnly />
                    </Label>
                    <Label>
                        <Select value={tipo} onChange={(e) => setTipo(e.target.value)} required>
                            <option value="">Selecione o tipo</option>
                            <option value="">Hotfix</option>
                            <option value="">Suporte</option>
                            <option value="">Banco</option>
                            <option value ="">Reconfiguração</option>
                            <option value ="">Feature</option>

                        </Select>
                    </Label>
                    <Label>
                        <LargeInput type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição" required />
                    </Label>
                    <Label>
                        
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <input type="checkbox" checked={baixa} onChange={(e) => setBaixa(e.target.checked)} />
                            <label htmlFor="baixa">Baixa</label>
                            <input type="checkbox" checked={media} onChange={(e) => setMedia(e.target.checked)} />
                            <label htmlFor="media">Média</label>
                            <input type="checkbox" checked={alta} onChange={(e) => setAlta(e.target.checked)} />
                            <label htmlFor="alta">Alta</label>
                            <input type="checkbox" checked={critica} onChange={(e) => setCritica(e.target.checked)} />
                            <label htmlFor="critica">Crítica</label>
                        </div>

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

export default CadastroDemanda
