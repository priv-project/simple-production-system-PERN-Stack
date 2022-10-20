import * as React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';

// MATERIAL ICONS
import SaveIcon from '@mui/icons-material/Save';

const columns = [
    { field: 'part_id', headerName: 'ID', width: 90 },
    {
        field: 'part_code',
        headerName: 'Part Code',
        width: 150,
        editable: false
    },
    {
        field: 'part_description',
        headerName: 'Description',
        width: 150,
        editable: true
    },
    {
        field: 'part_usage',
        headerName: 'Usage',
        type: 'number',
        width: 110,
        editable: true
        // renderCell: (params) => {
        //     return (
        //         <TextField
        //             type="number"
        //             InputLabelProps={{
        //                 shrink: true
        //             }}
        //             defaultValue={1}
        //             variant="standard"
        //             onChange={(e) => {
        //                 setSelectionModel((selectionModel) => {
        //                     if (selectionModel.includes(params.id)) {
        //                         return selectionModel; // return if already selected
        //                     }

        //                     return [...selectionModel, params.id];
        //                 });

        //                 setDataGrid([...dataGrid, { part_id: params.id, part_usage: e.target.value }]);
        //                 console.log(dataGrid);
        //             }}
        //         />
        //     );
        // }
    }
];

const useApiRef = () => {
    const apiRef = React.useRef(null);
    const _columns = React.useMemo(() => columns, [columns]);

    return { apiRef, columns: _columns };
};

const useFakeMutation = () => {
    return React.useCallback(
        (user) =>
            new Promise((resolve) =>
                setTimeout(() => {
                    resolve(user);
                }, 200)
            ),
        []
    );
};

export default function DataGridDemo({ data }) {
    const mutateRow = useFakeMutation();
    const { apiRef, columns } = useApiRef();
    let [selectionModel, setSelectionModel] = React.useState([]);

    let rows = data.map((value) => {
        return {
            ...value,
            part_usage: 1
        };
    });

    const CustomToolbar = () => {
        return (
            <GridToolbarContainer>
                <Button size="small" variant="contained" startIcon={<SaveIcon />} sx={{ fontWeight: '600' }} onClick={handleSave}>
                    Add
                </Button>
            </GridToolbarContainer>
        );
    };

    const handleSave = () => {};

    // const handleEditRowsModelChange = React.useCallback((model) => {
    //     console.log(model);
    //     setEditRowsModel(model);
    // }, []);

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                getRowId={(row) => row.part_id}
                components={{ Toolbar: CustomToolbar }}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                // selectionModel={selectionModel}
                // onSelectionModelChange={(newSelectionModel) => {
                //     setSelectionModel(newSelectionModel); // Handle default Data Grid selection

                //     const selectedRowsData = newSelectionModel.map((id) => rows.find((row) => row.id === id));
                //     console.log(selectedRowsData);
                // }}
                columnVisibilityModel={{
                    part_id: false
                }}
                // experimentalFeatures={{ newEditingApi: true }}
            />
        </Box>
    );
}
