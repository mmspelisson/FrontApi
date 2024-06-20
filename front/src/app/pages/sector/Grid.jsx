import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Search, Edit, Delete } from '@mui/icons-material';
import axios from 'axios';
import ModalDelete from '../../shared/components/modal/ModalDelete'; 
import ModalAtualizacaoSucesso from '../../shared/components/modal/ModalAtualizacao';

const CrudSimples2 = ({ setores, onDelete, onEdit }) => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 70, sortable: false },
    { field: 'setor', headerName: 'Nome do Setor', width: 200, sortable: false },
    {
      field: 'edit',
      headerName: '',
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <div>
          <Edit
            style={{ cursor: 'pointer', marginRight: '8px' }}
            onClick={() => onEdit(params.row)} 
          />
        </div>
      ),
    },
    {
      field: 'delete',
      headerName: '',
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <div>
          <Delete
            style={{ cursor: 'pointer', color: 'red' }}
            onClick={() => handleDelete(params.row)}
          />
        </div>
      ),
    },
  ];

  const [filteredRows, setFilteredRows] = useState(setores);
  const [editingSetor, setEditingSetor] = useState(null); 
  const [deletingSetor, setDeletingSetor] = useState(null);
  const [showUpdateSuccess, setShowUpdateSuccess] = useState(false); 

  useEffect(() => {
    setFilteredRows(setores);
  }, [setores]);

  const handleSearch = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    const filteredData = setores.filter((row) =>
      row.setor.toLowerCase().includes(searchQuery)
    );
    setFilteredRows(filteredData);
  };

  const handleEdit = (setor) => {
    setEditingSetor(setor); 
  };

  const handleUpdateSetorInGrid = async (updatedSetor) => {
    try {
      const response = await axios.put(`http://localhost:3001/updateSetor/${updatedSetor.id}`, {
        nome: updatedSetor.setor,
      });
      if (response.status === 200) {
        console.log('Setor atualizado com sucesso:', response.data);
        setEditingSetor(null);
        fetchSetores(); 
        setShowUpdateSuccess(true); 
      } else {
        console.error('Erro ao atualizar setor:', response.data);
      }
    } catch (error) {
      console.error('Erro ao atualizar setor:', error);
    }
  };

  const handleDelete = (setor) => {
    setDeletingSetor(setor); 
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:3001/setor/${deletingSetor.id}`);
      if (response.status === 200) {
        console.log('Setor deletado com sucesso');
        setDeletingSetor(null); 
        fetchSetores(); 
      } else {
        console.error('Erro ao deletar setor:', response.data);
      }
    } catch (error) {
      console.error('Erro ao deletar setor:', error);
    }
  };

  const cancelDelete = () => {
    setDeletingSetor(null); 
  };

  const fetchSetores = () => {
    axios.get('http://localhost:3001/setor')
      .then((response) => {
        setFilteredRows(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar setores:', error);
      });
  };

  return (
    <div style={{ height: 400, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
      <div style={{ marginBottom: '10px', backgroundColor: '#E2E2E2', padding: '5px', borderRadius: '4px', display: 'flex', alignItems: 'center' }}>
        <Search style={{ marginRight: '5px' }} />
        <input
          type="text"
          placeholder="Pesquisar Setor"
          onChange={handleSearch}
          style={{ border: 'none', backgroundColor: 'inherit' }}
        />
      </div>
      <div style={{ width: '100%' }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          autoHeight
          disableColumnResize
          columnBuffer={2}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </div>
      <ModalDelete
        show={!!deletingSetor} 
        onConfirm={confirmDelete} 
        onCancel={cancelDelete} 
      />
      <ModalAtualizacaoSucesso
        show={showUpdateSuccess}
        onClose={() => setShowUpdateSuccess(false)}
      />
    </div>
  );
};

export default CrudSimples2;
