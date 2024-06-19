import React from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { Search, Edit, Delete } from '@mui/icons-material'
import axios from 'axios'

const CrudSimples2 = ({ setores, onEdit, onDelete }) => {
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
                    <Edit style={{ cursor: 'pointer', marginRight: '8px' }} onClick={() => onEdit(params.row)} />
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
                    <Delete style={{ cursor: 'pointer', color: 'red' }} onClick={() => onDelete(params.row.id)} />
                </div>
            ),
        },
    ];

    const [filteredRows, setFilteredRows] = React.useState(setores);

    React.useEffect(() => {
        setFilteredRows(setores);
    }, [setores]);

    const handleSearch = (event) => {
        const searchQuery = event.target.value.toLowerCase();
        const filteredData = setores.filter((row) =>
            row.setor.toLowerCase().includes(searchQuery)
        );
        setFilteredRows(filteredData);
    };

    const handleUpdateSetor = (id, newData) => {
        axios.put(`/updateSetor/${id}`, { nome: newData.nome })
            .then(response => {
                console.log('Setor atualizado com sucesso:', response.data);
            })
            .catch(error => {
                console.error('Erro ao atualizar setor:', error);
            });
    };

    const handleDeleteSetor = (id) => {
        axios.delete(`/setor/${id}`)
            .then(response => {
                console.log('Setor excluído com sucesso:', response.data);
                onDelete(id);
            })
            .catch(error => {
                console.error('Erro ao excluir setor:', error);
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
                    onEditCellChangeCommitted={(params) => {
                        handleUpdateSetor(params.id, params.newValue);
                    }}
                />
            </div>
        </div>
    );
};

export default CrudSimples2
