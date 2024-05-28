import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Search, Edit, Delete } from '@mui/icons-material';
import axios from 'axios';

const columns = [
    { field: 'id', headerName: 'ID', width: 70, sortable: false },
    { field: 'setor', headerName: 'Nome do Setor', width: 200, sortable: false },
    {
        field: 'edit',
        headerName: '',
        width: 100,
        sortable: false,
        renderCell: () => (
            <div>
                <Edit style={{ cursor: 'pointer', marginRight: '8px' }} />
            </div>
        ),
    },
    {
        field: 'delete',
        headerName: '',
        width: 100,
        sortable: false,
        renderCell: () => (
            <div>
                <Delete style={{ cursor: 'pointer', color: 'red' }} />
            </div>
        ),
    },
];

const CrudSimples2 = () => {
    const [rows, setRows] = useState([]);
    const [filteredRows, setFilteredRows] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/setor');
                setRows(response.data);
                setFilteredRows(response.data);
            } catch (error) {
                console.error('Erro ao buscar setores:', error);
            }
        };

        fetchData();
    }, []);

    const handleSearch = (event) => {
        const searchQuery = event.target.value.toLowerCase();
        const filteredData = rows.filter((row) =>
            row.setor.toLowerCase().includes(searchQuery)
        );
        setFilteredRows(filteredData);
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
                    components={{
                        Toolbar: GridToolbar,
                    }}
                />
            </div>
        </div>
    );
};

export default CrudSimples2;
