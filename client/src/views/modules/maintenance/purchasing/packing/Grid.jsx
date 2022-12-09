import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

// MATERIAL UI
import { Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

// MATERIAL ICONS
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';

// ACTIONS
import { getPackings, deletePacking } from 'redux/maintenance/purchasing/actions/packing';

const Grid = ({ currentId, setCurrentId, setFormVisible }) => {
    const dispatch = useDispatch();
    const packings = useSelector((state) => state.packings);

    React.useEffect(() => {
        dispatch(getPackings());
    }, [currentId, dispatch]);

    const columns = [
        { field: 'packing_code', headerName: 'Code', minWidth: 130 },
        { field: 'packing_desc', headerName: 'Description', minWidth: 250 },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
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
                setCurrentId(0);
                dispatch(deletePacking(row.packing_id));
            }
        });
    };

    const handleView = (e, row) => {
        e.stopPropagation();
        console.log(row.packing_id);
        setCurrentId(row.packing_id);
        setFormVisible(true);
    };

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={packings}
                columns={columns}
                getRowId={(row) => row.packing_id}
                pageSize={5}
                rowsPerPageOptions={[5]}
                components={{ Toolbar: GridToolbar }}
                componentsProps={{
                    toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 }
                    }
                }}
            />
        </div>
    );
};

export default Grid;
