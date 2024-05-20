import React, { useState } from 'react'
import { Container, FormWrapper, FormContainer, Label, Input, Select, LargeInput, ButtonContainer, SubmitButton, ClearButton, SubHeaderWrapper, HeaderSpacer } from './Styles'
import Modal from '../../shared/components/modal/Modal'
import axios from 'axios'
import CrudSimples from './Grid'

function CadastroUsuario() {
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [setor, setSetor] = useState('');
    const [liberacoes, setLiberacoes] = useState('');
    const [contato, setContato] = useState('');
    const [cidadeUF, setCidadeUF] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = { login, senha, nome, setor, liberacoes, contato, cidadeUF };
        axios.post('http://localhost:8800/users', userData)
            .then(response => {
                console.log('Usuário cadastrado com sucesso:', response.data);
                // Limpar campos do formulário após o cadastro
                setLogin('');
                setSenha('');
                setNome('');
                setSetor('');
                setLiberacoes('');
                setContato('');
                setCidadeUF('');
            })
            .catch(error => {
                console.error('Erro ao cadastrar usuário:', error);
            });
    };    

    const handleLimpar = () => {
        setLogin('');
        setSenha('');
        setNome('');
        setSetor('');
        setLiberacoes('');
        setContato('');
        setCidadeUF('');
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <>
           
            <HeaderSpacer />
            <SubHeaderWrapper>Cadastro de Usuário</SubHeaderWrapper>
            <FormWrapper>
                <FormContainer onSubmit={handleSubmit}>
                    <Label>
                        
                        <Input type="text" value="ID:1085" readOnly />
                    </Label>
                    <Label>
                        <Input type="text" value={login} onChange={(e) => setLogin(e.target.value)} placeholder="Login" required />
                    </Label>
                    <Label>
                        <Input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Senha" required />
                    </Label>
                    <HeaderSpacer height="16px" />
                    <Label>
                        <Input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome completo" required />
                    </Label>
                    <Label>
                        <Select value={setor} onChange={(e) => setSetor(e.target.value)} required>
                            <option value="">Selecione o setor</option>
                        </Select>
                    </Label>
                    <Label>
                        <Select value={liberacoes} onChange={(e) => setLiberacoes(e.target.value)} required>
                            <option value="">Selecione as liberações</option>
                        </Select>
                    </Label>
                    <HeaderSpacer height="16px" />
                    <Label>
                        <Input type="text" value={contato} onChange={(e) => setContato(e.target.value)} placeholder="Contato" required />
                    </Label>
                    <Label>
                        <LargeInput type="text" value={cidadeUF} onChange={(e) => setCidadeUF(e.target.value)} placeholder="Cidade/UF*" required />
                    </Label>
                </FormContainer>
                <ButtonContainer>
                    <SubmitButton type="submit">Confirmar</SubmitButton>
                    <ClearButton type="button" onClick={handleLimpar}>Limpar</ClearButton>
                </ButtonContainer>
            </FormWrapper>
            <div style={{marginTop: '30px'}}>
                <CrudSimples />
            </div>
            <HeaderSpacer height="50px" />
        </>
    )
}

export default CadastroUsuario
