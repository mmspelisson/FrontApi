import React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70, sortable: false },
  { field: 'setor', headerName: 'Nome do Setor', width: 200, sortable: false },
];

const rows = [
  { id: 1, setor: 'RH' },
  { id: 2, setor: 'Financeiro'}
];

const CrudSimples2 = () => {

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid 
        rows={rows} 
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
  );
};

export default CrudSimples2;
