import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Search, Edit, Delete } from '@mui/icons-material';
import axios from 'axios';
import ModalEdit from '../../shared/components/modal/ModalEdicao';
import ModalDelete from '../../shared/components/modal/ModalDelete';
import ModalAtualizacaoSucesso from '../../shared/components/modal/ModalAtualizacao'

const CrudSimples = () => {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [editingUser, setEditingUser] = useState(null); 
  const [showDeleteModal, setShowDeleteModal] = useState(false); 
  const [userToDelete, setUserToDelete] = useState(null); 
  const [showSuccessModal, setShowSuccessModal] = useState(false); 

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/users');
      setRows(response.data);
      setFilteredRows(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  useEffect(() => {
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/users/${id}`);
      setRows(rows.filter((row) => row.id !== id));
      setFilteredRows(filteredRows.filter((row) => row.id !== id));
      handleCloseDeleteModal(); // Fecha o modal após a exclusão
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user); 
  };

  const handleUpdateUser = async (updatedUser) => {
    try {
      const response = await axios.put(`http://localhost:3001/users/${updatedUser.id}`, updatedUser);
      if (response.status === 200) {
        console.log('Usuário atualizado com sucesso:', response.data);
        setEditingUser(null); 
        await fetchData(); 
        setShowSuccessModal(true); 
      } else {
        console.error('Erro ao atualizar usuário:', response.data);
      }
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
    }
  };

  const handleShowDeleteModal = (user) => {
    setUserToDelete(user); 
    setShowDeleteModal(true); 
  };

  const handleConfirmDelete = () => {
    if (userToDelete) {
      handleDelete(userToDelete.id);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false); 
    setUserToDelete(null); 
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false); 
    setUserToDelete(null); 
  };

  const handleCloseEditModal = () => {
    setEditingUser(null);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90, sortable: false }, 
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'senha', headerName: 'Senha', width: 150 },
    { field: 'nomeCompleto', headerName: 'Nome Completo', width: 200 },
    { field: 'setor', headerName: 'Setor', width: 150 },
    { field: 'liberacoes', headerName: 'Liberações', width: 150 },
    { field: 'contato', headerName: 'Contato', width: 200 },
    { field: 'cidadeUF', headerName: 'Cidade/UF', width: 150 },
    {
      field: 'edit',
      headerName: '',
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <Edit
          style={{ cursor: 'pointer', marginRight: '8px' }}
          onClick={() => handleEdit(params.row)}
        />
      ),
    },
    {
      field: 'delete',
      headerName: '',
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <Delete
          style={{ cursor: 'pointer', color: 'red' }}
          onClick={() => handleShowDeleteModal(params.row)} 
        />
      ),
    },
  ];

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
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick 
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </div>
      <ModalEdit
        show={!!editingUser} 
        user={editingUser}
        onSave={handleUpdateUser}
        onCancel={handleCloseEditModal}
      />
      <ModalDelete
        show={showDeleteModal} 
        onConfirm={handleConfirmDelete} 
        onCancel={handleCancelDelete} 
      />
      <ModalAtualizacaoSucesso
        show={showSuccessModal} 
        onClose={() => setShowSuccessModal(false)} 
      />
    </div>
  );
};

export default CrudSimples;