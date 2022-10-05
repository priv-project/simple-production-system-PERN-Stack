import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

// MATERIAL UI
import { DataGrid, GridToolbarContainer, useGridApiRef } from '@mui/x-data-grid';
import { Button, TextField, Box } from '@mui/material';

// MATERIAL ICONS
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SaveIcon from '@mui/icons-material/Save';

// PROJECT IMPORTS
import JTextField from 'components/JTextField';

// ACTIONS
import { deleteProduct } from 'actions/products';

const AddPartGrid = ({ data, setAddPartGridVisible }) => {
    const dispatch = useDispatch();
    const apiRef = useGridApiRef();

    const CustomToolbar = () => {
        return (
            <GridToolbarContainer>
                <Button size="small" startIcon={<SaveIcon />} sx={{ fontWeight: '600' }}>
                    SAVE
                </Button>
            </GridToolbarContainer>
        );
    };

    const columns = [
        { field: 'part_code', headerName: 'Part Code', width: 200 },
        {
            field: 'part_usage',
            headerName: 'Usage',
            width: 150,
            renderCell: (params) => {
                return (
                    <TextField
                        type="number"
                        InputLabelProps={{
                            shrink: true
                        }}
                        defaultValue={1}
                        variant="standard"
                        onChange={() => {
                            // console.log(apiRef);
                        }}
                    />
                );
            }
        }
        // {
        //     field: 'actions',
        //     headerName: 'Actions',
        //     renderCell: (params) => {
        //         return (
        //             <Box>
        //                 <VisibilityIcon
        //                     onClick={(e) => handleView(e, params.row)}
        //                     fontSize="small"
        //                     sx={{
        //                         color: 'grey[50]',
        //                         '&:hover': {
        //                             cursor: 'pointer'
        //                         }
        //                     }}
        //                 />
        //                 <DeleteOutlineIcon
        //                     onClick={(e) => handleDelete(e, params.row)}
        //                     fontSize="small"
        //                     sx={{
        //                         color: 'error.main',
        //                         '&:hover': {
        //                             cursor: 'pointer'
        //                         }
        //                     }}
        //                 />
        //             </Box>
        //         );
        //     }
        // }
    ];

    const handleDelete = (e, row) => {
        e.stopPropagation();
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                // dispatch(deleteProduct(row.product_id));
                // setCurrentId(0);
            }
        });
    };

    const handleView = (e, row) => {
        e.stopPropagation();
        setCurrentId(row.part_id);
        setFormVisible(true);
    };

    return (
        <div style={{ height: 450, width: '100%' }}>
            <DataGrid
                rows={data}
                columns={columns}
                getRowId={(row) => row.part_id}
                pageSize={5}
                rowHeight={38}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                components={{ Toolbar: CustomToolbar }}
                apiRef={apiRef}
            />
        </div>
    );
};

export default AddPartGrid;
