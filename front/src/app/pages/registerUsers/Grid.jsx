import React from 'react';
import { Table } from 'antd';

const columns = [
  {
    title: 'Código',
    dataIndex: 'codigo',
    key: 'codigo',
  },
  {
    title: 'Login',
    dataIndex: 'login',
    key: 'login',
  },
  {
    title: 'Senha',
    dataIndex: 'senha',
    key: 'senha',
  },
  {
    title: 'Nome Completo',
    dataIndex: 'nomeCompleto',
    key: 'nomeCompleto',
  },
  {
    title: 'Setor',
    dataIndex: 'setor',
    key: 'setor',
  },
  {
    title: 'Contato',
    dataIndex: 'contato',
    key: 'contato',
  },
  {
    title: 'Cidade/UF',
    dataIndex: 'cidadeUF',
    key: 'cidadeUF',
  },
  {
    title: 'Liberações',
    dataIndex: 'liberacoes',
    key: 'liberacoes',
  },
];

const data = [
  {
    key: '1',
    codigo: '001',
    login: 'usuario1',
    senha: 'senha123',
    nomeCompleto: 'Fulano de Tal',
    setor: 'Recursos Humanos',
    contato: '123456789',
    cidadeUF: 'Cascavel/PR',
    liberacoes: 'Admin',
  },
  {
    key: '2',
    codigo: '002',
    login: 'usuario2',
    senha: 'senha456',
    nomeCompleto: 'Beltrano Silva',
    setor: 'Financeiro',
    contato: '987654321',
    cidadeUF: 'Foz do Iguaçu/PR',
    liberacoes: 'User',
  },
];

const UserGrid = () => {
  return (
    <Table columns={columns} dataSource={data} />
  );
};

export default UserGrid;
