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
import { getSuppliers, deleteSupplier } from 'redux/maintenance/purchasing/actions/supplier';

const Grid = ({ currentId, setCurrentId, setFormVisible }) => {
    const dispatch = useDispatch();
    const suppliers = useSelector((state) => state.suppliers);

    React.useEffect(() => {
        dispatch(getSuppliers());
    }, [currentId, dispatch]);

    const columns = [
        { field: 'supplier_code', headerName: 'Code', minWidth: 130 },
        { field: 'supplier_desc', headerName: 'Description', minWidth: 250 },
        { field: 'supplier_email', headerName: 'Email', minWidth: 250 },
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
                dispatch(deleteSupplier(row.supplier_id));
                setCurrentId(0);
            }
        });
    };

    const handleView = (e, row) => {
        e.stopPropagation();
        setCurrentId(row.supplier_id);
        setFormVisible(true);
    };

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={suppliers}
                columns={columns}
                getRowId={(row) => row.supplier_id}
                pageSize={5}
                rowsPerPageOptions={[5]}
                // components={{ Toolbar: CustomToolbar }}
            />
        </div>
    );
};

export default Grid;
