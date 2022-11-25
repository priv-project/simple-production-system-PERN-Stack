import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

// MATERIAL UI
import { DataGrid, GridToolbarContainer, GridToolbar } from '@mui/x-data-grid';
import { Box } from '@mui/system';

// MATERIAL ICONS
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';

// ACTIONS
import { deleteModel } from 'actions/models';

const Grid = ({ models, setCurrentId, setFormVisible }) => {
    const dispatch = useDispatch();

    const CustomToolbar = () => {
        return (
            <GridToolbarContainer>
                <button>TEST BUTTON</button>
            </GridToolbarContainer>
        );
    };

    const columns = [
        // { field: 'model_id', headerName: 'ID', width: 70, hideable: false },
        { field: 'model_code', headerName: 'Model Code', width: 130 },
        { field: 'model_description', headerName: 'Description', width: 400 },
        {
            field: 'actions',
            headerName: 'Actions',
            renderCell: (params) => {
                return (
                    <Box>
                        <VisibilityIcon
                            onClick={(e) => handleViewModel(e, params.row)}
                            fontSize="small"
                            sx={{
                                color: 'grey[50]',
                                '&:hover': {
                                    cursor: 'pointer'
                                }
                            }}
                        />
                        <DeleteOutlineIcon
                            onClick={(e) => handleDelete(e, params.row)}
                            fontSize="small"
                            sx={{
                                color: 'error.main',
                                '&:hover': {
                                    cursor: 'pointer'
                                }
                            }}
                        />
                    </Box>
                );
            }
        }
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
                dispatch(deleteModel(row.model_id));
                setCurrentId(0);
            }
        });
    };

    const handleViewModel = (e, row) => {
        e.stopPropagation();
        setCurrentId(row.model_id);
        setFormVisible(true);
    };

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={models}
                columns={columns}
                getRowId={(row) => row.model_id}
                pageSize={5}
                rowsPerPageOptions={[5]}
                // components={{ Toolbar: CustomToolbar }}
            />
        </div>
    );
};

export default Grid;
