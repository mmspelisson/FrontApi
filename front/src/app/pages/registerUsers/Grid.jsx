import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'login', headerName: 'Login', width: 150 },
  { field: 'senha', headerName: 'Senha', width: 150 },
  { field: 'nomeCompleto', headerName: 'Nome Completo', width: 200 },
  { field: 'setor', headerName: 'Setor', width: 150 },
  { field: 'liberacoes', headerName: 'Liberações', width: 150 },
  { field: 'contato', headerName: 'Contato', width: 200 },
  { field: 'cidade', headerName: 'Cidade', width: 150 },
];

const rows = [
  { id: 1, login: 'user1', senha: '123456', nomeCompleto: 'Usuário 1', setor: 'TI', liberacoes: 'Admin', contato: '123-456-7890', cidade: 'São Paulo' },
  { id: 2, login: 'user2', senha: 'password', nomeCompleto: 'Usuário 2', setor: 'RH', liberacoes: 'User', contato: '987-654-3210', cidade: 'Rio de Janeiro' },
  // Adicione mais dados conforme necessário
];

const CrudSimples = () => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
    </div>
  );
};

export default CrudSimples;
