import React, { useState, useEffect } from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { Search, Edit, Delete } from '@mui/icons-material'
import axios from 'axios'

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'email', headerName: 'Email', width: 150 },
  { field: 'senha', headerName: 'Senha', width: 150 },
  { field: 'nomeCompleto', headerName: 'Nome Completo', width: 200 },
  { field: 'setor', headerName: 'Setor', width: 150 },
  { field: 'liberacoes', headerName: 'Liberações', width: 150 },
  { field: 'contato', headerName: 'Contato', width: 200 },
  { field: 'cidadeUF', headerName: 'Cidade/UF', width: 150 },
  { field: 'edit', headerName: '', width: 100, sortable: false,

    renderCell: () => (
      <div>
        <Edit style={{ cursor: 'pointer', marginRight: '8px' }} />
      </div>
    ),
  },
  { field: 'delete', headerName: '', width: 100, sortable: false,
    renderCell: () => (
      <div>
        <Delete style={{ cursor: 'pointer', color: 'red' }} />
      </div>
    ),
  },
];

const CrudSimples = () => {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/users');
        setRows(response.data);
        setFilteredRows(response.data);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    const filteredData = rows.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchQuery)
      )
    );
    setFilteredRows(filteredData);
  };

  return (
    <div style={{ height: 400, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
      <div style={{ marginBottom: '10px', backgroundColor: '#E2E2E2', padding: '5px', borderRadius: '4px', display: 'flex', alignItems: 'center' }}>
        <Search style={{ marginRight: '5px' }} />
        <input
          type="text"
          placeholder="Pesquisar Usuário"
          onChange={handleSearch}
          style={{ border: 'none', backgroundColor: 'inherit' }}
        />
      </div>
      <div style={{ height: 'calc(100% - 40px)', width: '100%', overflowY: 'auto' }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          autoHeight
          disableColumnResize
          components={{
            Toolbar: GridToolbar,
          }}
          className="fixed-header"
        />
      </div>
      <style>
        {`
          .fixed-header .MuiDataGrid-header {
            position: sticky;
            top: 0;
            z-index: 1000;
          }
        `}
      </style>
    </div>
  )
}

export default CrudSimples
