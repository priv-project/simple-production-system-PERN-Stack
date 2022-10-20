import * as React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

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

const useFakeMutation = () => {
    return React.useCallback(
        (data) =>
            new Promise((resolve, reject) =>
                setTimeout(() => {
                    resolve({ ...data });
                }, 200)
            ),
        []
    );
};

export default function DataGridDemo({ data, currentId }) {
    const mutateRow = useFakeMutation();
    const [snackbar, setSnackbar] = React.useState(null);
    const [finalData, setFinalData] = React.useState([]);
    const handleCloseSnackbar = () => setSnackbar(null);
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

    const processRowUpdate = React.useCallback(
        async (newRow) => {
            // Make the HTTP request to save in the backend
            const response = await mutateRow(newRow);
            return response;
        },
        [mutateRow]
    );

    const handleProcessRowUpdateError = React.useCallback((error) => {
        alert('something went wrong');
        console.error(error);
    }, []);

    const handleSave = () => {
        console.log();
    };

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            {currentId} <br />
            {selectionModel.join(', ').toString()}
            <DataGrid
                rows={rows}
                columns={columns}
                getRowId={(row) => row.part_id}
                columnVisibilityModel={{ part_id: false }}
                components={{ Toolbar: CustomToolbar }}
                checkboxSelection
                disableSelectionOnClick
                processRowUpdate={processRowUpdate}
                onProcessRowUpdateError={handleProcessRowUpdateError}
                selectionModel={selectionModel}
                onSelectionModelChange={(newSelectionModel) => {
                    setSelectionModel(newSelectionModel); // Handle default Data Grid selection
                }}
                experimentalFeatures={{ newEditingApi: true }}
                pageSize={5}
                rowsPerPageOptions={[5]}
            />
        </Box>
    );
}
