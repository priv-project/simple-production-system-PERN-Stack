import * as React from 'react';
import { Box, Button, OutlinedInput } from '@mui/material';
import { DataGrid, GridToolbarContainer, useGridApiRef } from '@mui/x-data-grid';
import useApiRef from 'hooks/useApiRef';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// MATERIAL ICONS
import SaveIcon from '@mui/icons-material/Save';
import { element } from 'prop-types';
import { ContactPageSharp } from '@mui/icons-material';

export default function DataGridDemo({ data, currentId }) {
    const apiRef = React.useRef(null);

    const gridColumns = [
        {
            field: 'part_code',
            headerName: 'Part Code',
            width: 150,
            editable: false,
            flex: 1
        },
        {
            field: 'part_description',
            headerName: 'Description',
            width: 200,
            editable: false,
            flex: 1
        },
        {
            field: 'part_usage',
            headerName: 'Usage',
            width: 110,
            part_usage: 1,
            type: 'number',
            disableClickEventBubbling: true,
            disableColumnMenu: true,
            renderCell: (params) => {
                apiRef.current = params.api;
                return (
                    <OutlinedInput
                        type="number"
                        defaultValue={params.row.part_usage}
                        onChange={(e) => {
                            params.api.updateRows([{ ...params.row, part_usage: parseInt(e.target.value) }]);
                            if (!selectionModel.includes(params.id)) {
                                setSelectionModel([...selectionModel, params.id]);
                            }
                        }}
                        size="small"
                    />
                );
            }
        }
    ];

    const { columns } = useApiRef(gridColumns, apiRef);
    const [selectionModel, setSelectionModel] = React.useState([]);

    const CustomToolbar = () => {
        return (
            <GridToolbarContainer>
                <Button size="small" startIcon={<SaveIcon />} sx={{ fontWeight: '600' }} onClick={handleSave}>
                    Add
                </Button>
            </GridToolbarContainer>
        );
    };

    const handleSave = () => {
        const formData = Array.from(apiRef.current.getRowModels())
            .filter((element) => {
                const id = element[0];
                return selectionModel.includes(id);
            })
            .map((element) => {
                const model = element[1];
                return model;
            });
        console.log(formData);
    };

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={data}
                columns={columns}
                getRowId={(row) => row.part_id}
                columnVisibilityModel={{ part_id: false }}
                checkboxSelection
                onSelectionModelChange={(newSelectionModel) => {
                    setSelectionModel(newSelectionModel);
                }}
                selectionModel={selectionModel}
                disableSelectionOnClick
                pageSize={5}
                rowsPerPageOptions={[5]}
                // density="compact"
                components={{ Toolbar: CustomToolbar }}
            />
        </Box>
    );
}
