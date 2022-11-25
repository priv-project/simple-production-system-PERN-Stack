import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

// MATERIAL UI
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/system';

// MATERIAL ICONS
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';

// ACTIONS
import { deletePart } from 'actions/maintenance/composite/parts';

const Grid = ({ data, setCurrentId, setFormVisible }) => {
    const dispatch = useDispatch();

    const columns = [
        { field: 'part_code', headerName: 'Code', width: 130 },
        { field: 'part_name', headerName: 'Name', width: 130 },
        { field: 'part_description', headerName: 'Description', width: 200 },
        { field: 'model_code', headerName: 'Model Code', width: 135 },
        {
            field: 'actions',
            headerName: 'Actions',
            renderCell: (params) => {
                return (
                    <Box>
                        <VisibilityIcon
                            onClick={(e) => handleView(e, params.row)}
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
                dispatch(deletePart(row.part_id));
                setCurrentId(0);
            }
        });
    };

    const handleView = (e, row) => {
        e.stopPropagation();
        setCurrentId(row.part_id);
        setFormVisible(true);
    };

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={data}
                columns={columns}
                getRowId={(row) => row.part_id}
                pageSize={5}
                rowsPerPageOptions={[5]}
                // components={{ Toolbar: CustomToolbar }}
            />
        </div>
    );
};

export default Grid;
