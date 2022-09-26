import * as React from 'react';
import { useSelector } from 'react-redux';

import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'model_id', headerName: 'ID', width: 70, sortable: false },
    { field: 'model_code', headerName: 'Model Code', width: 130 },
    { field: 'model_description', headerName: 'Description', width: 400 }
];

const Grid = () => {
    const models = useSelector((state) => state.models);

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={models}
                columns={columns}
                getRowId={(row) => row.model_id}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    );
};

export default Grid;
